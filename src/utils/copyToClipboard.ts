import os from 'os'
import { not } from '../helpers/not.helper'
import { spawn } from 'child_process'

// Structure: [command, ...[arguments]]
const COPY_COMMANDS: Record<string, string[]> = {
  darwin: ['pbcopy'],
  win32: ['clip'],
  linux: ['xclip', '-selection', 'clipboard'],
}

export async function copyToClipboard(text: string) {
  const platform = os.platform()

  // Catch any non-supported platforms
  if (not(platform in COPY_COMMANDS)) {
    throw new Error(`Unsupported platform: ${platform}`)
  }

  // Deconstruct command and args
  const [command, ...args] = COPY_COMMANDS[platform]

  // Spawn child process
  const child = spawn(command, args)

  // Write text to be copied to stdin stream
  child.stdin.end(text)
}
