import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE_URL } from '../../api/api'
import type { TodoState, CreateTodoData, Todo } from '../../types/types'

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
}

const getAccessToken = () => localStorage.getItem('accessToken')

axios.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken()
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const fetchTodos: any = createAsyncThunk(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/todos`)
            console.log(response)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createTodo: any = createAsyncThunk(
    'todos/createTodo',
    async (todoData: CreateTodoData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/todos`, todoData)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateTodo: any = createAsyncThunk(
    'todos/updateTodo',
    async (todoData: Todo, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/todos/${todoData.id}`,
                todoData
            )
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteTodo: any = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_BASE_URL}/todos/${id}`)
            return id
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false
                state.todos = action.payload
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as any
            })
            .addCase(createTodo.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.loading = false
                state.todos.push(action.payload)
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as any
            })
            .addCase(updateTodo.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false
                state.todos = state.todos.map((todo) =>
                    todo.id === action.payload.id ? action.payload : todo
                )
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as any
            })
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false
                state.todos = state.todos.filter(
                    (todo) => todo.id !== action.payload
                )
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as any
            })
    },
})

export default todoSlice.reducer
