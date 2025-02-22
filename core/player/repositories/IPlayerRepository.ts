// core/player/repositories/IPlayerRepository.ts
import { PlayerType } from '../model/PlayerType';

/**
 * 📦 Player Repository Interface
 * - Defines methods for managing players across different storage backends.
 */
export interface IPlayerRepository {
    /**
     * 🔍 Find a player by their unique database ID (UUID)
     */
    findById(id: string): Promise<PlayerType | null>;

    /**
     * 📧 Find a player by email (used for authentication)
     */
    findByEmail(email: string): Promise<PlayerType | null>;

    /**
     * 🎮 Find a player by their game-specific ID (e.g., Steam ID, Arma GUID)
     */
    findByGameId(gameId: string): Promise<PlayerType | null>;

    /**
     * ➕ Create a new player
     */
    create(player: Omit<PlayerType, 'id'>): Promise<PlayerType>;

    /**
     * ✏️ Update an existing player's details
     */
    update(player: PlayerType): Promise<void>;

    /**
     * 🚫 Ban a player
     */
    banPlayer(playerId: string, reason: string, bannedBy: string, banUntil: Date | null): Promise<void>;

    /**
     * ✅ Unban a player
     */
    unbanPlayer(playerId: string): Promise<void>;

    /**
     * 🔍 Check if a player is banned
     */
    isPlayerBanned(playerId: string): Promise<boolean>;

    /**
     * 📜 Get a list of all banned players
     */
    getBannedPlayers(): Promise<PlayerType[]>;
}
