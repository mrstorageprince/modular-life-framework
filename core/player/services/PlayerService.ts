// core/player/services/PlayerService.ts

import { IPlayerRepository } from '../repositories/IPlayerRepository';
import { PlayerType } from '../model/PlayerType';

/**
 * 🛠 PlayerService - Handles player-related business logic.
 */
export class PlayerService {
    private playerRepo: IPlayerRepository;

    constructor(playerRepo: IPlayerRepository) {
        this.playerRepo = playerRepo;
    }

    /**
     * ➕ Register a new player
     */
    async registerPlayer(email: string, username: string, gameId?: string): Promise<PlayerType> {
        let player = await this.playerRepo.findByEmail(email);

        if (!player) {
            player = await this.playerRepo.create({
                email,
                username,
                displayName: username,
                isBanned: false,
                globalRoles: ['PLAYER'],
                gameIds: gameId ? [gameId] : []
            } as PlayerType);
        } else if (gameId && !player.gameIds.includes(gameId)) {
            player.gameIds.push(gameId);
            await this.playerRepo.update(player);
        }

        return player;
    }

    /**
     * 🔍 Get player details by ID
     */
    async getPlayerById(id: string): Promise<PlayerType | null> {
        return this.playerRepo.findById(id);
    }

    /**
     * 🔄 Update player information
     */
    async updatePlayer(player: PlayerType): Promise<void> {
        return this.playerRepo.update(player);
    }
}
