import React, { useState } from 'react'
import { createTodo } from '../../store/slices/todoSlice'
import { useAppDispatch } from '../../hooks/dispatchAndSelector'

const TodoForm: React.FC = () => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const dispatch = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setTitle('')

        if (!title) {
            setError('Введите заголовок задачи.')
            return
        }

        try {
            await dispatch(createTodo({ title }))
        } catch (error: any) {
            console.error('Ошибка создания задачи:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-5 mb-3">
            {error && <p className="text-red-500 text-lg mb-1">{error}</p>}
            <div className="flex">
                <input
                    type="text"
                    placeholder="Добавить новую задачу"
                    value={title}
                    onChange={(e) => {
                        setError('')
                        setTitle(e.target.value)
                    }}
                    className="border font-normal text-lg rounded py-3 px-4 text-gray-400 focus:text-white  w-full"
                />
                <button
                    type="submit"
                    className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Добавить
                </button>
            </div>
        </form>
    )
}

export default TodoForm
