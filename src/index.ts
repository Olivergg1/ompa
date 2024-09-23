#!/usr/bin/env node

import { getCommands } from './helpers/command.helper'
import Logger from './classes/logger.class'
import figlet from 'figlet'

const [, , ...args] = process.argv

async function displayFiglet() {
  return new Promise<void>((resolve, reject) => {
    figlet('Ompa', (err, data) => {
      if (err) {
        Logger.error('Failed to create figlet')
        return reject(err)
      }

      console.log(data)
      Logger.newline()
      return resolve()
    })
  })
}

async function welcome() {
  const commands = await getCommands()

  await displayFiglet()

  Logger.info('Thanks for using Ompa')
  Logger.info('Here are some subcommands you may use')
  Logger.newline()

  for (const command of commands) {
    Logger.success(command.name)
  }
}

async function main(...args: string[]) {
  const [cmd, ...rest] = args

  if (!cmd) return await welcome()

  const commands = await getCommands()
  const command = commands.find(c => c.name === cmd)

  if (!command) return Logger.error(`Command '${cmd}'not found.`)

  command.execute(rest)
}

main(...args)
