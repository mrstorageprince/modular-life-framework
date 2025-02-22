import { Request, Response } from 'express';
import { AdminService } from '../../core/admin/services/AdminService';
import { InMemoryAdminRepository } from '../../core/admin/repositories/InMemoryAdminRepository';

const adminService = new AdminService(new InMemoryAdminRepository());

/**
 * 🚫 Ban a player
 */
export async function banPlayer(req: Request, res: Response) {
    const { playerId, reason, bannedBy, banUntil } = req.body;

    try {
        await adminService.banPlayer(playerId, reason, bannedBy, banUntil ? new Date(banUntil) : null);
        res.status(200).json({ message: 'Player banned successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

/**
 * ✅ Unban a player
 */
export async function unbanPlayer(req: Request, res: Response) {
    const { playerId, unbannedBy } = req.body;

    try {
        await adminService.unbanPlayer(playerId, unbannedBy);
        res.status(200).json({ message: 'Player unbanned successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

/**
 * 🔍 Find a player by email, username, or game ID
 */
export async function findPlayer(req: Request, res: Response) {
    const { identifier } = req.params;

    try {
        const player = await adminService.findPlayer(identifier);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(player);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
