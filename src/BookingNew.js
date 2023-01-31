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
    const parentFlight = flights.find(f => f.id === parseFloat(flightId))

    function handleFormChange(e){
        setNewBookingForm({
            ...newBookingForm,
            [e.target.name] : e.target.value
        })
    }

    function handleFormSubmit(e){
        e.preventDefault();
        if(parentFlight.bookings.length >= 20){
            alert("The Bookings for this Flight is Full!")
            return history.push(route.replace("/newBooking",``))
        }
        if(parentFlight.bookings.some(booking => booking.passenger.name === newBookingForm.name )){
            alert("This Passenger already has a booking on this flight!")
            return history.push(route.replace("/newBooking",``))
        }
        if(newBookingForm.seat === "" ){
            return alert("A seat needs to be picked!")
        }
        if(newBookingForm.name === "" ){
            return alert("A passenger must be booked!")
        }
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
        })
    }
    console.log(newBookingForm)


    const optionsArray = Array.from({length: 10}, (_, i) => i < 9 ? "A0" + (i+1) : "A" + (i+1))
    const optionsArray2 = Array.from({length: 10}, (_, i) => i < 9 ? "B0" + (i+1) : "B" + (i+1))
    const seatsArray = optionsArray.concat(optionsArray2)

   
    const seatOptions = seatsArray.filter(seat => !parentFlight.bookings.some(booking => booking.seat === seat)).map(seat => {
        return ( <option key={seat} value={seat} > {seat} </option>) 
        })

    return (
        <div>
            <h2> Create A Booking</h2>
        <form onSubmit={handleFormSubmit} >
            <p>
                <label>Passenger Name</label>
                <input type="text" name="name" value={newBookingForm.name} onChange={handleFormChange} ></input>
            </p>
            <p>
                <label>Seating</label>
                <select name="seat" onChange={handleFormChange} value={newBookingForm.seat} >
                    <option value="" > Pick a Seat </option>
                    {seatOptions}
                </select>
            </p>
            <button >Submit Booking</button>
        </form>
        <Link to={`${route.replace(`/newBooking`, "")}`}> Go Back to Flight </Link>
        </div>
    )

}

export default BookingNew