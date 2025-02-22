// server/routes/player.routes.ts
import { Router } from 'express';
import {
    getPlayerById,
    getPlayerByEmail,
    getPlayerByGameId,
    createPlayer,
    updatePlayer
} from '../controllers/player.controller';

const router = Router();

/**
 * 📍 Player Routes
 * - Defines endpoints for player operations
 */

// 🔍 Get player by **ID**
router.get('/:id', getPlayerById);

// 📧 Get player by **Email**
router.get('/email/:email', getPlayerByEmail);

// 🎮 Get player by **Game ID** (e.g., Steam ID, Arma GUID)
router.get('/game-id/:gameId', getPlayerByGameId);

// ➕ Create a **New Player**
router.post('/', createPlayer);

// ✏️ Update **Existing Player**
router.put('/:id', updatePlayer);

export default router;
