import { exec } from 'child_process'
import Logger from '../classes/logger.class'

async function build(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    Logger.warning('Building project...')

    // TODO: Find a way to use execFile or something similar instead
    exec('pnpm build', (error, stdout, stderr) => {
      if (error) return reject(stderr)

      Logger.success('Successfully built project')
      resolve()
    })
  })
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
  Logger.success("You're all set!")

  Logger.newline()
  Logger.info("Type 'ompa' into your terminal to get started")
  Logger.newline()
  Logger.printWithColor('cyan', 'Happy coding!')
}

async function setup() {
  try {
    await build()
    await link()
    summarize()
  } catch (error) {
    Logger.error('Something went wrong when setting up project...')
  }
}

setup()
