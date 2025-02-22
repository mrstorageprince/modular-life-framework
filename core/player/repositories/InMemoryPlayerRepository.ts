// core/player/repositories/InMemoryPlayerRepository.ts
import { IPlayerRepository } from './IPlayerRepository';
import { PlayerType } from '../model/PlayerType';
import { v4 as uuidv4 } from 'uuid';
import * as playerList from '../../admin/storage/playerList';
import * as banList from '../../admin/storage/banList';

/**
 * 💾 In-Memory Player Repository
 * - Stores players in memory with JSON persistence
 * - Ideal for development & testing
 */
export class InMemoryPlayerRepository implements IPlayerRepository {
    private players: Map<string, PlayerType> = new Map();

    constructor() {
        this.loadPlayers();
    }

    /**
     * 🔄 Load players from JSON on startup
     */
    private async loadPlayers(): Promise<void> {
        const storedPlayers = await playerList.getAllPlayers();
        storedPlayers.forEach(player => this.players.set(player.id, player));
        console.log(`✅ Loaded ${this.players.size} players from storage.`);
    }

    async findById(id: string): Promise<PlayerType | null> {
        return this.players.get(id) || null;
    }

    async findByEmail(email: string): Promise<PlayerType | null> {
        return Array.from(this.players.values()).find(player => player.email === email) || null;
    }

    async findByGameId(gameId: string): Promise<PlayerType | null> {
        return Array.from(this.players.values()).find(player => player.gameId === gameId) || null;
    }

    async create(player: Omit<PlayerType, 'id'>): Promise<PlayerType> {
        const id = uuidv4();
        const newPlayer: PlayerType = { ...player, id };
        this.players.set(id, newPlayer);
        await playerList.savePlayer(newPlayer);
        return newPlayer;
    }

    async update(player: PlayerType): Promise<void> {
        if (this.players.has(player.id)) {
            this.players.set(player.id, player);
            await playerList.savePlayer(player);
        }
    }

    async banPlayer(playerId: string, reason: string, bannedBy: string, banUntil: Date | null): Promise<void> {
        await banList.banPlayer(playerId, reason, bannedBy, banUntil);
        const player = this.players.get(playerId);
        if (player) {
            player.isBanned = true;
            player.banReason = reason;
            player.bannedBy = bannedBy;
            player.banUntil = banUntil;
            this.players.set(playerId, player);
            await playerList.savePlayer(player);
        }
    }

    async unbanPlayer(playerId: string): Promise<void> {
        await banList.unbanPlayer(playerId);
        const player = this.players.get(playerId);
        if (player) {
            player.isBanned = false;
            player.banReason = null;
            player.bannedBy = null;
            player.banUntil = null;
            this.players.set(playerId, player);
            await playerList.savePlayer(player);
        }
    }

    async isPlayerBanned(playerId: string): Promise<boolean> {
        return await banList.isPlayerBanned(playerId);
    }

    async getBannedPlayers(): Promise<PlayerType[]> {
        const bannedIds = await banList.getBanList();
        return Array.from(this.players.values()).filter(player => bannedIds.includes(player.id));
    }
}
