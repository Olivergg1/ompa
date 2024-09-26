import Command from '../../classes/command.class'
import Logger from '../../classes/logger.class'
import { not } from '../../helpers/not.helper'
import { copyToClipboard } from '../../utils/copyToClipboard'

function createRandomStrongPassword(length = 16) {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseLetters = uppercaseLetters.toLowerCase()
  const digits = '0123456789'
  const specialCharacters = '!@#$%^&*()-_=+[]{}|;:,.<>?'

  const allCharacters =
    uppercaseLetters + lowercaseLetters + digits + specialCharacters
  let password = ''

  // Ensure that at least one character from each category is included
  password +=
    uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]
  password +=
    lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]
  password += digits[Math.floor(Math.random() * digits.length)]
  password +=
    specialCharacters[Math.floor(Math.random() * specialCharacters.length)]

  // Fill the rest of the password with random characters from all categories
  for (let i = 4; i < length; i++) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)]
  }

  // Shuffle the password to ensure randomness
  return password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('')
}

async function execute(args: string[], flags: string[]) {
  const verbose = flags.includes('verbose')
  const shouldCopy = not(flags.includes('no-copy'))
  const password = createRandomStrongPassword()

  Logger.cyan('Generating your super secure password...')

  // Log the password to console if verbose flag is set
  // If --no-copy flag is set, log the password in the terminal
  if (!shouldCopy || verbose) Logger.newline().cyan(password)

  if (shouldCopy) {
    try {
      await copyToClipboard(password)
      Logger.newline().success('Copied your new password to clipboard!')
    } catch (error) {
      Logger.error(error as any)
      Logger.warning('Use --no-copy to reveal the password in the terminal')
    }
  }
}

const gitconf = new Command('password').setExecutable(execute) //.setSetup(setup)

export default gitconf
