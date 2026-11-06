// imageCache.ts
import { openDB } from 'idb';
import { ImagesMap } from './shared/types';

const dbPromise = openDB('game-cache', 1, {
    upgrade(db) {
        db.createObjectStore('images');
    },
});

export const getCachedImages = async (): Promise<ImagesMap> => {
    const db = await dbPromise;

    const keys = await db.getAllKeys('images');
    const values = await db.getAll('images');

    return new Map(
        keys.map((key, index) => [String(key), values[index]])
    );
};

export const cacheImages = async (images: ImagesMap) => {
    const db = await dbPromise;
    const tx = db.transaction('images', 'readwrite');

    await tx.store.clear();

    for (const [key, value] of images) {
        await tx.store.put(value, key);
    }

    await tx.done;
};