<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRole;
use App\Exceptions\EmailTakenException;
use App\Exceptions\OAuthProviderNotFoundException;
use App\Http\Controllers\Controller;
use App\Models\OAuthProvider;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

/**
 * Class OAuthController
 * @package App\Http\Controllers\Auth
 */
class OAuthController extends Controller
{
    public function __construct()
    {
        config([
            'services.github.redirect' => route('oauth.callback', 'github'),
            'services.facebook.redirect' => route('oauth.callback', 'facebook'),
            'services.google.redirect' => route('oauth.callback', 'google')
        ]);
    }

    /**
     * @param string $provider
     * @return array
     * @throws OAuthProviderNotFoundException
     */
    public function redirectToProvider(string $provider): array
    {
        switch ($provider) {
            case 'facebook':
                return [
                    'url' => Socialite::driver($provider)->fields([
                        'first_name', 'last_name', 'email', 'gender', 'birthday'
                    ])->scopes([
                        'email', 'user_birthday','user_gender',
                    ])->stateless()->redirect()->getTargetUrl(),
                ];
            case 'google':
                return [
                    'url' => Socialite::driver($provider)->scopes([
                        'openid',
                        'https://www.googleapis.com/auth/user.gender.read',
                        'https://www.googleapis.com/auth/user.birthday.read'
                    ])->stateless()->redirect()->getTargetUrl(),
                ];
            case 'github':
                return [
                    'url' => Socialite::driver($provider)->stateless()->redirect()->getTargetUrl(),
                ];
            default:
                throw new OAuthProviderNotFoundException('OAuth Provider Not Found');
        }
    }

    /**
     * @param string $provider
     * @return JsonResponse
     * @throws OAuthProviderNotFoundException
     */
    public function handleProviderCallback(string $provider): JsonResponse
    {
        switch ($provider) {
            case 'facebook':
                $user = Socialite::driver($provider)->stateless()->fields([
                    'first_name', 'last_name', 'email','gender', 'birthday'
                ])->user();
                break;
            case 'google':
                $user = Socialite::driver($provider)->stateless()->user();
                break;
            case 'github':
                $user = Socialite::driver($provider)->stateless()->user();
                break;
            default:
                throw new OAuthProviderNotFoundException('OAuth Provider Not Found');
        }

        try {
            $user = $this->findOrCreateUser($provider, $user);
        } catch (EmailTakenException $e) {
            Log::error("EmailTakenException {$e->getMessage()}");
        }

        $this->guard()->setToken(
            $token = $this->guard()->login($user)
        );

        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->getPayload()->get('exp') - time(),
        ]);
    }

    /**
     * @param string $provider
     * @param $user
     * @return User
     * @throws EmailTakenException
     */
    protected function findOrCreateUser(string $provider, $user): User
    {
        $oauthProvider = OAuthProvider::where('provider_name', $provider)
            ->where('provider_user_id', $user->getId())
            ->first();

        if ($oauthProvider) {
            $oauthProvider->update([
                'access_token' => $user->token,
                'refresh_token' => $user->refreshToken,
            ]);

            return $oauthProvider->user;
        }

        if (User::where('email', $user->getEmail())->exists()) {
            throw new EmailTakenException("User {$user->getEmail()}");
        }

        return $this->createUser($provider, $user);
    }

    protected function createUser(string $provider, $user): User
    {
        $new_user = User::create([
            'email' => $user->getEmail(),
            'email_verified_at' => now()
        ]);

        $new_user->save();

        $new_user->assignRole(UserRole::Client);

        $oauthProvider = OAuthProvider::create([
            'user_id' => $new_user->id,
            'provider_name' => $provider,
            'provider_user_id' => $user->getId(),
            'access_token' =>  $user->token,
            'refresh_token' => $user->refreshToken
        ]);

        $oauthProvider->save();

        return $new_user;
    }
}
