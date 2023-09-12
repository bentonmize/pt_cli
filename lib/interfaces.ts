export interface Me {
  kind: string
  id: number
  name: string
  initials: string
  username: string
  timezeone: object
  api_token: string
  has_google_identity: boolean
  accounts: Account[]
  projects: Project[]
  email: string
  receives_in_app_notifications: boolean
  twofactor_auth_enabled: boolean
  created_at: string
  updated_at: string
}

interface Project {
  kind: string
  id: number
  project_id: number
  project_name: string
  project_color: string
  favorite: boolean
  role: string
  last_viewed_at: string
}

interface Account {
  kind: string
  id: number
  name: string
  status: string
  plan: string
}
