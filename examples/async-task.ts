#!/usr/bin/env -S deno run

import { delay } from 'https://deno.land/std@0.119.0/async/mod.ts';
import { task, series, parallel } from '../mod.ts';

task('getUp', function() {
  console.log('I get up in the morning');
});

function breakfast() {
  console.log('I eat breakfast');
}

async function watchTv() {
  console.log('I watch tv');
  await delay(100);
  console.log('I watched tv');
}

async function snack() {
  console.log('I have snack');
  await delay(100);
  console.log('I had snack');
}

function sleep() {
  console.log('I go to bed');
}

task(series(
  'getUp',
  breakfast,
  parallel(watchTv, snack),
  sleep,
));

task.run();
