import { exec } from 'child_process'
import Logger from '../classes/logger.class'
import { getArgumentsAndFlags, getCommands } from '../helpers/command.helper'
import { loadResources } from './loadResources'

const [, , ...argv] = process.argv
const { args, flags } = getArgumentsAndFlags(argv)

async function build(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    Logger.newline().warning('Building project...')

    // TODO: Find a way to use execFile or something similar instead
    exec('pnpm build', (error, stdout, stderr) => {
      if (error) return reject(stderr)

      Logger.success('Successfully built project')
      resolve()
    })
  })
}

async function runCommandSetups() {
  const commands = await getCommands()

  for (let command of commands) {
    command.setup(args)
  }
}

async function link(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    Logger.newline()
    Logger.warning('Linking project...')

    // TODO: Find a way to use execFile or something similar instead
    exec('npm link', (error, stdout, stderr) => {
      if (error) return reject(stderr)

      Logger.success('Successfully linked project')
      resolve()
    })
  })
}

async function summarize(): Promise<void> {
  Logger.newline()
  Logger.green("You're all set!")

  Logger.newline()
  Logger.cyan("Type 'ompa' into your terminal to get started")

  Logger.newline()
  Logger.cyan('Happy coding!')
}

async function setup() {
  const forceResource = flags.some(f => ['f', 'force'].includes(f))

  try {
    await loadResources(forceResource)
    await runCommandSetups()
    await build()
    await link()
    await summarize()
  } catch (error) {
    Logger.error('Something went wrong when setting up the project...')
  }
}

setup()
