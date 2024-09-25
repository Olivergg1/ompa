import fs from 'fs'
import path from 'path'
import Command from '../classes/command.class'
import { not } from './not.helper'
import { isDevelopment } from './environment.helper'

export async function getCommands() {
  // Create path string to commands directory
  const source = path.resolve(__dirname, '../')
  const commandsPath = path.join(source, 'commands')

  // Get subdirectories from Commands directory, filter out any non-directories
  const files = fs.readdirSync(commandsPath, { withFileTypes: true })
  const subdirectories = files.filter(file => file.isDirectory())

  const subdirCommands = subdirectories.map(subdir => {
    const subdirPath = path.join(commandsPath, subdir.name)

    // Get file names from subdriectory, filter out any non-typescript files
    const files = fs.readdirSync(subdirPath, { withFileTypes: true })
    const extension = isDevelopment ? '.ts' : '.js'
    const commandFiles = files.filter(file => file.name.endsWith(extension))

    // Retrieve the Command object exported from ts files
    // Ignore those that does not export
    const commands = commandFiles.reduce((acc, cf) => {
      const commandPath = path.join(subdirPath, cf.name)
      const command = require(commandPath).default

      // Ignore if no command or module is not a Command object
      if (!command || not(command instanceof Command)) return acc

      // Push command to list of commands
      return [command, ...acc]
    }, [] as Command[])

    return commands
  })

  // Flatten the subdirCommands 2d array into an 1d array with all commands
  const commands = subdirCommands.flat()

  return commands as Command[]
}

// Check if an argument can be interpreted as a flag
export function getFlag(arg: string) {
  const match = arg.match(/\s[-]{1,2}(\w*)/)
  const flag = match?.[1]

  return { isFlag: match !== null, flag }
}

export function getArgumentsAndFlags(args: string[]) {
  const result = args.reduce(
    (prev, curr) => {
      const flag = getFlag(curr)

      if (flag.isFlag) {
        prev.flags.push(flag.flag!)
        return prev
      }

      prev.args.push(curr)
      return prev
    },
    { args: [], flags: [] } as { args: string[]; flags: string[] }
  )

  return result
}
