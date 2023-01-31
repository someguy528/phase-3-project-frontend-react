import { useState } from "react";
import { useParams, useRouteMatch, Link, useHistory } from "react-router-dom";


function BookingNew({ flights, onBookingAdd }) {
    const { flightId } = useParams()
    const history = useHistory();
    const route = useRouteMatch().url;
    const [newBookingForm, setNewBookingForm] = useState({
        flight_id: flightId,
        name: "",
        seat: ""
    });

    function handleFormChange(e){
        setNewBookingForm({
            ...newBookingForm,
            [e.target.name] : e.target.value
        })
    }

    function handleFormSubmit(e){
        e.preventDefault();
        // fetch(`http://localhost:9292/bookings`, {
        fetch(`http://localhost:9292/flights/${flightId}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBookingForm)
        })
        .then(resp=>resp.json())
        .then(newBooking => {
            console.log("posted!")
            console.log(newBooking)
            const newBookingobj = {...newBooking, passenger:{
                name: newBookingForm.name,
                id: newBooking.passenger_id
            }}
            onBookingAdd(newBookingobj)
            history.push(route.replace("/newBooking",`/bookings/${newBooking.id}`))
// flight_id  : 9
// id :  197
// passenger_id : 16
// seat :  "C02"
        })
    }
    console.log(newBookingForm)


    return (
        <div>
        <form onSubmit={handleFormSubmit} >
            <p>
                <label>Passenger Name</label>
                <input type="text" name="name" value={newBookingForm.name} onChange={handleFormChange} ></input>
            </p>
            <p>
                <label>Seating</label>
                <input type="text" name="seat" value={newBookingForm.seat} onChange={handleFormChange} ></input>
            </p>
            <button >Submit Booking</button>
        </form>
        <Link to={`${route.replace(`/newBooking`, "")}`}> Go Back to Flight </Link>
        </div>
    )

}

export default BookingNew