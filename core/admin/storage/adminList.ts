import { JsonStorage } from '../../../utils/jsonStorage';

const ADMIN_LIST_FILE = 'adminList.json';

/**
 * 🛠 AdminList - Manages the list of admin users
 * - Uses `jsonStorage.ts` to store and retrieve admin player IDs.
 */
export class AdminList {
    private static storage = new JsonStorage<string[]>(ADMIN_LIST_FILE);

    /**
     * ✅ Add a player to the admin list
     */
    static async addAdmin(playerId: string): Promise<void> {
        const admins = await this.storage.read();
        if (!admins.includes(playerId)) {
            admins.push(playerId);
            await this.storage.write(admins);
        }
    }

    /**
     * ❌ Remove a player from the admin list
     */
    static async removeAdmin(playerId: string): Promise<void> {
        let admins = await this.storage.read();
        admins = admins.filter(id => id !== playerId);
        await this.storage.write(admins);
    }

    /**
     * 🔍 Check if a player is an admin
     */
    static async isAdmin(playerId: string): Promise<boolean> {
        const admins = await this.storage.read();
        return admins.includes(playerId);
    }

    /**
     * 📜 Get the list of all admins
     */
    static async getAdminList(): Promise<string[]> {
        return await this.storage.read();
    }
}
