import Booking from "./Booking"
import { useParams , useRouteMatch, Link} from "react-router-dom";

function Flight({flights}){
    const {flightId} = useParams();
    const route = useRouteMatch().url;
    const flight = flights.find(f => f.id === parseFloat(flightId))

    const allBookings = flight.bookings.map(booking => {
        return (
          <section key={booking.id} > <Booking  booking={booking} /> <Link to={`${route}/bookings/${booking.id}`} >Check Booking# {booking.id}</Link> </section>  
        )
    })

    return (
        <div>
            <h4> Flight Destination: {flight.destination} </h4>
            <h5> Plane: {flight.plane.name} ID # {flight.plane.id} </h5>
            <h5> Plane Condition: {flight.plane.condition} </h5>
            <h5> Recommended Plane Capacity: {flight.plane.capacity} </h5>
            <h5> Departure: {flight.departure} </h5>
            <h4> Flight ID : {flight.id}</h4>
            <Link to={`${route}/newBooking`} >Create A Booking</Link>
            <h2> Bookings List </h2>
               <section> {allBookings} </section> 
            
        </div>
    )
}

export default Flight