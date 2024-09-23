import { getArgumentsAndFlags } from '../helpers/command.helper'
import { CommandExecutable } from '../types'

export default class Command {
  public name: string
  private executable!: CommandExecutable

  constructor(name: string) {
    this.name = name
  }

  public setExecutable(executable: CommandExecutable) {
    this.executable = executable

    return this
  }

  public execute(args: string[]) {
    if (!this.executable) return console.log(this.name, 'has no executable!')

    const { args: argsv, flags } = getArgumentsAndFlags(args)

    this.executable(argsv, flags)
  }
}
