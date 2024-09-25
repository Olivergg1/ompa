import { execFile } from 'child_process'
import Logger from '../classes/logger.class'
import util from 'util'
import path from 'path'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'

// TODO: Create a function for dynamically finding the path to PNPM
const PNPM_PATH = 'C:/Users/olive/AppData/Roaming/npm/pnpm.cmd'

const execFilePromise = util.promisify(execFile)

export function findExistingPnpmProject(dir: string) {
  const packageJsonPath = path.join(dir, 'package.json')

  if (existsSync(packageJsonPath)) return dir

  const parentDir = path.dirname(dir)

  // If we reach the root directory, stop searching
  if (parentDir === dir) return null

  return findExistingPnpmProject(parentDir)
}

export async function initializePnpmProject(projectPath: string) {
  const actualPath = path.resolve(projectPath)

  // Check for exisiting project
  const potentialProject = findExistingPnpmProject(actualPath)
  if (potentialProject) {
    throw `Can not create a project within another project. Found existing project at ${potentialProject}`
  }

  Logger.newline().cyan('Creating project at path:', actualPath)

  // Create directories recursively if they do not exist
  await mkdir(actualPath, { recursive: true })

  // Init PNPM project
  await execFilePromise(PNPM_PATH, ['init'], { cwd: actualPath }).catch(() => {
    throw 'Failed to initialze PNPM project'
  })

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
