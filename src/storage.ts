import type { CatalogPhoto } from './types';

const DB_NAME = 'large-type-catalog';
const STORE = 'photos';
const DB_VERSION = 1;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE)) database.createObjectStore(STORE, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Could not open local catalog storage.'));
  });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error ?? new Error('Local storage transaction was cancelled.'));
    transaction.onerror = () => reject(transaction.error ?? new Error('Could not save to local storage.'));
  });
}

export async function loadPhotos(): Promise<CatalogPhoto[]> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = database.transaction(STORE, 'readonly').objectStore(STORE).getAll();
    request.onsuccess = () => resolve((request.result as CatalogPhoto[]).sort((a, b) => a.relativePath.localeCompare(b.relativePath, undefined, { numeric: true })));
    request.onerror = () => reject(request.error ?? new Error('Could not read the local catalog.'));
  });
}

export async function replacePhotos(photos: CatalogPhoto[]): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(STORE, 'readwrite');
  const store = transaction.objectStore(STORE);
  store.clear();
  photos.forEach((photo) => store.put(photo));
  await transactionDone(transaction);
}

export async function savePhoto(photo: CatalogPhoto): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(STORE, 'readwrite');
  transaction.objectStore(STORE).put(photo);
  await transactionDone(transaction);
}

export async function clearPhotos(): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(STORE, 'readwrite');
  transaction.objectStore(STORE).clear();
  await transactionDone(transaction);
}
