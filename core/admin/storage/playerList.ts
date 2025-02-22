import { JsonStorage } from '../../../utils/jsonStorage';
import { PlayerType } from '../../player/model/PlayerType';

const PLAYER_LIST_FILE = 'playerList.json';

/**
 * 🏆 PlayerList - Manages all registered players
 * - Uses `jsonStorage.ts` to store and retrieve player details.
 */
export class PlayerList {
    private static storage = new JsonStorage<PlayerType[]>(PLAYER_LIST_FILE);

    /**
     * ✅ Add a player to the player list
     */
    static async addPlayer(player: PlayerType): Promise<void> {
        const players = await this.storage.read();
        if (!players.some(p => p.id === player.id)) {
            players.push(player);
            await this.storage.write(players);
        }
    }

    /**
     * 🔍 Retrieve a player by ID
     */
    static async getPlayerById(playerId: string): Promise<PlayerType | null> {
        const players = await this.storage.read();
        return players.find(player => player.id === playerId) || null;
    }

    /**
     * 📜 Get all players
     */
    static async getAllPlayers(): Promise<PlayerType[]> {
        return await this.storage.read();
    }
}
