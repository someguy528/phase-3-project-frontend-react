import {useState , useEffect} from "react"
import { Route, Switch, Link, useRouteMatch } from "react-router-dom"
import PassengerDetail from "./PassengerDetail"

function PassengersList(){

    const [passengers, setPassengers] = useState([])
    const [isPassengersLoaded, setIsPassengersLoaded] = useState(false)
    useEffect(()=> {
        fetch(`http://localhost:9292/passengers/with_bookings_and_flights`)
        .then(resp=>resp.json())
        .then(data => {
            setPassengers(data)
            setIsPassengersLoaded(true)
        })
    },[])
    const route = useRouteMatch().url
    
    if(!isPassengersLoaded) return <h1>Loading Passengers...</h1>

    const allPassengers = passengers.map(passenger => {
        return (<p key={passenger.id} > Id # {passenger.id} / {passenger.name} <Link to={`${route}/${passenger.id}`} > Details </Link> </p>)
    })

    return (
        <div> 
            <Switch>
            <Route path={`${route}/:passengerId`} >
                <PassengerDetail passengers={passengers} />
            </Route>
            <Route path={`${route}`}>
                <section>
                    <h2> Passengers List </h2>
                    {allPassengers}
                </section>
            </Route>
            </Switch>
        </div>
    )
}

export default PassengersList