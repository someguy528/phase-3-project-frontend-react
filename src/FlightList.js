import Flight from "./Flight"
import FlightListing from "./FlightListing"
import FlightNew from "./FlightNew"
import FlightEdit from "./FlightEdit"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import BookingDetail from "./BookingDetail"
import BookingDetailEdit from "./BookingDetailEdit"
import BookingNew from "./BookingNew"
import { useState } from "react"

function FlightList({flights, onFlightAdd, onFlightEdit, onFlightDelete, onBookingChange, onBookingDelete, onBookingAdd}){
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
                <Route exact path={`${route}/new`} >
                    <FlightNew onFlightAdd={onFlightAdd} />
                </Route>
                <Route exact path={`${route}/:flightId/edit`} >
                    <FlightEdit flights={flights} onFlightEdit={onFlightEdit} />
                </Route>
                <Route exact path={`${route}/:flightId/bookings/:bookingId/edit`} >
                    <BookingDetailEdit flights={flights} onBookingChange={onBookingChange} />
                </Route>
                <Route exact path={`${route}/:flightId/bookings/:bookingId`} >
                    <BookingDetail flights={flights} onBookingDelete={onBookingDelete} />
                </Route>
                <Route exact path={`${route}/:flightId/newBooking`} >
                    <BookingNew flights={flights} onBookingAdd={onBookingAdd} />
                </Route>
                <Route exact path={`${route}/:flightId`} >
                    <Flight flights={flights} onFlightDelete={onFlightDelete} />
                </Route>
            </Switch>
            
        </div>
        
    )
}

export default FlightList