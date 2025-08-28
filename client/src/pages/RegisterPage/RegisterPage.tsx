import AuthForm from '../../components/AuthForm/AuthForm'

const RegisterPage: React.FC = () => {
    return (
        <>
            <div className="container">
                <AuthForm type="register" />
            </div>
        </>
    )
}

export default RegisterPage
