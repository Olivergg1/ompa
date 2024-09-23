import path from 'path'
import fs from 'fs'
import Logger from '../classes/logger.class'

export async function loadResources(force: boolean = false) {
  Logger.newline().info('Loading resources...')

  if (force) Logger.warning('Force flag set, overwriting exisiting resources')

  const resourcesPath = path.resolve('src', 'resources')

  const defaultResourcesPath = path.resolve(resourcesPath, 'default')

  const defaultResources = fs
    .readdirSync(defaultResourcesPath, {
      withFileTypes: true,
    })
    .filter(f => f.name.endsWith('resource.json'))

  for (let res of defaultResources) {
    const resourcePath = path.resolve(resourcesPath, res.name)

    if (!force && fs.existsSync(resourcePath)) continue

    Logger.cyan('Creating resource', res.name)

    const defaultResourcePath = path.resolve(defaultResourcesPath, res.name)

    fs.copyFileSync(defaultResourcePath, resourcePath)
  }
}
