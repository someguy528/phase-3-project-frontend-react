import { useParams, useHistory , useRouteMatch } from "react-router-dom"
import { useState} from "react";

function BookingDetailEdit({flights, onBookingChange}){
    const {flightId, bookingId} = useParams(); 
    const parentFlight = flights.find(f => f.id === parseFloat(flightId))
    const booking = parentFlight.bookings.find(b => b.id === parseFloat(bookingId));
    const [bookingForm, setBookingForm] = useState(booking.seat);
    const history = useHistory();
    const route = useRouteMatch().url;
    console.log(bookingForm)

    function onFormChange(e){
        setBookingForm(()=> e.target.value)
    }
    function onSubmitForm(e){
        e.preventDefault();
        if(bookingForm === "" ){
            return alert("A seat needs to be picked!")
        }
        fetch(`http://localhost:9292/flights/${flightId}/bookings/${bookingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({...booking, seat: bookingForm})
        })
        .then(resp => resp.json())
        .then(changedBooking => {
            onBookingChange(changedBooking);
            history.push(route.replace("/edit",""))
        })
    }
    console.log(parentFlight.bookings)

    const optionsArray = Array.from({length: 10}, (_, i) => i < 9 ? "A" + "0" + (i+1) : "A" + (i+1))
    const optionsArray2 = Array.from({length: 10}, (_, i) => i < 9 ? "B" + "0" + (i+1) : "B" + (i+1))
    const seatsArray = optionsArray.concat(optionsArray2)

    const seatOptions = seatsArray.map(seat => {
        if(!parentFlight.bookings.some(booking => booking.seat === seat))
        return ( <option key={seat} value={seat} > {seat} </option> )
    })

    return (
        <form onSubmit={onSubmitForm} >
            <label> Editing Seating for Booking # {booking.id} </label>
            {/* <input type="text" value={bookingForm} onChange={onFormChange} /> */}
            <select value={bookingForm} onChange={onFormChange}>
                <option value="" > Pick a Seat </option>
                {seatOptions}
            </select>
            <button>Submit</button>
            
        </form>
    )

}

export default BookingDetailEdit