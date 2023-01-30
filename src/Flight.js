import Booking from "./Booking"
import { useParams , useRouteMatch, useHistory, Link} from "react-router-dom";

function Flight({flights}){

    const history = useHistory();
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
            <h5> Departure: {flight.departure} </h5>
            <h5> Flight ID : {flight.id}</h5>
                Bookings Here {allBookings}
        </div>
    )
}

export default Flight