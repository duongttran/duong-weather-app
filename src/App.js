//import React from 'react'

import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { Button } from 'react-bootstrap';
import Loading from './Loading'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherResult: null,
      isLoading: true,
      city: "hochiminh"
    }
  }

  getCurrentWeather = async (lon, lat) => {
    let apiKey = process.env.REACT_APP_APIKEY;
    console.log("gggg", apiKey)
    //let apiKey = "078b76d1deaeccf414f17aad1e087aff"
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    console.log("url", url)
    let data = await fetch(url)
    if(data.ok) {
      let result = await data.json()
      console.log("what's the result", result)
      this.setState({ weatherResult: result })
    } else {
      alert("openweathermap geo is not available")
    }
 
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      console.log("hehehe")
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
    })
  }

  getCity = async (cityName) => {
    let apiKey = process.env.REACT_APP_APIKEY;
    console.log("gggg", apiKey)
    //let apiKey = "078b76d1deaeccf414f17aad1e087aff"
    // let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    console.log("url", url)

    // fetch(url)
    // .then(data => {
    //   console.log("data", data);
    // }).catch(error => {
    //   console.log("error", error);
    // })


    let data =  await fetch(url)


    if (data.ok) {
      let result = await data.json()
      console.log("what's the result", result)
      this.setState({ weatherResult: result })
    } else {
      // let error = new Error(`Error ${data.status} is ${data.statusText}`)
      alert(`Error ${data.status} is ${data.statusText}`)
      // throw error;
    }
    this.setState({city: cityName});
  }

  componentDidMount() {
    console.log("open you app")
    this.getLocation();
    //console.log(this.getLocation())
  }

  render() {
    const mapCity = {
      "hochiminh": "hochiminh",
      "New+York": "newyork",
      "Vancouver": "vancouver"
    }

    if (this.state.weatherResult == null) {
      return <div className="loading-container"><Loading type="balls" color="red"></Loading></div>
    }

    return (
      <div className={`text-white general-bgr ${mapCity[this.state.city]}`}>
        <h1 className="text-center">Duong's weather app</h1>
        
        <div className="navi">
          <button onClick={()=> this.getCity("New+York")}>New York city, USA</button>
          <button onClick={()=> this.getCity("Vancouver")}>Vancouver, Canada</button>
          <button onClick={()=> this.getCity("Vancouver,US")}>Vancouver, USA</button>
          <button onClick={()=> this.getCity("San+Jose,US")}>San Jose, USA</button>
          <button onClick={()=> this.getCity("San+Jose,CR")}>San Jose, Costa Rica</button>
        </div>

        <div className="board city-image">
          <h2>{this.state.weatherResult.main.temp}°C</h2>
          <h3>{this.state.weatherResult.name}</h3>
          <p>{this.state.weatherResult.weather[0].description}</p>
          <Button variant="primary" onClick={()=> this.getCity()} >Primary</Button>
        </div>

      </div>


    )
  }
}

