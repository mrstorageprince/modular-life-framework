import { getAdminRepository } from '../../../server/factories/adminRepositoryFactory';
import { getPlayerRepository } from '../../../server/factories/playerRepositoryFactory';
import { PlayerType } from '../../player/model/PlayerType';

/**
 * 🛠 AdminService - Handles admin actions like banning/unbanning players
 */
export class AdminService {
    private adminRepo = getAdminRepository();
    private playerRepo = getPlayerRepository();

    /**
     * ✅ Add a new admin
     */
    async addAdmin(playerId: string): Promise<void> {
        return this.adminRepo.addAdmin(playerId);
    }

    /**
     * ❌ Remove an admin
     */
    async removeAdmin(playerId: string): Promise<void> {
        return this.adminRepo.removeAdmin(playerId);
    }

    /**
     * 🔍 Check if a player is an admin
     */
    async isAdmin(playerId: string): Promise<boolean> {
        return this.adminRepo.isAdmin(playerId);
    }

    /**
     * 📜 Get all admins
     */
    async getAllAdmins(): Promise<string[]> {
        return this.adminRepo.getAllAdmins();
    }

    /**
     * 🚫 Ban a player and update their admin history
     */
    async banPlayer(playerId: string, reason: string, bannedBy: string, banUntil: Date | null): Promise<void> {
        const player = await this.playerRepo.findById(playerId);
        if (!player) throw new Error('Player not found');

        // Update player's ban status
        player.isBanned = true;
        player.banReason = reason;
        player.bannedBy = bannedBy;
        player.banUntil = banUntil;

        // Record admin action
        player.adminHistory = player.adminHistory || [];
        player.adminHistory.push({
            action: 'BAN',
            adminId: bannedBy,
            timestamp: new Date(),
        });

        // Persist changes
        await this.playerRepo.update(player);
        await this.adminRepo.banPlayer(playerId, reason, bannedBy, banUntil);
    }

    /**
     * ✅ Unban a player and update their admin history
     */
    async unbanPlayer(playerId: string, unbannedBy: string): Promise<void> {
        const player = await this.playerRepo.findById(playerId);
        if (!player) throw new Error('Player not found');

        // Update player's ban status
        player.isBanned = false;
        player.banReason = null;
        player.bannedBy = null;
        player.banUntil = null;

        // Record admin action
        player.adminHistory = player.adminHistory || [];
        player.adminHistory.push({
            action: 'UNBAN',
            adminId: unbannedBy,
            timestamp: new Date(),
        });

        // Persist changes
        await this.playerRepo.update(player);
        await this.adminRepo.unbanPlayer(playerId);
    }

    /**
     * 🔍 Find a player by email, username, or game-specific ID
     */
    async findPlayer(identifier: string): Promise<PlayerType | null> {
        let player = await this.playerRepo.findByEmail(identifier);
        if (!player) player = await this.playerRepo.findByUsername(identifier);
        if (!player) player = await this.playerRepo.findByGameId(identifier);
        return player;
    }
}
