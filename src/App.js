import './App.css';
import { useState, useEffect } from 'react';
import FlightList from './FlightList';
import Home from './Home';
import NavBar from './NavBar';
import { Switch, Route } from 'react-router-dom';

function App() {
  const [flights, setFlights] = useState([])
  const [isLoaded, setLoaded] = useState(false)

  useEffect(()=> {
    fetch("http://localhost:9292/flights")
    .then(resp => resp.json())
    .then(data => {
      setFlights(data);
      setLoaded(true);
    })
  },[])

  function handleBookingChange(changedBooking){
    const changedBookingFlights = flights.map(f => {
      if (f.id === changedBooking.flight_id){

        const changedBookings = f.bookings.map(b => {
          if (b.id === changedBooking.id){
            return { ...b , seat: changedBooking.seat}
          }
          else return b
        })
        f.bookings = changedBookings
        return f

      }
      else return f
    })
    setFlights(changedBookingFlights)
  }


  if (!isLoaded) return <h1>Loading..</h1>
  console.log(flights)

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/flights"> 
          <FlightList flights={flights} onBookingChange={handleBookingChange} />
        </Route>
        <Route exact path='/' >
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
