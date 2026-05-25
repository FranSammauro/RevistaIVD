import 'server-only'

export interface User {
  id: string
  username: string
  displayName: string
  category: string
  passwordHash: string
}

export const USERS: User[] = [
  {
    id: '1',
    username: 'quimica',
    displayName: 'Lic. Astrid Uhlenburg',
    category: 'quimica',
    passwordHash: '71df4fc163eef2cad3f33aa18d584b1c939af7bd4ea7a0df0225180a4ef52842',
  },
  {
    id: '2',
    username: 'fisica',
    displayName: 'Prof. Agustina Cervera',
    category: 'fisica',
    passwordHash: '5a73a91675b7e2d3271b8d60d1cde7a556d3085e5eae8d9b35c61f365c128dda',
  },
  {
    id: '3',
    username: 'tierra',
    displayName: 'Prof. Estela Abal',
    category: 'ciencias-de-la-tierra',
    passwordHash: '79934108b20e82f49151dec2c97f17ad7d243fb3e7c5b9d3008e82971ae6ad76',
  },
  {
    id: '4',
    username: 'biologia',
    displayName: 'Prof. Florencia Restorff',
    category: 'biologia',
    passwordHash: '429f2057d4cb71158cfad6308311642df5ea7972b12231c5a4b5a986700a32e2',
  },
]

export async function hashPassword(username: string, password: string): Promise<string> {
  const data = new TextEncoder().encode(`${username}:${password}`)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function validateUser(username: string, password: string): Promise<User | null> {
  const user = USERS.find(u => u.username === username)
  if (!user) return null
  const hash = await hashPassword(username, password)
  if (hash !== user.passwordHash) return null
  return user
}

export function getUserByUsername(username: string): User | null {
  return USERS.find(u => u.username === username) || null
}
