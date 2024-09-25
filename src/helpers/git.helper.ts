import { execFile } from 'child_process'
import path from 'path'
import util from 'util'
import Logger from '../classes/logger.class'

const execFilePromise = util.promisify(execFile)

export async function initializeGit(at: string = '.') {
  const actualPath = path.resolve(at)

  Logger.newline().cyan('Initializing Git...')

  await execFilePromise('git', ['init'], { cwd: actualPath })

  Logger.success('Successfully created Git repo!')
}
