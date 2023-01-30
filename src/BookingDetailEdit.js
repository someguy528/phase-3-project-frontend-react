import { useParams, useHistory , useRouteMatch } from "react-router-dom"
import { useState, useEffect } from "react";

function BookingDetailEdit({flights, onBookingChange}){
    const {flightId, bookingId} = useParams(); 
    const booking = flights.find(f => f.id === parseFloat(flightId)).bookings.find(b => b.id === parseFloat(bookingId));
    const [bookingForm, setBookingForm] = useState(booking.seat);
    const history = useHistory();
    const route = useRouteMatch().url;
    console.log(booking)
    
    

    function onFormChange(e){
        setBookingForm(()=> e.target.value)
    }
    function onSubmitForm(e){
        e.preventDefault();
        const newBooking = {...booking, seat: bookingForm, passenger : booking.passenger}
        fetch(`http://localhost:9292/bookings/${bookingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({...booking, seat: bookingForm})
        })
        .then(resp => resp.json())
        .then(changedBooking => {
            onBookingChange(changedBooking);

            console.log(changedBooking);
            console.log("Patched!");
            // setTimeout( ()=> history.push(route.replace("/edit","")) ,2000)
            setTimeout( ()=> history.push("/") ,2000)
            
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