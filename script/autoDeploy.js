#!/usr/bin/env zx


(async ()=>{
  $.verbose = true
  await buildPack()
  cd('D:\\webStormProject\\temp\\docs-main')
  await deploy()

})()



async function buildPack(){
  cd('D:\\webStormProject')
  const output = await $`ls`
  const dir = 'temp'
  await mkdirInCur(dir)
  cd(dir)
  await $`pwd`
  await $`git clone https://github.com/ffeeng/docs-main.git`
  cd('docs-main')
  await $`pnpm install`
  await $`npm run build`
}

async function deploy(){
  await $`pwd`
  const dir = 'dist'
  await mkdirInCur(dir)
  cd(dir)
  await $`pwd`
  await $`git init`
  await $`cp -r ../.vitepress/dist/* .`
  await $`git add .`
  await $`git commit -m '发版'`
  await $`git checkout -b main`
  await $`git remote add origin https://github.com/ffeeng/ffeeng.github.io.git`
  await $`git push --force --set-upstream origin main`
}


async function mkdirInCur(dir){

  const output = await $`ls`
  if (output.stdout.split('\n').includes(dir)) {
    console.log('info: 存在文件', dir)
    await $`rm -rf ${dir}`
  } else {
    console.log('info: 不存在文件', dir)
  }
  await $`mkdir ${dir}`
  return dir

}




