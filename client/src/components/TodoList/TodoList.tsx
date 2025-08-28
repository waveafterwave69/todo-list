// client/src/components/TodoList.tsx
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import type { Todo } from '../../types/types'
import TodoForm from '../TodoForm/TodoForm'
import TodoItem from '../TodoItem/TodoItem'
import type { RootState } from '../../store/store'

import spinner from '../../assets/download.svg'

const TodoList: React.FC = () => {
    const { todos, loading, error } = useSelector(
        (state: RootState) => state.todos
    )
    const [filter, setFilter] = useState('all')

    let filteredTodos: Todo[] = [...todos]

    if (filter === 'active') {
        filteredTodos = todos.filter((todo) => !todo.completed)
    } else if (filter === 'completed') {
        filteredTodos = todos.filter((todo) => todo.completed)
    }

    return (
        <div>
            <h1 className="mt-15 w-3xl text-4xl font-semibold">Список задач</h1>
            <TodoForm />
            <div className="mb-4">
                <button
                    onClick={() => setFilter('all')}
                    className={`bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded mr-2 ${
                        filter === 'all' ? 'bg-gray-500' : ''
                    }`}
                >
                    Все
                </button>
                <button
                    onClick={() => setFilter('active')}
                    className={`bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded mr-2 ${
                        filter === 'active' ? 'bg-gray-500' : ''
                    }`}
                >
                    Активные
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    className={`bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded ${
                        filter === 'completed' ? 'bg-gray-500' : ''
                    }`}
                >
                    Выполненные
                </button>
            </div>

            {error && <p className="text-red-500 text-lg mb-1">{error}</p>}

            {loading ? (
                <img
                    src={spinner}
                    alt="загрузка..."
                    className="my-0 mx-auto w-40"
                />
            ) : (
                <ul>
                    {filteredTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TodoList
