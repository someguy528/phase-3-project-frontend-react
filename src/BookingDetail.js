import { useParams } from "react-router-dom"
import { Link, useRouteMatch , useHistory} from "react-router-dom"



function BookingDetail({flights, onBookingDelete}){
    const route = useRouteMatch().url;
    const history = useHistory();
    const {flightId, bookingId} = useParams();

    const booking = flights.find(f => f.id === parseFloat(flightId)).bookings.find(b => b.id === parseFloat(bookingId))
    const {id , passenger , seat } = booking

    function handleDeleteClick(){
        fetch(`http://localhost:9292/bookings/${booking.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then((deletedBooking) => {
            console.log(deletedBooking)
            onBookingDelete(deletedBooking);
            history.push(route.replace(`/bookings/${id}`,""))
        })
        
    }

    return (
        <div>
            <h2>Booking # {id} </h2>
                <ul>
                <li>Passenger Name : {passenger.name} </li>
                <li>Passenger ID # {passenger.id} </li>
                <li>Seat: {seat}</li>
                
                <Link to={`${route}/edit`} > Change Seating </Link>
                <p> <button onClick={handleDeleteClick} > Delete Booking </button> </p>
                <Link to={`${route.replace(`/bookings/${bookingId}`, "")}`}> Go Back to Flight </Link>
                </ul>
        </div>
    )
}

export default BookingDetail