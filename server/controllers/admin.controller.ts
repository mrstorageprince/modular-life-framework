import { Request, Response } from 'express';
import { AdminService } from '../../core/admin/service/AdminService';
import { InMemoryAdminRepository } from '../../core/admin/repository/InMemoryAdminRepository';

const adminService = new AdminService(new InMemoryAdminRepository());

export async function banPlayer(req: Request, res: Response) {
    const { playerId, reason, bannedBy, banUntil } = req.body;
    await adminService.banPlayer(playerId, reason, bannedBy, banUntil ? new Date(banUntil) : null);
    res.status(200).json({ message: 'Player banned successfully' });
}

export async function unbanPlayer(req: Request, res: Response) {
    const { playerId } = req.body;
    await adminService.unbanPlayer(playerId);
    res.status(200).json({ message: 'Player unbanned successfully' });
}
