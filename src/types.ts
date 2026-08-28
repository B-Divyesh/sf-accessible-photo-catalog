export type PhotoStatus = 'unreviewed' | 'keep' | 'review' | 'reject';

export interface CatalogPhoto {
  id: string;
  originalName: string;
  relativePath: string;
  proposedName: string;
  type: string;
  size: number;
  lastModified: number;
  status: PhotoStatus;
  tags: string[];
  note: string;
  updatedAt: number;
  blob: Blob;
}

export type CatalogExport = {
  version: 1;
  exportedAt: string;
  folderName: string;
  photos: Array<Omit<CatalogPhoto, 'blob'>>;
};

export const STATUS_LABEL: Record<PhotoStatus, string> = {
  unreviewed: 'Unreviewed',
  keep: 'Keep',
  review: 'Review',
  reject: 'Reject',
};
