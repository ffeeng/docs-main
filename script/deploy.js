#!/usr/bin/env zx

$.verbose = true

await $`ls`;
cd('.vitepress/dist');
await $`pwd`;
await $`git push`;




