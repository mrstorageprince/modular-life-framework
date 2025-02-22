import { IAdminRepository } from '../../core/admin/repositories/IAdminRepository';
import { InMemoryAdminRepository } from '../../core/admin/repositories/InMemoryAdminRepository';
import { PostgresAdminRepository } from '../../core/admin/repositories/PostgresAdminRepository';

/**
 * 🏭 **Admin Repository Factory**
 *
 * - Provides an **instance** of `IAdminRepository`
 * - Selects **In-Memory** or **Postgres** based on `DB_TYPE` in `.env`
 */
let adminRepositoryInstance: IAdminRepository | null = null;

/**
 * 🚀 Get or Create an Admin Repository Instance
 */
export function getAdminRepository(): IAdminRepository {
    if (!adminRepositoryInstance) {
        if (process.env.DB_TYPE === 'postgres') {
            console.log('🔗 Using Postgres Admin Repository');
            adminRepositoryInstance = new PostgresAdminRepository();
        } else {
            console.log('🛑 Using In-Memory Admin Repository');
            adminRepositoryInstance = new InMemoryAdminRepository();
        }
    }
    return adminRepositoryInstance;
}
