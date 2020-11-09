<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static Pending()
 * @method static static Solved()
 * @method static static Closed()
 */
final class TicketStatus extends Enum
{
    public const Pending = 'pending';
    public const Solved = 'solved';
    public const Closed = 'closed';
}
