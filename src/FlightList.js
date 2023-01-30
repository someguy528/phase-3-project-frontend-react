import Flight from "./Flight"
import FlightListing from "./FlightListing"
import { Switch, Route, Link, useRouteMatch } from "react-router-dom"
import BookingDetail from "./BookingDetail"
import BookingDetailEdit from "./BookingDetailEdit"
import { useState } from "react"

function FlightList({flights, onBookingChange, onBookingDelete}){
    const [mostBookings, setMostBookings] = useState("Whats the Most Bookings for a passenger?")
    const [mostPassengers, setMostPassengers] = useState("Who has the Most Bookings?")


    const route = useRouteMatch().url
    const allFlights = flights.map(flight => {
        return ( <FlightListing flight={flight} key={flight.id} />  )
    })

    function handleBookingMostClick(){
        fetch("http://localhost:9292/bookings/most")
        .then(resp=>resp.json())
        .then(data => {
            const mostBookings = data[0][1]
            setMostBookings(`The Most bookings for a passenger: ${mostBookings}`)
        })
    }
    function handleBookingPassengersMostClick(){
        fetch("http://localhost:9292/bookings/most_bookings_passengers")
        .then(resp=>resp.json())
        .then(data => {
            console.log(data)
            const mostBookingPassengers = data.map(data=> data.name).toString()
            setMostPassengers(`The passengers with the most bookings: ${mostBookingPassengers}`)
        })
    }

    return (
        <div>
            <h1>Flights</h1>
            <Switch> 
                <Route exact path={`${route}`} >
                    <h3>{mostBookings}</h3>
                    <button onClick={handleBookingMostClick} > Click </button>
                    <h3>{mostPassengers}</h3>
                    <button onClick={handleBookingPassengersMostClick} > Click </button>
                    {allFlights}
                </Route>
                <Route exact path={`${route}/:flightId/bookings/:bookingId/edit`} >
                    <BookingDetailEdit flights={flights} onBookingChange={onBookingChange} />
                </Route>
                <Route exact path={`${route}/:flightId/bookings/:bookingId`} >
                    <BookingDetail flights={flights} onBookingDelete={onBookingDelete} />
                </Route>
                <Route exact path={`${route}/:flightId`} >
                    <Flight flights={flights} />
                </Route>
            </Switch>
            
        </div>
        
    )
}

export default FlightList