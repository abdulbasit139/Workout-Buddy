import { useState } from 'react' 
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {

        setIsLoading(true)
        const response = await fetch('/api/user/login', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error);
        }
        if (response.ok) { 
            
            // storing the use in local storage
            localStorage.setItem("user", JSON.stringify(json))

            // updating the state of auth context
            dispatch({type: "LOGIN", payload: json})
            setIsLoading(false)
        }

        
    }
    return { login, error, isLoading}

}