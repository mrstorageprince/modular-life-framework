import { getAdminRepository } from '../../../server/factories/adminRepositoryFactory';

/**
 * 🛠 AdminService - Handles admin actions like banning/unbanning players
 */
export class AdminService {
    private adminRepo = getAdminRepository();

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
}
