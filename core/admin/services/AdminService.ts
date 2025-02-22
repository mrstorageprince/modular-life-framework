import { IAdminRepository } from '../repository/IAdminRepository';

/**
 * Handles administrative actions such as banning, unbanning, and kicking players.
 */
export class AdminService {
    private adminRepo: IAdminRepository;

    constructor(adminRepo: IAdminRepository) {
        this.adminRepo = adminRepo;
    }

    async banPlayer(playerId: string, reason: string, bannedBy: string, bannedUntil: Date | null): Promise<void> {
        await this.adminRepo.banPlayer(playerId, reason, bannedBy, bannedUntil);
    }

    async unbanPlayer(playerId: string): Promise<void> {
        await this.adminRepo.unbanPlayer(playerId);
    }

    async isPlayerBanned(playerId: string): Promise<boolean> {
        return this.adminRepo.isPlayerBanned(playerId);
    }
}
