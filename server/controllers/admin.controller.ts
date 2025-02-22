import { Request, Response } from 'express';
import { AdminService } from '../../core/admin/services/AdminService';
import { InMemoryAdminRepository } from '../../core/admin/repositories/InMemoryAdminRepository';

// 🛠 Create an instance of AdminService
const adminService = new AdminService(new InMemoryAdminRepository());

/**
 * ➕ Add an admin
 */
export async function addAdmin(req: Request, res: Response) {
    const { playerId } = req.body;
    if (!playerId) {
        return res.status(400).json({ message: 'Player ID is required' });
    }

    await adminService.addAdmin(playerId);
    res.status(200).json({ message: 'Admin added successfully' });
}

/**
 * ❌ Remove an admin
 */
export async function removeAdmin(req: Request, res: Response) {
    const { playerId } = req.body;
    if (!playerId) {
        return res.status(400).json({ message: 'Player ID is required' });
    }

    await adminService.removeAdmin(playerId);
    res.status(200).json({ message: 'Admin removed successfully' });
}

/**
 * 🔍 Check if a player is an admin
 */
export async function isAdmin(req: Request, res: Response) {
    const { playerId } = req.params;
    if (!playerId) {
        return res.status(400).json({ message: 'Player ID is required' });
    }

    const result = await adminService.isAdmin(playerId);
    res.status(200).json({ isAdmin: result });
}

/**
 * 📜 Get all admins
 */
export async function getAllAdmins(req: Request, res: Response) {
    const admins = await adminService.getAllAdmins();
    res.status(200).json({ admins });
}
