import { IAdminRepository } from './IAdminRepository';
import { AdminList } from '../storage/adminList';

/**
 * 🛠 InMemoryAdminRepository
 * - Uses `AdminList.ts` for admin storage.
 */
export class InMemoryAdminRepository implements IAdminRepository {
    /**
     * ✅ Add a player to the admin list
     */
    async addAdmin(playerId: string): Promise<void> {
        await AdminList.addAdmin(playerId);
    }

    /**
     * ❌ Remove a player from the admin list
     */
    async removeAdmin(playerId: string): Promise<void> {
        await AdminList.removeAdmin(playerId);
    }

    /**
     * 🔍 Check if a player is an admin
     */
    async isAdmin(playerId: string): Promise<boolean> {
        return await AdminList.isAdmin(playerId);
    }

    /**
     * 📜 Get a list of all admins
     */
    async getAllAdmins(): Promise<string[]> {
        return await AdminList.getAdminList();
    }
}
