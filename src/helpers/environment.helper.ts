import fs from 'fs'
import path from 'path'

const root = path.resolve(__dirname, '../')
const indexFilePath = path.join(root, 'index.ts')

const isEntryFileTs = fs.existsSync(indexFilePath)

export const isDevelopment = isEntryFileTs
export const isProduction = !isEntryFileTs
