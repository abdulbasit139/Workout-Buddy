import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'


export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        // removing the local user data from browser
        localStorage.removeItem('user')

        // updating the user context
        dispatch({type: "LOGOUT"})
        workoutsDispatch({type: "SET_WORKOUTS", payload: null})
    }

    return { logout }

}