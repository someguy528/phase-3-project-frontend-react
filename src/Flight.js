import Booking from "./Booking"
import { useParams , useRouteMatch, Link , useHistory} from "react-router-dom";

function Flight({flights, onFlightDelete}){
    const {flightId} = useParams();
    const route = useRouteMatch().url;
    const history = useHistory();
    const flight = flights.find(f => f.id === parseFloat(flightId))
    

    const allBookings = flight.bookings.map(booking => {
        return (
          <section key={booking.id} > <Booking  booking={booking} /> <Link to={`${route}/bookings/${booking.id}`} >Check Booking# {booking.id}</Link> </section>  
        )
    })


    function handleDeleteClick(){
        if(flight.bookings.length > 0){return alert("The bookings for this flight should be empty before deleting!")}
        else fetch(`http://localhost:9292/flights/${flightId}`, {
            method: "DELETE"
        })
        .then(resp=>resp.json())
        .then(deletedFlight => {
            onFlightDelete(deletedFlight)
            history.push("/flights")
        })
    }

    return (
        <div>
            <h4> Flight Destination: {flight.destination} </h4>
            <h5> Plane: {flight.plane.name} ID # {flight.plane.id} </h5>
            <h5> Plane Condition: {flight.plane.condition} </h5>
            <h5> Recommended Plane Capacity: {flight.plane.capacity} </h5>
            <h5> Departure: {flight.departure} </h5>
            <h4> Flight ID : {flight.id}</h4>
            <button onClick={handleDeleteClick} >Delete Flight</button>
            <Link to={`${route}/edit`}> Edit Flight Info </Link>
            {flight.bookings.length < 20 ? 
            <div><Link to={`${route}/newBooking`} >Create A Booking</Link></div> : 
            <header>Bookings Full! </header> }
            
            
            <h2> Bookings List </h2>

               <section> {allBookings} </section> 
            
        </div>
    )
}

export default Flight