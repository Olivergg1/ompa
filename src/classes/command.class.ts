import { getArgumentsAndFlags } from '../helpers/command.helper'
import { CommandExecutable, CommandSetup, CommandSetupOptions } from '../types'
import Logger from './logger.class'

export default class Command {
  public name: string
  private executable!: CommandExecutable
  private setupable!: CommandSetup

  constructor(name: string) {
    this.name = name
  }

  public setExecutable(executable: CommandExecutable) {
    this.executable = executable

    return this
  }

  public setSetup(setupable: CommandSetup) {
    this.setupable = setupable

    return this
  }

  public execute(args: string[]) {
    if (!this.executable) return Logger.warning(this.name, 'has no executable!')

    const { args: argsv, flags } = getArgumentsAndFlags(args)

    this.executable(argsv, flags)
  }

  public setup(args: string[], options: Partial<CommandSetupOptions> = {}) {
    const { flags } = getArgumentsAndFlags(args)

    Logger.newline()
    Logger.warning(`Running '${this.name}' setup...`)

    if (!this.setupable) {
      return Logger.cyan(`'${this.name}' has no setup, skipping...`)
    }

    const setupOptions: CommandSetupOptions = { force: false, ...options, args }

    // If force flag is set, set force in options to true
    if (flags.some(f => ['force', 'f'].includes(f))) setupOptions.force = true

    // Run setup method
    this.setupable(args, setupOptions)

    Logger.success(`Finshed setting up '${this.name}'`)
  }
}
