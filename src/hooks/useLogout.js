import { useAuthContext } from './useAuthContext'

export const useLogout = () => {

    const { dispatch } = useAuthContext()

    const logout = () => {
        // removing the local user data from browser
        localStorage.removeItem('user')

        // updating the user context
        dispatch({type: "LOGOUT"})
    }

    return { logout }

}