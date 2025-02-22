import { AdminActionType } from '../model/AdminActionType';

/**
 * Interface for the admin repository.
 * Defines methods for banning, unbanning, and kicking players.
 */
export interface IAdminRepository {
    banPlayer(playerId: string, reason: string, bannedBy: string, bannedUntil: Date | null): Promise<void>;
    unbanPlayer(playerId: string): Promise<void>;
    isPlayerBanned(playerId: string): Promise<boolean>;
    getBannedPlayers(): Promise<string[]>;
}
