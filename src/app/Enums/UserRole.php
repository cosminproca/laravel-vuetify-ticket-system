<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static Client()
 * @method static static Support()
 * @method static static Admin()
 */
final class UserRole extends Enum
{
    public const Client = 'client';
    public const Support = 'support';
    public const Admin = 'admin';
}
