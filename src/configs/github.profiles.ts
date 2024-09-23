import config from '../resources/github.resource.json'

interface GithubConfigProfile {
  name: string
  email: string
}

interface GithubProfilesConfig extends Record<string, GithubConfigProfile> {}

const GithubConfigProfiles = config as GithubProfilesConfig

export default GithubConfigProfiles
