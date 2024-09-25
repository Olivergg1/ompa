import { execFile } from 'child_process'
import Logger from '../classes/logger.class'
import util from 'util'
import path from 'path'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'

// TODO: Create a function for dynamically finding the path to PNPM
const PNPM_PATH = 'C:/Users/olive/AppData/Roaming/npm/pnpm.cmd'

const execFilePromise = util.promisify(execFile)

export async function initializePnpmProject(projectPath: string) {
  const actualPath = path.resolve(projectPath)

  // Check for exisiting project
  const potentialProject = path.resolve(actualPath, 'package.json')
  if (existsSync(potentialProject)) {
    return Logger.error('Found an already existing project at path')
  }

  Logger.newline().cyan('Creating project at path:', actualPath)

  // Create directories recursively if they do not exist
  await mkdir(actualPath, { recursive: true })

  // Init PNPM project
  const res = await execFilePromise(PNPM_PATH, ['init'], { cwd: actualPath })

  if (res.stderr) throw Logger.error('Failed to initialze PNPM project')

  Logger.success('Successfully initalized project!')
}

export async function addPnpmPackages(
  packages: string[],
  projectPath: string = './',
  devDependency = false
) {
  return new Promise<void>(async (resolve, reject) => {
    const dev = devDependency ? '-D' : ''
    try {
      Logger.newline().cyan('Adding NPM package(s):', packages.join(', '))
      await execFilePromise(PNPM_PATH, ['add', dev, ...packages], {
        cwd: projectPath,
      })
      Logger.success('Successfully added NPM packages!')
      resolve()
    } catch (error) {
      Logger.error('Failed to add NPM packages')
      reject(error)
    }
  })
}
