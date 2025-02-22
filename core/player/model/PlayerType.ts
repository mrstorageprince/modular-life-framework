/**
 * Defines the structure of a Player object in the system.
 * This model is used throughout the application to maintain player-related data.
 */
export interface PlayerType {
    /**
     * Unique identifier for the player (UUID).
     */
    id: string;

    /**
     * Player's email address, used for authentication.
     */
    email: string;

    /**
     * Username of the player (derived from email initially).
     */
    username: string;

    /**
     * Display name of the player (can be changed by the player).
     */
    displayName: string;

    /**
     * Whether the player is currently banned from the system.
     */
    isBanned: boolean;

    /**
     * The reason for the ban, if the player is banned.
     */
    banReason?: string | null;

    /**
     * The administrator who issued the ban.
     */
    bannedBy?: string | null;

    /**
     * The date and time until the ban remains active (null means permanent ban).
     */
    banUntil?: Date | null;

    /**
     * The global roles assigned to the player.
     * Examples: ['PLAYER'], ['PLAYER', 'ADMIN']
     */
    globalRoles: string[];

    /**
     * History of administrative actions taken on the player.
     * Stores an array of past bans, unbans, warnings, etc.
     */
    adminHistory?: {
        action: string; // e.g., 'BAN', 'UNBAN'
        adminId: string; // The ID of the admin who performed the action
        timestamp: Date; // When the action was taken
    }[];

    /**
     * Future extension for faction-specific roles.
     * Example: { "factionId1": ["LEADER"], "factionId2": ["MEMBER"] }
     */
    // factionRoles?: { [factionId: string]: string[] };
}
