export type CommandExecutable = (args: string[], flags: string[]) => unknown

export interface CommandSetupOptions {
  args: string[]
  force: boolean
}

export type CommandSetup = (
  args: string[],
  options: CommandSetupOptions
) => unknown
