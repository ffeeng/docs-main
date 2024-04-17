import MarkdownIt from 'markdown-it'

const excludedPages = [
  'frontend/html/link.md',
  // 'guide/quick-start.md',

]

export const textAdPlugin = (md: MarkdownIt) => {
  md.renderer.rules.heading_close = (tokens, i, options, env, self) => {
    const relativePath = env.relativePath
    const renderedContent = self.renderToken(tokens, i, options)

    return excludedPages.includes(relativePath)
      ? renderedContent
      : renderedContent.replace(/<\/h1>/, '</h1><TextAd/>')
  }
}
