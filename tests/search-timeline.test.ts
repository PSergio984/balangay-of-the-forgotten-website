import { expect, test } from 'vitest';
import * as fs from 'node:fs';

test('Relics Schema and Rarity Field', () => {
  const relicSchema = fs.readFileSync('collections/Relics.ts', 'utf-8');
  expect(relicSchema).toContain("name: 'rarity'");
  expect(relicSchema).toContain("name: 'tags'");
  expect(relicSchema).toContain("options: ['Common', 'Rare', 'Epic', 'Legendary']");
});

test('Tags Field Added to Collections', () => {
  const collections = ['Bosses', 'Characters', 'Minibosses', 'Locations'];
  for (const col of collections) {
    const content = fs.readFileSync(`collections/${col}.ts`, 'utf-8');
    expect(content).toContain("name: 'tags'");
  }
});

test('Unified Search API Implementation', () => {
  const searchRouteExists = fs.existsSync('app/(site)/api/search/route.ts');
  expect(searchRouteExists).toBe(true);

  const searchRoute = fs.readFileSync('app/(site)/api/search/route.ts', 'utf-8');
  expect(searchRoute).toContain('Promise.all');
  expect(searchRoute).toContain("collectionFilter === 'all'");
  expect(searchRoute).toContain("equals: rarity");
});

test('Navbar Search Dropdown Refactored', () => {
  const wikiSearch = fs.readFileSync('components/wiki/WikiSearch.tsx', 'utf-8');
  expect(wikiSearch).toContain('/api/search?q=');
  expect(wikiSearch).not.toContain('/api/${col}?where');
});

test('Timeline Page RSC and Related Lore', () => {
  const timelinePage = fs.readFileSync('app/(site)/wiki/timeline/page.tsx', 'utf-8');
  expect(timelinePage).toContain('export const revalidate = 3600');
  expect(timelinePage).toContain("collection: 'events'");
  expect(timelinePage).toContain('relatedLore');
  expect(timelinePage).toContain('group-hover:scale-125');
});

test('Database Seeder seeds Timeline Events and Links relatedLore', () => {
  const seeder = fs.readFileSync('scripts/seed-wiki-full.ts', 'utf-8');
  expect(seeder).toContain("title: 'The Divine Genesis'");
  expect(seeder).toContain("title: 'The Wake of the Forgotten'");
  expect(seeder).toContain('relatedLore');
});
