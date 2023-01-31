import './App.css';
import { useState, useEffect } from 'react';
import FlightList from './FlightList';
import Home from './Home';
import NavBar from './NavBar';
import PassengersList from './PassengersList';
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

  function handleFlightAdd(newFlightObj){
    const newFlights = [...flights, newFlightObj]
    setFlights(newFlights)
  }

  function handleFlightEdit(changedFlightObj){
    const changedFlights = flights.map(f => {
      if(f.id === changedFlightObj.id){
        return changedFlightObj
      }
      else return f 
    })
    setFlights(changedFlights)
  }

  function handleFlightDelete(deletedFlight){
    const updatedFlights = flights.filter(f => f.id !== deletedFlight.id)
    setFlights(updatedFlights)
  }

  function handleBookingChange(changedBooking){
    const changedBookingFlights = flights.map(f => {
      if (f.id === changedBooking.flight_id){
        f.bookings= f.bookings.map(b => {
          if (b.id === changedBooking.id){
            return { ...b , seat: changedBooking.seat}
          }
          else return b
        })
        return f
      }
      else return f
    })
    setFlights(changedBookingFlights)
  }

  function handleBookingAdd(newBookingObj){
    const newBookingFlights = flights.map(f=>{
      if (f.id === newBookingObj.flight_id){
        const bookingsSpread = f.bookings
        f.bookings = [...bookingsSpread, newBookingObj]
        return f
      }
      else return f
    })
    setFlights(newBookingFlights)
  }

  function handleBookingDelete(deletedBooking){
    const deletedBookingFlights = flights.map(f=>{
      if (f.id === deletedBooking.flight_id){
        f.bookings = f.bookings.filter(b => b.id !== deletedBooking.id);
        return f
      }
      else return f
    })
    setFlights(deletedBookingFlights)
  }


  if (!isLoaded) return <h1>Loading..</h1>
  console.log(flights)

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/passengers" >
          <PassengersList />
        </Route>
        <Route path="/flights"> 
          <FlightList flights={flights} onBookingChange={handleBookingChange} 
          onBookingDelete={handleBookingDelete} onBookingAdd={handleBookingAdd}
          onFlightAdd={handleFlightAdd} onFlightDelete={handleFlightDelete} 
          onFlightEdit={handleFlightEdit} />
        </Route>
        <Route exact path='/' >
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
