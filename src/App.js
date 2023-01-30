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


  if (!isLoaded) return <h1>Loading..</h1>
  console.log(flights)

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/flights"> 
          <FlightList flights={flights} />
        </Route>
        <Route exact path='/' >
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
