import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const AuthPage = ({setUser}) => {


    const [loginForm, setLoginForm] = useState(true)

    return (
        <>
            <div className='formContainer'>
            {loginForm ? <LoginForm setUser={setUser}/> : <RegisterForm/>}
            
            <button 
            className='toggle-btn'
            type='button' 
            onClick={() => setLoginForm(!loginForm)}>
                {loginForm ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
            </div>
        </>
    )

}

export default AuthPage