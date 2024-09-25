import { execFile } from 'child_process'
import Command from '../../classes/command.class'
import Logger from '../../classes/logger.class'
import { not } from '../../helpers/not.helper'
import {
  addPnpmPackages,
  initializePnpmProject,
} from '../../helpers/pnpm.helper'
import { createFile } from '../../helpers/file.helper'
import tsconfig from '../../resources/tsconfig.resource.json'
import path from 'path'
import { initializeGit } from '../../helpers/git.helper'

const npxPath = 'C:/Program Files/nodejs/npx.cmd'

const createOptions = {
  react: createReactApp,
  node: createNodeProject,
} as Record<string, (args: string[], flags: string[]) => Promise<unknown>>

async function createNodeProject(args: string[], flags: string[]) {
  const [pth, ...pkgs] = args
  const actualPath = pth ?? '.'

  // Initalize project at resolved path
  await initializePnpmProject(actualPath)

  // Create Git repo if --git flag is present
  if (flags.includes('git')) await initializeGit(actualPath)

  // Install typescript and types as dev dependencies
  await addPnpmPackages(['typescript', '@types/node'], actualPath, true)

  // Install any additional packages from user input, as prod dependencies
  if (pkgs.length > 0) {
    await addPnpmPackages(pkgs, actualPath)
  }

  // Copy tsconfig to project
  await createFile('tsconfig.json', actualPath, JSON.stringify(tsconfig))

  // Create index.ts file
  const srcPath = path.resolve(actualPath, 'src')
  await createFile('index.ts', srcPath, "console.log('Hi, Mom!')")
}

async function createReactApp(args: string[], flags: string[]) {
  return new Promise<void>((resolve, reject) => {
    const [name] = args

    // Check for name
    if (!name) return Logger.error('No project name provided')

    Logger.info('Creating React app...')

    execFile(
      npxPath,
      ['create-react-app', name, '--template', 'typescript'],
      { cwd: process.cwd() },
      (error, stdout, stderr) => {
        if (error) {
          Logger.red(stderr)
          return reject('Failed to set up React project')
        }

        Logger.success('Successfully created React app')
        resolve()
      }
    )
  })
}

// TODO: Implement setup method for copying dotfiles into newly created app
async function addDotfilesToProject() {
  Logger.cyan('Adding dotfiles...')
  Logger.success('Successfully added dotfiles to project')
}

// async function setup() {
//   Logger.cyan('Create dotfiles resource...')
// }

async function execute(args: string[], flags: string[]) {
  const [framework, ...rest] = args

  if (!framework) return Logger.error('No framework provided')

  if (not(framework in createOptions)) {
    return Logger.error(`Framework '${framework}' is unsupported`)
  }

  // Get create method from options
  const create = createOptions[framework]

  try {
    await create(rest, flags)
    // await setup()
  } catch (err) {
    Logger.error(err as string)
  }
}

const gitconf = new Command('create').setExecutable(execute) //.setSetup(setup)

export default gitconf
