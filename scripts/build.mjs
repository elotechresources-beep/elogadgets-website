import { access, cp, mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const required = ['index.html', 'styles.css', 'script.js', 'business.js', 'robots.txt', 'assets/hero-phone-workspace.jpg', 'assets/gadgets-workspace.jpg'];
for (const file of required) await access(join(root, file));
const html = await readFile(join(root, 'index.html'), 'utf8');
for (const marker of ['<title>', 'name="description"', 'property="og:title"', 'id="services"', 'id="products"', 'id="location"', 'id="contact"', 'data-service-grid', 'data-category-grid', 'data-social="channel"', 'data-social="community"', 'data-social="tiktok"', 'data-email']) {
  if (!html.includes(marker)) throw new Error(`Build check failed: missing ${marker}`);
}
const { business } = await import(new URL('../business.js', import.meta.url));
for (const field of ['phone', 'email', 'whatsappChannel', 'whatsappCommunity', 'tiktok', 'availability', 'delivery']) {
  if (!business[field]) throw new Error(`Build check failed: missing configured business ${field}`);
}
for (const message of ['general', 'buy', 'sell', 'swap', 'repair', 'delivery']) {
  if (!business.messages[message]) throw new Error(`Build check failed: missing WhatsApp message ${message}`);
}
if (business.services.length !== 5 || business.categories.length !== 8) throw new Error('Build check failed: service or product category list is incomplete.');
const output = join(root, 'dist');
await mkdir(output, { recursive: true });
for (const file of required) {
  await mkdir(join(output, dirname(file)), { recursive: true });
  await cp(join(root, file), join(output, file));
}
console.log(`Static build complete in dist/ (${required.length} files; metadata, business sections and photographs checked).`);
