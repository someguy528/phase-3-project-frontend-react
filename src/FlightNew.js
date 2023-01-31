import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

function FlightNew({onFlightAdd}){
    const history = useHistory();
    const [isFormLoaded, setIsFormLoaded] = useState(false)
    const [availablePlanes, setAvailablePlanes] = useState([])
    const [flightForm, setFlightForm] = useState({
        destination: "",
        departure: "2023-07-19",
        plane_id: 3
    })
    console.log(availablePlanes)

    useEffect(()=> {
        fetch("http://localhost:9292/planes")
        .then(resp=>resp.json())
        .then(data=> {
            setAvailablePlanes(data)
            setIsFormLoaded(true)
        })
    },[])

    function handleChange(e){
        let value = e.target.value
        if(e.target.name === "plane_id"){
            value = parseFloat(value)}
        setFlightForm({
            ...flightForm,
            [e.target.name]: value
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
            const selectedPlane = availablePlanes.find(plane => plane.id === flightForm.plane_id)
            const newFlightObj ={
                ...newFlight,
                bookings : [],
                plane: {
                    id: selectedPlane.id, 
                    name: selectedPlane.name,
                    capacity: selectedPlane.capacity,
                    condition: selectedPlane.condition
                }
            }
            onFlightAdd(newFlightObj);
            history.push("/flights")
        })
    }

    if (!isFormLoaded) return <h1>Loading..</h1>

    const planeOptions = availablePlanes.map(plane => {
        return ( <option key={plane.id} value={plane.id} > {plane.name} </option> )
    })

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
             <select name="plane_id" value={flightForm.plane_id} onChange={handleChange} > 
                {planeOptions}
             </select>
             <button>Submit</button>
             </form>
        </div>
    )
}

export default FlightNew