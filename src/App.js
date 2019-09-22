import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      temp: "",
      humidity: ""
    };
    this.flag = false;
  }

  getInitState = () => {
    return {
      city: this.state.city,
      country: this.state.country,
      temp: "",
      humidity: ""
    };
  };

  handleSubmit = event => {
    event.preventDefault();
    this.flag = false;
    const state = { ...this.state };
    state.city = document.getElementById("city").value;
    state.country = document.getElementById("country").value;
    this.setState(state, () => {
      this.getWeatherData();
    });
  };

  getWeatherData = () => {
    const apiId = "94b2a14e27a66b598de4cd629dbfadab";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      this.state.city +
      "," +
      this.state.country +
      "&APPID=" +
      apiId;
    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.flag = true;
        this.weatherDataFormatter(result);
      });
  };

  weatherDataFormatter = data => {
    const state = this.getInitState();
    state.temp = data.main.temp;
    state.humidity = data.main.humidity;
    this.setState(state);
  };

  timeExtractor = date => {
    return date.split(" ")[1].split(":")[0];
  };

  render() {
    const dataForTrack = [
      { key: this.state.temp, type: "Temperature" },
      { key: this.state.humidity, type: "Humidity" }
    ];
    return (
      <div className="App">
        <Navbar />
        <form>
          <input className="enterloc" id="city" placeholder="Enter city" />
          <input
            className="enterloc"
            id="country"
            placeholder="Enter country"
          />
          <button className="btn btn-success" onClick={this.handleSubmit}>
            Get Details
          </button>
        </form>
        {this.flag &&
          dataForTrack.map(i => {
            return (
              <div className="data">
                {i.type} : {i.key}
              </div>
            );
          })}
      </div>
    );
  }
}

export default App;
