import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])


    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();


    const handleSubmit = async (e) => {

        if (!user) {
            setError('User Must be loged in')
            return
        }

        e.preventDefault();
        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(workout)
        })

        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
            setEmptyField(json.emptyField)
        }
        if (response.ok) {
            setTitle('')    
            setLoad('')
            setReps('')
            setError(null)
            setEmptyField([])

            console.log('New Workout Added', json);
            await dispatch({ type: 'CREATE_WORKOUT', payload: json.workout })
        }

    }

    return(
        <div className="workout-form">
            <h3 style={
                {textAlign: "center"}
            }>Add Workout</h3>
            <form className="create" onSubmit={handleSubmit}>
                <label>Exercise Name</label>
                <input 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyField.includes('title') ? 'error' : ''}
                />

                <label>Load (in kg)</label>
                <input 
                    type="number"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                    className={emptyField.includes('load') ? 'error' : ''}
                />

                <label>Reps</label>
                <input 
                    type="number"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                    className={emptyField.includes('reps') ? 'error' : ''}
                />

                <button>Add Workout</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
        
    );

}

export default WorkoutForm
