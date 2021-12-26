import { Task, series } from '../mod.ts';

Task('who', async function() {
  let p = Deno.run({
    cmd: ['whoami'],
    stdout: 'piped',
  });
  return await p.output();
});
