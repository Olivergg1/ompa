import path from 'path'
import fs from 'fs'
import Command from '../../classes/command.class'
import GithubConfigProfiles from '../../configs/github.profiles'
import { not } from '../../helpers/not.helper'
import { execFile } from 'child_process'
import Logger from '../../classes/logger.class'

function findGitDirectory() {
  let currentDir = process.cwd()

  while (true) {
    const gitDir = path.join(currentDir, '.git')

    // Check if .git exists and is a directory
    if (fs.existsSync(gitDir) && fs.lstatSync(gitDir).isDirectory()) {
      return gitDir // Return the path to the .git folder
    }

    const parentDir = path.dirname(currentDir)

    // If we've reached the root directory, stop the search
    if (parentDir === currentDir) return null

    // Move up to the parent directory and continue the search
    currentDir = parentDir
  }
}

async function setGitConfig(
  key: string,
  value: string,
  global: boolean = false
) {
  const localOrGlobal = global ? '--global' : '--local'

  return new Promise<void>((resolve, reject) => {
    execFile(
      'git',
      ['config', localOrGlobal, key, value],
      (error, stdout, stderr) => {
        if (error) return reject('Failed to set Git config')

        resolve()
      }
    )
  })
}

async function execute(args: string[], flags: string[]) {
  const [profile] = args

  if (!profile) return Logger.error('No profile provided')

  Logger.info(`Using profile ${profile}...`)
  Logger.info('Looking up profile...')

  if (not(profile in GithubConfigProfiles)) {
    return Logger.error(`Couldn't find the profile '${profile}'`)
  }

  Logger.success(`Found profile '${profile}'`)

  // Determine if config should be updated globally
  const setGlobally = flags.includes('global')

  if (!setGlobally) {
    // Find git directory
    const gitDir = findGitDirectory()

    if (!gitDir) {
      Logger.error(`Not in a git directory`)
      Logger.warning('Did you mean to use --global?')
      return
    }

    Logger.success('Found Git directory')
  } else {
    Logger.warning('Global flag set, trying to update global config...')
  }

  Logger.info('Updating git config...')

  // Update the config accordingly
  const githubProfile = GithubConfigProfiles[profile]
  await setGitConfig('user.name', githubProfile.name, setGlobally)
  await setGitConfig('user.email', githubProfile.email, setGlobally)

  Logger.newline()
  Logger.success('Successfully updated git config!')
}

const gitconf = new Command('gitconf').setExecutable(execute)

export default gitconf
