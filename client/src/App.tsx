import { Route, Routes, useNavigate } from 'react-router'
import { routesConfig } from './routes/routesConfig'
import type { IRoutes } from './types/types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchTodos } from './store/slices/todoSlice'
import type { RootState } from './store/store'
import { checkAuth } from './store/slices/authSlice'

const App: React.FC = () => {
    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    )
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchTodos())
        }
    }, [isAuthenticated, user, dispatch])

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        } else {
            navigate('/todos')
        }
    }, [])

    return (
        <>
            <Routes>
                {routesConfig.map(({ page, url }: IRoutes) => (
                    <Route path={url} element={page} />
                ))}
            </Routes>
        </>
    )
}

export default App
