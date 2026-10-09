import { access, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
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
const business = await readFile(new URL('../business.js', import.meta.url), 'utf8');
check('EloGadgets identity and confirmed address configured', business.includes('EloGadgets.ng') && business.includes('Shop A03, Plaza Penninah'), 'Set the verified business identity and address in business.js.');
console.log('INFO Required environment variables: none');
if (failed) process.exitCode = 1;
else console.log('PASS Doctor checks complete.');
