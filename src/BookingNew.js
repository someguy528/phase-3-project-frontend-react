import { useState } from "react";
import { useParams } from "react-router-dom";


function BookingNew({flights}){
    const {flightId} = useParams()
    const [newBookingForm, setNewBookingForm] = useState();

}

export default BookingNew