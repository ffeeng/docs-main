#!/usr/bin/env zx
$.verbose = true

await $`ls`;

cd('.vitepress');

// await $`rm -rf *`; 不删除隐藏文件
await $`rm -rf dist`;
await $`pwd`;
await $`mkdir dist`;
cd('dist');
await $`pwd`;
await $`git init`;
cd('../..');
await $`pwd`;
await $`npm run build`;
await $`ls .vitepress`;
cd('.vitepress/dist');
await $`pwd`;

await $`git add .`;
await $`git commit -m '发版'`;
await $`git checkout -b main`;
await $`git remote add origin https://github.com/ffeeng/ffeeng.github.io.git`;
await $`git push --force --set-upstream origin main`;




