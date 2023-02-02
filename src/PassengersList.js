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

    const [mostBookings, setMostBookings] = useState("Whats the Most Bookings for a passenger?")
    const [mostPassengers, setMostPassengers] = useState("Who has the Most Bookings?")
    const [bookingWithPassengers, setBookingWithPassengers] = useState(["Show booking amounts for each passenger"])

    function handleBookingMostClick(){
        fetch("http://localhost:9292/bookings/most_bookings_amt")
        .then(resp=>resp.json())
        .then(data => {
            const mostBookings = data
            setMostBookings(`The Most bookings for a passenger: ${mostBookings}`)
        })
    }
    function handleBookingPassengersMostClick(){
        fetch("http://localhost:9292/bookings/most_bookings_passengers")
        .then(resp=>resp.json())
        .then(data => {
            const mostBookingPassengers = data.toString()
            setMostPassengers(`The passengers with the most bookings: ${mostBookingPassengers}`)
        })
    }

    function handleBookingGroupedPassengersClick(){
        fetch("http://localhost:9292/bookings/passengers_grouped_with_bookings")
        .then(resp=>resp.json())
        .then(data => {
            setBookingWithPassengers(data)
        })
    }
    
    if(!isPassengersLoaded) return <h1>Loading Passengers...</h1>

    const allPassengers = passengers.map(passenger => {
        return (<p key={passenger.id} > Id # {passenger.id} / {passenger.name} <Link to={`${route}/${passenger.id}`} > Details </Link> </p>)
    })

    const allBookingsWithPassengers = bookingWithPassengers.map(pair => {
        return (<h4 key={pair}> {pair} </h4> )
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
                    <h3>{mostBookings}</h3>
                    <button onClick={handleBookingMostClick} > Click </button>
                    <h3>{mostPassengers}</h3>
                    <button onClick={handleBookingPassengersMostClick} > Click </button>
                    {allBookingsWithPassengers}
                    <button onClick={handleBookingGroupedPassengersClick} > Click </button>
                    {allPassengers}
                    
                </section>
            </Route>
            </Switch>
        </div>
    )
}

export default PassengersList