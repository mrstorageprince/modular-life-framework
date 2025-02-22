import { promises as fs } from 'fs';
import path from 'path';

/**
 * 📦 Generic JSON Storage Utility
 * - This class provides a simple interface for reading and writing JSON data to a file.
 * - It ensures data persistence across server restarts.
 */
export class JsonStorage<T> {
    private filePath: string;

    constructor(fileName: string) {
        // 🗂 Store JSON files in the `storage` directory within the project root
        this.filePath = path.join(__dirname, '../../storage', fileName);
    }

    /**
     * 📖 Read JSON data from file
     * - Returns an empty array/object if the file doesn't exist.
     */
    async read(): Promise<T> {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data) as T;
        } catch (err: any) {
            if (err.code === 'ENOENT') {
                console.warn(`⚠️ No existing file found for ${this.filePath}. Initializing empty storage.`);
                return Array.isArray([]) ? ([] as T) : ({} as T);
            }
            console.error(`❌ Error reading file: ${this.filePath}`, err);
            throw err;
        }
    }

    /**
     * 💾 Write JSON data to file
     */
    async write(data: T): Promise<void> {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
            console.log(`✅ Data successfully saved to ${this.filePath}`);
        } catch (err) {
            console.error(`❌ Error writing to file: ${this.filePath}`, err);
            throw err;
        }
    }
}
