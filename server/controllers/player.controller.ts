// server/controllers/player.controller.ts
import { Request, Response } from 'express';
import { getPlayerRepository } from '../factories/playerRepositoryFactory';

const playerRepo = getPlayerRepository();

/**
 * 📍 Get Player by ID
 */
export async function getPlayerById(req: Request, res: Response) {
    try {
        const player = await playerRepo.findById(req.params.id);
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json(player);
    } catch (err) {
        console.error('❌ Error fetching player by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * 📧 Get Player by Email
 */
export async function getPlayerByEmail(req: Request, res: Response) {
    try {
        const player = await playerRepo.findByEmail(req.params.email);
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json(player);
    } catch (err) {
        console.error('❌ Error fetching player by email:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * 🎮 Get Player by Game ID (e.g., Steam ID, Arma GUID)
 */
export async function getPlayerByGameId(req: Request, res: Response) {
    try {
        const player = await playerRepo.findByGameId(req.params.gameId);
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json(player);
    } catch (err) {
        console.error('❌ Error fetching player by game ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * ➕ Create New Player
 */
export async function createPlayer(req: Request, res: Response) {
    try {
        const { email, username, displayName, gameId } = req.body;

        if (!email || !username) {
            return res.status(400).json({ message: 'Email and username are required' });
        }

        const newPlayer = await playerRepo.create({ email, username, displayName, gameId, isBanned: false, globalRoles: ['PLAYER'] });
        res.status(201).json(newPlayer);
    } catch (err) {
        console.error('❌ Error creating player:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * ✏️ Update Existing Player
 */
export async function updatePlayer(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const existingPlayer = await playerRepo.findById(id);
        if (!existingPlayer) return res.status(404).json({ message: 'Player not found' });

        const updatedPlayer = { ...existingPlayer, ...updates };
        await playerRepo.update(updatedPlayer);

        res.status(200).json(updatedPlayer);
    } catch (err) {
        console.error('❌ Error updating player:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
