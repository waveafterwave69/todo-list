import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE_URL } from '../../api/api'
import type { AuthState, AuthData } from '../../types/types'

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
}

export const register: any = createAsyncThunk(
    'auth/register',
    async (authData: AuthData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth/register`,
                authData
            )
            return response.data
        } catch (err: any) {
            console.error('Register error:', err)
            if (err.response) {
                return rejectWithValue(err.response.data)
            } else {
                return rejectWithValue({ message: 'Ошибка сети или сервера' })
            }
        }
    }
)

export const login: any = createAsyncThunk(
    'auth/login',
    async (authData: AuthData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth/login`,
                authData
            )
            const { accessToken, refreshToken, user } = response.data

            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            return { accessToken, refreshToken, user }
        } catch (err: any) {
            console.error('Login error:', err)
            if (err.response) {
                return rejectWithValue(err.response.data)
            } else {
                return rejectWithValue({ message: 'Ошибка сети или сервера' })
            }
        }
    }
)

export const refresh = createAsyncThunk(
    'auth/refresh',
    async (_, { rejectWithValue }) => {
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) {
            return rejectWithValue('Нет токена обновления')
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                refreshToken,
            })

            const { accessToken, refreshToken: newRefreshToken } = response.data

            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', newRefreshToken)

            return { accessToken, refreshToken: newRefreshToken }
        } catch (err: any) {
            // localStorage.removeItem('accessToken')
            // localStorage.removeItem('refreshToken')
            return rejectWithValue(err.response.data)
        }
    }
)

export const checkAuth: any = createAsyncThunk(
    'auth/checkAuth',
    async (_, { dispatch, rejectWithValue }) => {
        const accessToken = localStorage.getItem('accessToken')

        if (!accessToken) {
            return rejectWithValue('Нет access токена')
        }

        try {
            const result = await dispatch(refresh())

            if (checkAuth.rejected.match(result)) {
                return rejectWithValue('Не удалось обновить токен')
            }

            return
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            state.accessToken = null
            state.refreshToken = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as any
            })
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.refreshToken = action.payload.refreshToken
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as any
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken
                state.refreshToken = action.payload.refreshToken
            })
            .addCase(refresh.rejected, (state) => {
                state.isAuthenticated = false
                state.user = null
                state.accessToken = null
                state.refreshToken = null
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isAuthenticated = false
                state.user = null
                state.accessToken = null
                state.refreshToken = null
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
