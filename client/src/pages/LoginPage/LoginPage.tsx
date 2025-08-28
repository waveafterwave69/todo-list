import AuthForm from '../../components/AuthForm/AuthForm'

const LoginPage: React.FC = () => {
    return (
        <>
            <div className="container">
                <AuthForm type="login" />
            </div>
        </>
    )
}

export default LoginPage
