import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, register } from '../../store/slices/authSlice'
import type { AuthType } from '../../types/types'

interface AuthFormProps {
    type: AuthType
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!username || !password) {
            setError('Имя пользователя и пароль обязательны.')
            return
        }

        try {
            if (type === 'login') {
                await dispatch(login({ username, password }))
                navigate('/todos')
            } else {
                await dispatch(register({ username, password }))
                navigate('/login')
            }
        } catch (error: any) {
            console.error('Ошибка авторизации:', error)
        }
    }

    return (
        <div className="mt-15 max-w-3xl flex flex-col justify-center text-center my-0 mx-auto">
            <h2 className="mb-8 text-4xl font-semibold">
                {type === 'login' ? 'Вход' : 'Регистрация'}
            </h2>
            {error && <p className="text-red-500 text-lg mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                        setError('')
                    }}
                    className="border font-normal text-lg rounded py-3 px-4 text-gray-100 focus:text-white"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setError('')
                    }}
                    className="border text-lg font-normal rounded py-3 px-4 text-gray-100 focus:text-white"
                />
                <button
                    type="submit"
                    className="bg-blue-500 font-semibold text-xl hover:bg-blue-700 text-white py-3 px-4 rounded"
                >
                    {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>
            <Link
                to={type === 'login' ? '/register' : '/login'}
                className="text-gray-500 mt-2.5"
            >
                {type === 'login' ? 'Зарегистрироваться' : 'Войти'}
            </Link>
        </div>
    )
}

export default AuthForm
