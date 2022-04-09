import { task } from '../mod.ts';

task('who', async function() {
  const p = Deno.run({
    cmd: ['whoami'],
    stdout: 'piped',
  });
  return await p.output();
});

task.run();
