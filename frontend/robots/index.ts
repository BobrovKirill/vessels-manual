import { copyFile, existsSync } from 'node:fs'

export function createRobots() {
  const { NODE_ENV } = process.env
  let src = `robots/robots.${NODE_ENV}.txt`
  const dest = 'src/static/robots.txt'

  try {
    if (!existsSync(src)) {
      src = `robots/robots.txt`
    }

    copyFile(src, dest, (error) => {
      if (error) {
        return console.error(error)
      }
    })
  } catch (error) {
    return console.error(error)
  }
}
