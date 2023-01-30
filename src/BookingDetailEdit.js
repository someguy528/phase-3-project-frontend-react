import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

function BookingDetailEdit({flights}){
    const [bookingForm, setBookingForm] = useState("");
    const {flightId, bookingId} = useParams(); 
    const booking = flights.find(f => f.id === parseFloat(flightId)).bookings.find(b => b.id === parseFloat(bookingId))

    function onFormChange(e){
        setBookingForm(()=> e.target.value)
    }
    function onSubmitForm(e){
        e.preventDefault();
        fetch(`http://localhost:9292/bookings/${bookingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(bookingForm)
        })
        .then(resp => resp.json())
        .then(patchedBooking => {
            console.log("Patched!")
        })

    }

    return (
        <form onSubmit={onSubmitForm} >
            <label> Editing Seating for Booking # {booking.id} </label>
            <input type="text" value={bookingForm} onChange={onFormChange} />
            <button>Submit</button>
        </form>
    )

}

export default BookingDetailEdit