/**
 * 🗂️ IPlayerRepository.ts - Defines the interface for player data access.
 *
 * This interface allows multiple implementations (e.g., InMemory, JSON, Database)
 * while ensuring all follow a standard contract.
 */

import { PlayerType } from '../model/PlayerType';

export interface IPlayerRepository {
    /**
     * 🔍 Find a player by their email.
     * @param email The email address of the player.
     * @returns The player object or `null` if not found.
     */
    findByEmail(email: string): Promise<PlayerType | null>;

    /**
     * 🔍 Find a player by their unique ID.
     * @param id The unique player ID.
     * @returns The player object or `null` if not found.
     */
    findById(id: string): Promise<PlayerType | null>;

    /**
     * ➕ Create a new player.
     * @param player The player data to create.
     * @returns The newly created player object.
     */
    create(player: Omit<PlayerType, 'id'>): Promise<PlayerType>;

    /**
     * 🔄 Update an existing player's information.
     * @param player The player object containing updated data.
     */
    update(player: PlayerType): Promise<void>;

    /**
     * 🚫 Ban a player.
     * @param playerId The ID of the player to ban.
     * @param reason The reason for the ban.
     * @param bannedBy The admin or system user performing the ban.
     * @param bannedUntil (Optional) Expiration date of the ban (null for permanent bans).
     */
    banPlayer(playerId: string, reason: string, bannedBy: string, bannedUntil?: Date | null): Promise<void>;

    /**
     * ✅ Unban a player.
     * @param playerId The ID of the player to unban.
     */
    unbanPlayer(playerId: string): Promise<void>;

    /**
     * 🔍 Check if a player is currently banned.
     * @param playerId The ID of the player.
     * @returns `true` if the player is banned, otherwise `false`.
     */
    isPlayerBanned(playerId: string): Promise<boolean>;

    /**
     * 📜 Get a list of all banned players.
     * @returns An array of player objects that are currently banned.
     */
    getBannedPlayers(): Promise<PlayerType[]>;
}
