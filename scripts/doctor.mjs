import { access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { business } from '../business.js';
const check = (name, pass, fix = '') => console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${pass || !fix ? '' : ` — ${fix}`}`);
let failed = false;
for (const tool of ['node', 'npm', 'git']) {
  const result = spawnSync(tool, ['--version'], { encoding: 'utf8' });
  const pass = result.status === 0;
  const version = result.stdout.trim().split('\n')[0] || result.stderr.trim().split('\n')[0] || 'available';
  check(`${tool} ${pass ? version : 'unavailable'}`, pass, `Install ${tool} or reopen the configured Codespace.`);
  failed ||= !pass;
}
for (const tool of ['gh', 'docker']) {
  const result = spawnSync(tool, ['--version'], { encoding: 'utf8' });
  const version = result.stdout.trim().split('\n')[0] || result.stderr.trim().split('\n')[0] || 'available';
  console.log(`${result.status === 0 ? 'INFO' : 'WARN'} Optional ${tool}: ${result.status === 0 ? version : 'not installed; not required by this static site.'}`);
}
for (const file of ['index.html', 'styles.css', 'script.js', 'business.js', 'assets/hero-phone-workspace.jpg', 'assets/gadgets-workspace.jpg']) {
  try { await access(new URL(`../${file}`, import.meta.url)); check(`${file} exists`, true); }
  catch { check(`${file} exists`, false, `Restore or create ${file}.`); failed = true; }
}
check('EloGadgets identity and address configured', business.name === 'EloGadgets.ng' && business.address.includes('Shop A03, Plaza Penninah'), 'Set the verified business identity and address in business.js.');
check('WhatsApp international destination configured', business.whatsapp === 'https://wa.me/2349037503635', 'Set the verified international WhatsApp destination in business.js.');
check('Email and social destinations configured', business.email === 'hello@elogadgets.ng' && Boolean(business.whatsappChannel) && Boolean(business.whatsappCommunity) && Boolean(business.tiktok), 'Review confirmed contact destinations in business.js.');
check('All six WhatsApp message types configured', ['general', 'buy', 'sell', 'swap', 'repair', 'delivery'].every((key) => Boolean(business.messages[key])), 'Configure general, buy, sell, swap, repair and delivery enquiry messages.');
check('Five services and eight product categories configured', business.services.length === 5 && business.categories.length === 8, 'Review the service and category lists in business.js.');
check('Online availability does not claim store hours', business.availability === 'Online enquiries available 24/7', 'Use online availability wording only; do not imply store hours.');
console.log('INFO Required environment variables: none');
if (failed) process.exitCode = 1;
else console.log('PASS Doctor checks complete.');
