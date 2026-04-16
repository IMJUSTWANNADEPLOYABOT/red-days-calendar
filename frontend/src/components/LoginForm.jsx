import { useState } from 'react'
import loginService from '../services/login'
import recordService from '../services/records'


const LoginForm = ({setUser}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {

            const user = { username, password }
            const response = await loginService.login(user)
            console.log(response)
            window.localStorage.setItem('LoggedRedDaysUser', JSON.stringify(response))
            recordService.setToken(response.token)
            setUser(response)
            //setUsername('')
            //setPassword('')
            console.log('User есть!', response)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div>
                <h1 className='formHeading'>RedDays Calendar</h1>
                <h4 className='formHeading'>Первые два цикла – бесплатно &lt;3</h4>
                <h3 className='formHeading'>Войти в аккаунт</h3>
                <form className='form' onSubmit={handleLogin}>
                    <input
                        required
                        type='text'
                        placeholder='Юзернейм'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />

                    <input
                        required
                        type='password'
                        placeholder='Пароль'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <button disabled={!(username && password)} type='submit'>Далее</button>
                </form>
            </div>
        </>
    )
}

export default LoginForm