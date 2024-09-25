import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import Logger from '../classes/logger.class'

export async function createFile(
  name: string,
  at: string = './',
  withContent: string = ''
) {
  Logger.newline().cyan(`Creating file '${name}'...`)

  const acutalPath = path.resolve(at, name)

  // Create directories at path if they do not exist
  await mkdir(at, { recursive: true })

  // Create and write to file
  try {
    await writeFile(acutalPath, withContent)
    Logger.success('Successfully created file!')
  } catch (error) {
    Logger.newline().error('Failed to write file', acutalPath)
  }
}
