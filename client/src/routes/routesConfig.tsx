import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import TodosPage from '../pages/TodosPage/TodosPage'

export const routesConfig = [
    {
        page: <LoginPage />,
        url: '/',
    },
    {
        page: <LoginPage />,
        url: '/login',
    },
    {
        page: <RegisterPage />,
        url: '/register',
    },
    {
        page: <TodosPage />,
        url: '/todos',
    },
]
