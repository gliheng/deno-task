import { parse } from 'https://deno.land/std@0.119.0/flags/mod.ts';

const allTasks: Record<string, Task> = {};
export function task(cbk: Task): void;
export function task(name: string, cbk: Task): void;
export function task(name: any, cbk?: any) {
  if (typeof name == 'function') {
    cbk = name;
    name = 'default';
  }
  allTasks[name] = cbk;
}

type Task = () => Promise<any> | any;

function getTask(name: string): Task | undefined {
  return allTasks[name];
}

export function series(...tasks: (Task | string)[]) {
  return async () => {
    for (const task of tasks) {
      let fn;
      if (typeof task == 'string') {
        fn = allTasks[task];
      } else {
        fn = task;
      }
      const ret = fn();
      if (ret instanceof Promise) {
        await ret;
      }
    }
  };
}

export function parallel(...tasks: (Task | string)[]) {
  return () => {
    return Promise.all(tasks.map(task => {
      let fn;
      if (typeof task == 'string') {
        fn = allTasks[task];
      } else {
        fn = task;
      }
      return fn();
    }));
  };
}

export function src(glob: string) {

}

export function dest(glob: string) {
    
}

export async function run() {
  await Promise.resolve();
  const args = parse(Deno.args);
  if (args.l || args.list) {
    console.log('All tasks:');
    console.log(Object.keys(allTasks));
  } else {
    let torun = args._;
    if (torun.length == 0) {
      torun = ['default'];
    }
    const torunTasks = torun.map(e => {
      const t = getTask(String(e));
      if (!t) {
        throw `Cannot find task:${e}`;
      }
      return t;
    });
    series(...torunTasks)();
  }
}

task.run = run;
