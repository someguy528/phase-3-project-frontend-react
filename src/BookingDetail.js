import { useParams } from "react-router-dom"
import { Link, useRouteMatch } from "react-router-dom"



function BookingDetail({flights}){
    const route = useRouteMatch().url
    const {flightId, bookingId} = useParams();

    const booking = flights.find(f => f.id === parseFloat(flightId)).bookings.find(b => b.id === parseFloat(bookingId))

    return (
        <div>
            <h2>Booking # {booking.id} </h2>
                <ul>
                <li>Passenger Name : {booking.passenger.name} </li>
                <li>Passenger ID # {booking.passenger.id} </li>
                <li>Seat: {booking.seat}</li>
                
                <Link to={`${route}/edit`} > Change Seating </Link>
                </ul>
        </div>
    )
}

export default BookingDetail