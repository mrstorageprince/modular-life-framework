import { IAdminRepository } from './IAdminRepository';
import { AdminActionType } from '../model/AdminActionType';
import * as banList from '../storage/banList';

/**
 * In-memory implementation of the admin repository.
 * Uses a JSON-based storage system for bans.
 */
export class InMemoryAdminRepository implements IAdminRepository {
    async banPlayer(playerId: string, reason: string, bannedBy: string, bannedUntil: Date | null): Promise<void> {
        await banList.banPlayer(playerId, reason, bannedBy, bannedUntil);
    }

    async unbanPlayer(playerId: string): Promise<void> {
        await banList.unbanPlayer(playerId);
    }

    async isPlayerBanned(playerId: string): Promise<boolean> {
        return banList.isPlayerBanned(playerId);
    }

    async getBannedPlayers(): Promise<string[]> {
        return banList.getBanList();
    }
}
