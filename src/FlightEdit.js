import { useParams , useRouteMatch , useHistory } from "react-router-dom"
import { useState } from "react"


function FlightEdit({flights, onFlightEdit}){
    const history = useHistory()
    const route = useRouteMatch().url
    const {flightId} = useParams()
    const flight = flights.find(f => f.id === parseInt(flightId))
    const [flightEditForm, setFlightEditForm] = useState({
        destination: flight.destination,
        departure: flight.departure.split('T')[0],
        plane_id: flight.plane_id
    })

    console.log(flight.plane)

    function handleChange(e){
        setFlightEditForm({
            ...flightEditForm, 
            [e.target.name]: e.target.value
        })
    }

    function handleEditSubmit(e){
        e.preventDefault()
        if(flightEditForm.destination === ""){
            return alert("A destination must be picked!")
        }
        fetch(`http://localhost:9292/flights/${flightId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(flightEditForm)
        })
        .then(resp=>resp.json())
        .then(changedFlight => {
            const changedFlightObj = {
                ...changedFlight,
                plane : flight.plane,
                bookings : flight.bookings
            }
            onFlightEdit(changedFlightObj)
            history.push(route.replace("/edit", ""))
        })
    }

    return (
        <form onSubmit={handleEditSubmit} >
            <h3>Edit Flight Details for Flight # {flight.id} </h3>
            <input type="date" id="start" name="departure"
             value={flightEditForm.departure} onChange={handleChange}
             min="2023-07-19" max="2023-07-31"></input>
             <header> Destination </header>
             <input type="text" value={flightEditForm.destination} onChange={handleChange} name="destination" />
             <button>Submit</button>
        </form>
    )
}

export default FlightEdit