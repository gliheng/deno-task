# Deno Task Runner
Scheduling async tasks in deno with ease.

## Simple task

`task` function is used to define a task.

```typescript
// Define the default task
task(async function() {
  console.log('simple task');
});
// Define a named task
task('coffee', async function() {
  console.log('Let us have ☕!');
});
// Run the default task or tasks from command line
task.run();
```
You can run it with `deno run task.ts`.
Use `deno run task.ts a b c`. to run task a b c in sequence
Use `deno run task.ts -l` to list all available tasks

## Task orchestration

You can use `series` and `parallel` to chain your async tasks

```typescript
task(series(
  cook,
  parallel(watchTv, breakfast, coffee),
  work,
));

You can use a task name or an async function.
```

## FAQ
- How to remove deno run?
You can use hash bang like this `#!/usr/bin/env -S deno run --allow-net --allow-read`, and chmod +x your script file
Or you can install the script as a shell command.
