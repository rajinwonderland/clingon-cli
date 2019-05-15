// tslint:disable:no-console no-if-statement no-expression-statement
import * as fs from 'fs'
import ora, { Ora } from 'ora'
import { join, dirname } from 'path'
import { FrontMatterOptions, c } from './utils'
import _dirp from 'mkdirp'

export async function createBlog(
  frontmatter: FrontMatterOptions,
  path: string = '/clients/blog/content/blog/',
  type: 'mdx' | 'md'
): Promise<void> {
  console.log()
  const { title } = frontmatter

  const slugify = require('slugify')
  const slug = slugify(title.toLowerCase())
  const spinnerPackage = ora(c.blue('Creating metadata')).start()
  const blogPath = join(path, `${slug}`)

  const newBlog = `export const frontmatter =
      ${JSON.stringify(frontmatter)}
  `

  await writeBlogMetaData(blogPath, spinnerPackage, newBlog, type)

  spinnerPackage.succeed(
    c.green.bold(`Blog Metadata Successfully Created!`)
  )

  console.log(`\n${c.green.bold(`Created ${title} 🎉`)}\n`)
  console.log(`\n${c.green(`located in ${blogPath}`)}`)
}

function writeBlogMetaData(
  filePath,
  spinner: Ora,
  newBlog: string,
  type: 'mdx' | 'md'
) {
  const dir = dirname(filePath)
  const exists = fs.existsSync(filePath)
  if (exists) {
    const id = require('cuid')
    const newDir = `${filePath}-${id()}`

    return _dirp(newDir, async (err, made) => {
      if (err) {
        console.error(c.red(err.name))
        console.error(c.red(err.code))
        console.error(c.red(err.message))
        console.error(c.red(err.errno.toString()))
        console.error(c.red(err.path))
        console.error(c.red(err.stack))
        console.error(c.red(err.syscall))
        spinner.stop()
        spinner.clear()
        throw Error(err)
      }
      const postPath = await join(made, `index.${type}`)
      console.log('exists', postPath)
      return fs.writeFileSync(postPath, newBlog)
    })
  }
  return _dirp(filePath, async (err, made) => {
    if (err) {
      console.error(c.red(err.name))
      console.error(c.red(err.code))
      console.error(c.red(err.message))
      console.error(c.red(err.errno.toString()))
      console.error(c.red(err.path))
      console.error(c.red(err.stack))
      console.error(c.red(err.syscall))
      spinner.stop()
      spinner.clear()
      throw Error(err)
    }
    const postPath = await join(made, `index.${type}`)
    console.log(postPath)
    return fs.writeFileSync(postPath, newBlog)
  })
}
