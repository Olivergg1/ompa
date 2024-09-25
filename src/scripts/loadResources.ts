import path from 'path'
import fs from 'fs'
import Logger from '../classes/logger.class'

export async function loadResources(force: boolean = false) {
  Logger.newline().info('Loading resources...')

  // Warn if --force flag is set
  if (force) Logger.warning('Force flag set, overwriting exisiting resources')

  // Find path to resources
  const resourcesPath = path.resolve('src', 'resources')

  // Find path to default resources directory
  const defaultResourcesPath = path.resolve(resourcesPath, 'default')

  // Filter out any non-resources
  const defaultResources = fs
    .readdirSync(defaultResourcesPath, {
      withFileTypes: true,
    })
    .filter(f => f.name.endsWith('resource.json'))

  // Copy default resource into resource directory if it not already exists
  for (let res of defaultResources) {
    const resourcePath = path.resolve(resourcesPath, res.name)

    // If resource alread exists and force flag is not set, skip without copying
    if (!force && fs.existsSync(resourcePath)) continue

    Logger.cyan('Creating resource', res.name)

    // Move a copy of default resource into resource directory
    const defaultResourcePath = path.resolve(defaultResourcesPath, res.name)

    fs.copyFileSync(defaultResourcePath, resourcePath)
  }
}
