export type Arguments = string[]

export type CommandExecutable = (args: string[], flags: string[]) => unknown
