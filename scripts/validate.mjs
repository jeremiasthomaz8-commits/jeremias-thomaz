import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { projects, categories, contact } from '../dist/assets/data.js';

const html = await readFile('dist/index.html', 'utf8');
assert.match(html, /<html lang="pt-BR">/);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing anchor ${match[1]}`);
for (const match of html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)) await access(resolve('dist', match[1]));
for (const project of projects) { await access(resolve('dist', project.image)); assert.ok(project.categories.every((category) => categories.includes(category))); }
assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
assert.match(contact.phone, /^55\d{10,11}$/);
assert.match(contact.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
for (const file of ['dist/assets/app.js', 'dist/assets/data.js', 'scripts/serve.mjs']) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
}
console.log(`Verificação concluída: ${projects.length} projetos, ${categories.length} filtros, arquivos e navegação válidos. Site estático pronto em dist/.`);
