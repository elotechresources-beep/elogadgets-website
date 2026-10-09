import { access, cp, mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const required = ['index.html', 'styles.css', 'script.js', 'business.js', 'robots.txt', 'assets/hero-phone-workspace.jpg', 'assets/gadgets-workspace.jpg'];
for (const file of required) await access(join(root, file));
const html = await readFile(join(root, 'index.html'), 'utf8');
for (const marker of ['<title>', 'name="description"', 'property="og:title"', 'id="services"', 'id="products"', 'id="location"', 'id="contact"']) {
  if (!html.includes(marker)) throw new Error(`Build check failed: missing ${marker}`);
}
const output = join(root, 'dist');
await mkdir(output, { recursive: true });
for (const file of required) {
  await mkdir(join(output, dirname(file)), { recursive: true });
  await cp(join(root, file), join(output, file));
}
console.log(`Static build complete in dist/ (${required.length} files; metadata, business sections and photographs checked).`);
