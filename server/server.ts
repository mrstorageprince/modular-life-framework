import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Import route handlers
import adminRoutes from './routes/admin.routes'; // ✅ Only available route

// TODO: Uncomment when these exist
// import authRoutes from './routes/auth.routes';
// import playerRoutes from './routes/player.routes';
// import factionRoutes from './routes/faction.routes';

const app = express();

// 🔹 If behind a proxy (e.g., Nginx, Heroku), trust the proxy's headers
app.set('trust proxy', true);

// 🔹 Middleware setup
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(morgan('dev')); // Logs HTTP requests in the console

// 🔹 Mount API routes (only keeping what exists)
app.use('/admin', adminRoutes); // ✅ Admin routes (ban, unban, kick players)

// TODO: Uncomment when these exist
// app.use('/auth', authRoutes); // Authentication routes (login, token refresh)
// app.use('/player', playerRoutes); // Player-specific routes (profile, game interactions)
// app.use('/faction', factionRoutes); // Faction management routes (create/join factions)

// 🔹 Default root route (for health checks or server status)
app.get('/', (req: Request, res: Response) => {
    res.send('🔥 Core Backend Server is Running 🔥');
});

// 🔹 Global error handler
// This ensures that any unhandled errors are caught and a proper response is sent
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 🔹 Start the server (if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT}`);
    });
}

// 🔹 Export app for testing
export default app;
