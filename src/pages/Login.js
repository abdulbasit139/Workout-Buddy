import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();

        login(email, password)
    }

    return ( 
        <form className="login" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label>Email: </label>
            <input 
                type="text" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password: </label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Login</button>
            { error && <div className='error'>{ error }</div>}
        </form>
    );

}

export default Login