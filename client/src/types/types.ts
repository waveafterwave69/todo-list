// client/src/types.ts
export interface User {
    id: number
    username: string
}

export interface AuthState {
    isAuthenticated: boolean
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    loading: boolean
    error: any
}

export interface AuthData {
    username: string
    password: string
}

export type AuthType = 'login' | 'register'

export interface Todo {
    id: number
    title: string
    completed: boolean
    userId: number
}

export interface TodoState {
    todos: Todo[]
    loading: boolean
    error: any
}

export interface CreateTodoData {
    title: string
}

export interface UpdateTodoData {
    id: number
    title: string
    completed: boolean
}

export interface IRoutes {
    page: React.ReactNode
    url: string
}
