import { describe, expect, it } from 'vitest';
import { buildCsv, buildJson, createPhoto, formatBytes, isImageFile, parseTags, safeProposedName, statusCounts } from '../../src/catalog';

function photo(name = 'coast, sunrise.jpg') {
  const file = new File(['pixels'], name, { type: 'image/jpeg', lastModified: 123 });
  return createPhoto(file);
}

describe('catalog helpers', () => {
  it('recognises browser image MIME types and useful image extensions', () => {
    expect(isImageFile(new File([], 'photo.jpg', { type: '' }))).toBe(true);
    expect(isImageFile(new File([], 'photo', { type: 'image/webp' }))).toBe(true);
    expect(isImageFile(new File([], 'notes.txt', { type: 'text/plain' }))).toBe(false);
  });

  it('normalises, deduplicates, and limits tags', () => {
    expect(parseTags(' Family, travel, family,  night   train ')).toEqual(['Family', 'travel', 'night train']);
    expect(parseTags(Array.from({ length: 25 }, (_, index) => `tag ${index}`).join(','))).toHaveLength(20);
  });

  it('preserves an original extension and removes unsafe path characters', () => {
    expect(safeProposedName('summer/final', 'IMG_0201.JPG')).toBe('summer-final.JPG');
    expect(safeProposedName('named.webp', 'IMG_0201.JPG')).toBe('named.webp');
    expect(safeProposedName('   ', 'IMG_0201.JPG')).toBe('IMG_0201.JPG');
  });

  it('exports spreadsheet-safe CSV with decisions, tags, names, and notes', () => {
    const item = photo();
    item.status = 'keep';
    item.proposedName = 'sunrise-final.jpg';
    item.tags = ['family', 'coast'];
    item.note = 'Print 8x10, landscape';
    const csv = buildCsv([item]);
    expect(csv).toContain('original_path,original_name,proposed_name,decision,tags,note,modified_iso');
    expect(csv).toContain('"coast, sunrise.jpg"');
    expect(csv).toContain('sunrise-final.jpg,keep,family; coast,"Print 8x10, landscape"');
  });

  it('exports metadata JSON without embedding private photo bytes', () => {
    const backup = buildJson([photo()], 'Summer');
    expect(backup.version).toBe(1);
    expect(backup.folderName).toBe('Summer');
    expect(backup.photos[0]).not.toHaveProperty('blob');
  });

  it('counts all visible decision states and formats file size', () => {
    const items = [photo('one.jpg'), photo('two.jpg'), photo('three.jpg')];
    items[0].status = 'keep';
    items[1].status = 'reject';
    expect(statusCounts(items)).toEqual({ unreviewed: 1, keep: 1, review: 0, reject: 1 });
    expect(formatBytes(2_621_440)).toBe('2.5 MB');
  });
});
