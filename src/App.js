//import React from 'react'

import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

//import { Button } from 'react-bootstrap';
import Loading from './Loading'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherResult: null,
      isLoading: true,
      city: "Ho Chi Minh City"
    }
  }

  getCurrentWeather = async (lon, lat) => {
    let apiKey = process.env.REACT_APP_APIKEY;
    console.log("gggg", apiKey)
    //let apiKey = "078b76d1deaeccf414f17aad1e087aff"
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    console.log("url", url)
    let data = await fetch(url)
    if (data.ok) {
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


    let data = await fetch(url)


    if (data.ok) {
      let result = await data.json()
      console.log("what's the result", result)
      this.setState({ weatherResult: result })
    } else {
      // let error = new Error(`Error ${data.status} is ${data.statusText}`)
      alert(`Error ${data.status} is ${data.statusText}`)
      // throw error;
    }
    this.setState({ city: cityName });
  }

  componentDidMount() {
    console.log("open you app")
    this.getLocation();
    //console.log(this.getLocation())
  }

  render() {
    const mapCity = {
      "Ho Chi Minh City": "hochiminh",
      "New+York": "newyork",
      "Vancouver": "vancouver",
      "Vancouver,US": "vancouver-us",
      "San+Jose,US": "sanjose-us",
      "San+Jose,CR": "sanjose-cr"
    }

    if (this.state.weatherResult == null) {
      return <div className="loading-container">
        <Loading type="balls" color="red"></Loading></div>
    }

    return (
      <div className="blur-bgr">
        <div className={`text-white general-bgr ${mapCity[this.state.city]}`}>


          <div className="navi">
          <a onClick={() => this.getCity("Ho Chi Minh City")}>Current Location</a>
            <a onClick={() => this.getCity("New+York")}>New York city, USA</a>
            <a onClick={() => this.getCity("Vancouver")}>Vancouver, Canada</a>
            <a onClick={() => this.getCity("Vancouver,US")}>Vancouver, USA</a>
            <a onClick={() => this.getCity("San+Jose,US")}>San Jose, USA</a>
            <a onClick={() => this.getCity("San+Jose,CR")}>San Jose, Costa Rica</a>
          </div>

          <h1 className="text-center">Duong's weather app</h1>

          <div className="board">
            <h3 className="location">{this.state.weatherResult.name}</h3>
            <p className="temperature">{this.state.weatherResult.main.temp}°C</p>

            <p className="today-description">{this.state.weatherResult.weather[0].description}</p>
            {/* <Button variant="primary" onClick={() => this.getCity()} >Primary</Button> */}
          </div>

        </div>

      </div>
    )
  }
}

