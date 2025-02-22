import { IAdminRepository } from './IAdminRepository';
import { AdminActionType } from '../model/AdminActionType';

/**
 * Placeholder for future PostgreSQL implementation.
 */
export class PostgresAdminRepository implements IAdminRepository {
    async banPlayer(playerId: string, reason: string, bannedBy: string, bannedUntil: Date | null): Promise<void> {
        console.log(`Postgres: Ban player ${playerId} until ${bannedUntil}`);
    }

    async unbanPlayer(playerId: string): Promise<void> {
        console.log(`Postgres: Unban player ${playerId}`);
    }

    async isPlayerBanned(playerId: string): Promise<boolean> {
        return false;
    }

    async getBannedPlayers(): Promise<string[]> {
        return [];
    }
}
