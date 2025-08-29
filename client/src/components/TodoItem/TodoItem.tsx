import React from 'react'
import { updateTodo, deleteTodo } from '../../store/slices/todoSlice'
import type { Todo } from '../../types/types'
import { useAppDispatch } from '../../hooks/dispatchAndSelector'

interface TodoItemProps {
    todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const dispatch = useAppDispatch()

    const handleToggle = async () => {
        try {
            await dispatch(updateTodo({ ...todo, completed: !todo.completed }))
        } catch (error: any) {
            console.error('Ошибка обновления задачи:', error)
        }
    }

    const handleDelete = async () => {
        try {
            await dispatch(deleteTodo(todo.id))
        } catch (error: any) {
            console.error('Ошибка удаления задачи:', error)
        }
    }

    return (
        <li className="flex items-center justify-between py-4 border-b border-gray-100">
            <div>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                    className="mr-3 leading-tight"
                />
                <span
                    className={
                        todo.completed
                            ? 'line-through text-gray-400 text-2xl'
                            : 'text-white  text-2xl'
                    }
                >
                    {todo.title}
                </span>
            </div>
            <div>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                >
                    Удалить
                </button>
            </div>
        </li>
    )
}

export default TodoItem
