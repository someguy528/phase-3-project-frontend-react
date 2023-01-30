import Flight from "./Flight"
import FlightListing from "./FlightListing"
import { Switch, Route, Link, useRouteMatch } from "react-router-dom"
import BookingDetail from "./BookingDetail"
import BookingDetailEdit from "./BookingDetailEdit"

function FlightList({flights}){


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
                <Route exact path={`${route}/:flightId/bookings/:bookingId/edit`} >
                    <BookingDetailEdit flights={flights} />
                </Route>
                <Route exact path={`${route}/:flightId/bookings/:bookingId`} >
                    <BookingDetail flights={flights} />
                </Route>
                <Route exact path={`${route}/:flightId`} >
                    <Flight flights={flights} />
                </Route>
            </Switch>
            
        </div>
        
    )
}

export default FlightList