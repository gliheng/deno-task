# Deno Task Runner

Deno is nice for running tasks, since you don't need to install and you can easily install script as shell command.
This lib is for scheduling async tasks in deno.

## Simple task

`Task` function is used to define a task.

```typescript
Task('default', async function() {
  console.log('simple task');
});
```
You can run it with `deno run task.ts`.
Use `deno run task.ts a b c`. to run task a b c in sequence
Use `deno run task.ts -l` to list all available tasks

## FAQ
- How to remove deno run?
You can use hash bang like this `#!/usr/bin/env -S deno run --allow-net --allow-read`, and chmod +x your script file
Or you can install the script as a shell command.

## Async control

You can use `series` and `parallel` to control how to execute your async tasks

```typescript
Task('default', series(
  breakfast,
  parallel(watchTv, snack),
  sleep,
));
```