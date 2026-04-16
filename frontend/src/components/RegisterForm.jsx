import { useState } from 'react'
import userService from '../services/users'

const RegisterForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            const newUser = { username, password }
            const response = await userService.create(newUser)
            console.log('User создан!', response)
        }
        catch (error) {
            console.error(error)
        }
    }

    const isValidForm = username.length > 3 && password === confirmPassword && password.length > 1

    return (
        <>
            <div>
            <h1 className='formHeading'>RedDays Calendar</h1>
            <h4 className='formHeading'>Первые два цикла – бесплатно &lt;3</h4>
            <h3 className='formHeading'>Создание аккаунта</h3>
            <form className='form' onSubmit={handleRegister}>
                <input
                    required
                    type='text'
                    placeholder='Придумай юзернейм'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />

                <input
                    required
                    type='password'
                    placeholder='Пароль (хотя бы 3 символа)'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />

                <input
                    required
                    type='password'
                    placeholder='Повтори пароль'
                    value={confirmPassword}
                    onChange={({ target }) => setConfirmPassword(target.value)}
                />
                <button disabled={!isValidForm} type='submit'>Далее</button>
            </form>
            </div>
        </>
    )
}

export default RegisterForm