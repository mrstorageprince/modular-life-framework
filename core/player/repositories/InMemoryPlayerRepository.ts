import { IPlayerRepository } from './IPlayerRepository';
import { PlayerType } from '../model/PlayerType';
import { v4 as uuidv4 } from 'uuid';
import { PlayerList } from '../../admin/storage/playerList';
import { BanList } from '../../admin/storage/banList';

/**
 * 🎮 InMemoryPlayerRepository
 * - Uses `PlayerList.ts` for player persistence.
 * - Ensures banned players are updated based on `BanList.ts`.
 */
export class InMemoryPlayerRepository implements IPlayerRepository {
    /**
     * 🔍 Find a player by email
     */
    async findByEmail(email: string): Promise<PlayerType | null> {
        const players = await PlayerList.getAllPlayers();
        return players.find(player => player.email === email) || null;
    }

    /**
     * 🔍 Find a player by ID
     */
    async findById(id: string): Promise<PlayerType | null> {
        return await PlayerList.getPlayerById(id);
    }

    /**
     * ✨ Create a new player
     */
    async create(player: Omit<PlayerType, 'id'>): Promise<PlayerType> {
        const newPlayer: PlayerType = {
            id: uuidv4(),
            ...player,
            isBanned: false,
            banReason: null,
            bannedBy: null,
            banUntil: null,
        };
        await PlayerList.addPlayer(newPlayer);
        return newPlayer;
    }

    /**
     * 🔄 Update an existing player
     */
    async update(player: PlayerType): Promise<void> {
        const allPlayers = await PlayerList.getAllPlayers();
        const index = allPlayers.findIndex(p => p.id === player.id);
        if (index !== -1) {
            allPlayers[index] = player;
            await PlayerList.storage.write(allPlayers);
        }
    }

    /**
     * 🚫 Ban a player
     */
    async banPlayer(playerId: string, reason: string, bannedBy: string, bannedUntil: Date | null): Promise<void> {
        await BanList.banPlayer(playerId, reason, bannedBy, bannedUntil);
        const player = await this.findById(playerId);
        if (player) {
            player.isBanned = true;
            player.banReason = reason;
            player.bannedBy = bannedBy;
            player.banUntil = bannedUntil;
            await this.update(player);
        }
    }

    /**
     * ✅ Unban a player
     */
    async unbanPlayer(playerId: string): Promise<void> {
        await BanList.unbanPlayer(playerId);
        const player = await this.findById(playerId);
        if (player) {
            player.isBanned = false;
            player.banReason = null;
            player.bannedBy = null;
            player.banUntil = null;
            await this.update(player);
        }
    }

    /**
     * 🔍 Check if a player is banned
     */
    async isPlayerBanned(playerId: string): Promise<boolean> {
        return await BanList.isPlayerBanned(playerId);
    }

    /**
     * 📜 Get all banned players
     */
    async getBannedPlayers(): Promise<PlayerType[]> {
        const bannedIds = await BanList.getBanList();
        const allPlayers = await PlayerList.getAllPlayers();
        return allPlayers.filter(player => bannedIds.includes(player.id));
    }
}
