const SESSION_KEY = "evalyo_session"

export type AuthSession = {
  accessToken: string
  refreshToken: string
  userId: number
  role: string
  profile?: {
    first_name?: string
    last_name?: string
    email?: string
    role?: string
  }
}

export function saveSession(session: AuthSession) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null

  const raw = window.localStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    window.localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function updateSession(session: AuthSession) {
  saveSession(session)
}

export function clearSession() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(SESSION_KEY)
}
