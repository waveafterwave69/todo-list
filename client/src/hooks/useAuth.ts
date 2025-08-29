import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../store/slices/authSlice'
import type { AuthType } from '../types/types'
import { useAppDispatch, useAppSelector } from './dispatchAndSelector'

const useAuth = (type: AuthType) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { error, isAuthenticated } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (error && error.error) {
            setIsError(error.error)
        } else {
            setIsError('')
        }
    }, [error])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!username || !password) {
            setIsError('Имя пользователя и пароль обязательны.')
            return
        }

        setIsError('')

        try {
            if (type === 'login') {
                await dispatch(login({ username, password }))
            } else {
                await dispatch(register({ username, password }))
                navigate('/login')
            }
        } catch (error: any) {
            console.error('Ошибка авторизации:', error)
            if (error.message) {
                setIsError(error.message)
            } else {
                setIsError('Произошла неизвестная ошибка.')
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/todos')
        }
    }, [isAuthenticated, navigate])

    return {
        setUsername,
        setPassword,
        isError,
        setIsError,
        handleSubmit,
        password,
        username,
    }
}

export default useAuth
