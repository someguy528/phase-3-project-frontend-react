import {Link, useRouteMatch} from 'react-router-dom'

function FlightListing({flight}){

    const route = useRouteMatch().url

    return (
            <div>
                <Link to={`${route}/${flight.id}`} > 
                Flight # {flight.id} / 
                Destination: {flight.destination} / 
                Departure: {flight.departure}
                </Link>
            </div> 
    )
}

export default FlightListing