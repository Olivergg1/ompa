import config from '../resources/gitconf.resource.json'

interface GithubConfigProfile {
  name: string
  email: string
}

export interface GithubProfilesConfig
  extends Record<string, GithubConfigProfile> {}

const GithubConfigProfiles = config as GithubProfilesConfig

export default GithubConfigProfiles
