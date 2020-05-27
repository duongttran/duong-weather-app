//import React from 'react'
//import './App.css';

import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherResult: null,
    }
  }

  getCurrentWeather = async(lon, lat) => {
    let apiKey = process.env.REACT_APP_APIKEY;
    console.log("gggg",apiKey)
    //let apiKey = "078b76d1deaeccf414f17aad1e087aff"
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    console.log("url",url)
    let data = await fetch(url)
    let result = await data.json()
    console.log("what's the result", result)
    this.setState({weatherResult: result})
  }

    getLocation  = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      console.log("hehehe")
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
    })
  }

  componentDidMount() {
    console.log("open you app")
    this.getLocation();
    //console.log(this.getLocation())
  }

  render() {
    if(this.state.weatherResult == null) {
      return <div>no data</div>
    }

    return (
      <div>
        <h1>Duong's weather app</h1>
        <h2>{this.state.weatherResult.name}</h2>
        <h3>{this.state.weatherResult.main.temp}C</h3>
        <p>{this.state.weatherResult.weather[0].description}</p>
        <Button variant="primary">Primary</Button>
      </div>
    )
  }
}

