// shared data across instances so we load only once

import { ref } from 'vue'

declare global {
  const fathom: {
    trackGoal: (id: string, value: number) => any
  }
}

export interface Sponsor {
  url: string
  img: string
  name: string
  description?: string
  priority?: boolean
}

export interface SponsorData {
  special: Sponsor[]
  platinum: Sponsor[]
  platinum_china: Sponsor[]
  gold: Sponsor[]
  silver: Sponsor[]
  bronze: Sponsor[]
}

export const data = ref<SponsorData>()
export const pending = ref<boolean>(false)

export const base = `https://sponsors.vuejs.org`

export const load = async () => {
  delAds()
  if (!pending.value) {
    pending.value = true
    data.value = await (await fetch(`${base}/data.json`)).json()
  }
}

export function delAds() {
  const content = document.querySelector('.VPContentDoc') as HTMLDivElement
  const aside = content.querySelector('.container>.aside>.aside-container') as HTMLDivElement

  const child = aside.querySelector('.VPContentDocOutline')
  aside.innerHTML = `<div class='VPContentDocOutline'>${child?.innerHTML}</div>`
  // for (let node of aside.childNodes) {
  //   if(child!==node) aside.removeChild(node);
  // }
}

