function Booking({booking}){

    return (
        <div>
            <ul>
                <li>Booking # {booking.id}</li>
                <li>Passenger Name : {booking.passenger.name} </li>
                <li>Passenger ID # {booking.passenger.id} </li>
                <li>Seat: {booking.seat}</li>
            </ul>
        </div>        
    )
}

export default Booking