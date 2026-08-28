import type { CatalogExport, CatalogPhoto, PhotoStatus } from './types';

const IMAGE_EXTENSIONS = /\.(avif|bmp|gif|heic|heif|jpe?g|png|svg|webp)$/i;

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/') || IMAGE_EXTENSIONS.test(file.name);
}

export function photoId(file: File): string {
  const path = file.webkitRelativePath || file.name;
  return `${path}\u001f${file.size}\u001f${file.lastModified}`;
}

export function createPhoto(file: File, previous?: CatalogPhoto): CatalogPhoto {
  const relativePath = file.webkitRelativePath || file.name;
  return {
    id: photoId(file),
    originalName: file.name,
    relativePath,
    proposedName: previous?.proposedName ?? file.name,
    type: file.type || 'application/octet-stream',
    size: file.size,
    lastModified: file.lastModified,
    status: previous?.status ?? 'unreviewed',
    tags: previous?.tags ?? [],
    note: previous?.note ?? '',
    updatedAt: previous?.updatedAt ?? Date.now(),
    blob: file,
  };
}

export function parseTags(value: string): string[] {
  const seen = new Set<string>();
  return value
    .split(',')
    .map((tag) => tag.trim().replace(/\s+/g, ' '))
    .filter((tag) => {
      const key = tag.toLocaleLowerCase();
      if (!tag || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 20);
}

export function safeProposedName(value: string, originalName: string): string {
  const cleaned = value.trim().replace(/[\\/:*?"<>|\u0000-\u001f]/g, '-').replace(/\.+$/g, '');
  if (!cleaned) return originalName;
  const originalExtension = originalName.includes('.') ? `.${originalName.split('.').pop()}` : '';
  const hasExtension = /\.[a-z0-9]{2,5}$/i.test(cleaned);
  return `${cleaned}${hasExtension ? '' : originalExtension}`.slice(0, 240);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

function csvCell(value: string | number): string {
  const text = String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function buildCsv(photos: CatalogPhoto[]): string {
  const rows = [
    ['original_path', 'original_name', 'proposed_name', 'decision', 'tags', 'note', 'modified_iso'],
    ...photos.map((photo) => [
      photo.relativePath,
      photo.originalName,
      photo.proposedName,
      photo.status,
      photo.tags.join('; '),
      photo.note,
      new Date(photo.updatedAt).toISOString(),
    ]),
  ];
  return `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}\r\n`;
}

export function buildJson(photos: CatalogPhoto[], folderName: string): CatalogExport {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    folderName,
    photos: photos.map(({ blob: _blob, ...metadata }) => metadata),
  };
}

export function statusCounts(photos: CatalogPhoto[]): Record<PhotoStatus, number> {
  return photos.reduce<Record<PhotoStatus, number>>(
    (counts, photo) => {
      counts[photo.status] += 1;
      return counts;
    },
    { unreviewed: 0, keep: 0, review: 0, reject: 0 },
  );
}
