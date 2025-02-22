// server/factories/playerRepositoryFactory.ts
import { IPlayerRepository } from '../../core/player/repositories/IPlayerRepository';
import { InMemoryPlayerRepository } from '../../core/player/repositories/InMemoryPlayerRepository';
import { PostgresPlayerRepository } from '../../core/player/repositories/PostgresPlayerRepository';

/**
 * 🏗 Singleton Player Repository Factory
 * - Ensures only **one** instance of the repository exists.
 */
let playerRepositoryInstance: IPlayerRepository | null = null;

/**
 * 📦 Factory function to provide the correct player repository
 * - Uses **PostgreSQL** if `DB_TYPE=postgres`
 * - Defaults to **in-memory** storage otherwise
 */
export function getPlayerRepository(): IPlayerRepository {
    if (!playerRepositoryInstance) {
        if (process.env.DB_TYPE === 'postgres') {
            console.log('🗄 Using PostgreSQL Player Repository');
            playerRepositoryInstance = new PostgresPlayerRepository();
        } else {
            console.log('💾 Using In-Memory Player Repository');
            playerRepositoryInstance = new InMemoryPlayerRepository();
        }
    }
    return playerRepositoryInstance;
}
