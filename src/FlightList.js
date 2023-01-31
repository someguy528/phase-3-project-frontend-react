import Flight from "./Flight"
import FlightListing from "./FlightListing"
import FlightNew from "./FlightNew"
import FlightEdit from "./FlightEdit"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import BookingDetail from "./BookingDetail"
import BookingDetailEdit from "./BookingDetailEdit"
import BookingNew from "./BookingNew"

function FlightList({flights, onFlightAdd, onFlightEdit, onFlightDelete, onBookingChange, onBookingDelete, onBookingAdd}){

    const route = useRouteMatch().url
    const allFlights = flights.map(flight => {
        return ( <FlightListing flight={flight} key={flight.id} />  )
    })

    return (
        <div>
            <h1>Flights</h1>
            <Switch> 
                <Route exact path={`${route}`} >
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