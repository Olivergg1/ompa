import { execFile } from 'child_process'
import Command from '../../classes/command.class'
import Logger from '../../classes/logger.class'
import { not } from '../../helpers/not.helper'

const npxPath = 'C:/Program Files/nodejs/npx.cmd'

const createOptions = {
  react: createReactApp,
} as Record<string, (name: string) => unknown>

function createReactApp(name: string) {
  return new Promise<void>((resolve, reject) => {
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

async function setup() {
  Logger.cyan('Create dotfiles resource...')
}

async function execute(args: string[], flags: string[]) {
  const [framework, name] = args

  if (!framework) return Logger.error('No framework provided')

  if (not(framework in createOptions)) {
    return Logger.error(`Framework '${framework}' is unsupported`)
  }

  if (!name) return Logger.error('No project name provided')

  // Get create method from options
  const create = createOptions[framework]

  try {
    await create(name)
    await setup()
  } catch (err) {
    Logger.error(err as string)
  }
}

const gitconf = new Command('create').setExecutable(execute).setSetup(setup)

export default gitconf
