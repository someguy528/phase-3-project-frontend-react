import { useState } from "react"
import { useHistory } from "react-router-dom"

function FlightNew({onFlightAdd}){
    const history = useHistory();

    const [flightForm, setFlightForm] = useState({
        destination: "",
        departure: "2023-07-19",
        plane_id: 3
    })

    function handleChange(e){
        setFlightForm({
            ...flightForm,
            [e.target.name]: e.target.value
        })
    }
    console.log(flightForm)

    function handleSubmit(e){
        e.preventDefault();
        const isoTime = new Date(flightForm.departure).toISOString();
        const formattedFlightForm = {...flightForm, departure: isoTime}
        fetch("http://localhost:9292/flights", {
            method: "POST",
            headers: {
                "Content-Type":  "application/json"
            },
            body: JSON.stringify(formattedFlightForm)
        })
        .then(resp=>resp.json())
        .then(newFlight => {
            const newFlightObj ={
                ...newFlight,
                bookings : [] ,
                plane: {
                    name: "Experimental Plane 3",
                    capacity: 20,
                    condition: "Top Shape!"
                }
            }
            console.log(newFlightObj);
            onFlightAdd(newFlightObj);
            history.push("/flights")
        })
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit} > 
            <h2>Create a New Flight with Plane #3</h2>
            <label>Departure </label>
            <input type="date" id="start" name="departure"
             value={flightForm.departure} onChange={handleChange}
             min="2023-07-19" max="2023-07-31"></input>
             <header> Destination </header>
             <input type="text" value={flightForm.destination} onChange={handleChange} name="destination" />
             <button>Submit</button>
             </form>
        </div>
    )
}

export default FlightNew