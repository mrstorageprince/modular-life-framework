import { JsonStorage } from '../../../utils/jsonStorage';

const BAN_LIST_FILE = 'banList.json';

/**
 * 📛 BanList - Manages banned players
 * - Uses `jsonStorage.ts` for persistent storage.
 */
interface BanInfo {
    bannedUntil: Date | null;
    reason: string;
    bannedBy: string | null;
}

export class BanList {
    private static storage = new JsonStorage<Record<string, BanInfo>>(BAN_LIST_FILE);

    /**
     * 🚫 Ban a player
     */
    static async banPlayer(playerId: string, reason: string, bannedBy: string, bannedUntil: Date | null): Promise<void> {
        const bans = await this.storage.read();
        bans[playerId] = { reason, bannedBy, bannedUntil };
        await this.storage.write(bans);
    }

    /**
     * ✅ Unban a player
     */
    static async unbanPlayer(playerId: string): Promise<void> {
        const bans = await this.storage.read();
        delete bans[playerId];
        await this.storage.write(bans);
    }

    /**
     * 🔍 Check if a player is banned
     */
    static async isPlayerBanned(playerId: string): Promise<boolean> {
        const bans = await this.storage.read();
        const banInfo = bans[playerId];
        if (!banInfo) return false;

        if (banInfo.bannedUntil && new Date() > banInfo.bannedUntil) {
            await this.unbanPlayer(playerId); // Automatically unban expired bans
            return false;
        }
        return true;
    }

    /**
     * 📜 Get the list of all banned players
     */
    static async getBanList(): Promise<string[]> {
        const bans = await this.storage.read();
        return Object.keys(bans);
    }

    /**
     * 📜 Get ban info for a player
     */
    static async getBanInfo(playerId: string): Promise<BanInfo | null> {
        const bans = await this.storage.read();
        return bans[playerId] || null;
    }
}
