import { useParams, useRouteMatch, Link } from "react-router-dom"


function PassengerDetail({passengers}){
    const route = useRouteMatch().url
    const {passengerId} = useParams()
    const back = route.replace(`/${passengerId}`,"")
    const passenger = passengers.find(p => p.id === parseInt(passengerId))

    const allBookings = passenger.bookings.map(b => {
        return (<li key={b.id}>Booking # {b.id} / Seat {b.seat} / Flight # {b.flight.id} / 
        Plane # {b.flight.plane_id} /
        Destination {b.flight.destination} / Departure {b.flight.departure} </li> )
    })

    return (
        <div>
            <p>{passenger.name}</p>
            <header>Bookings: </header>
            <ol>
                {allBookings}
            </ol>
            <Link to={back} > Go back </Link>
        </div>
    )
}

export default PassengerDetail