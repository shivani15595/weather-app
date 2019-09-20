import React, { Component } from "react";
import "./App.css";
import DataTracker from "./components/data-tracker/DataTracker";
import Navbar from "./components/navbar/Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      dayTemp: [],
      nightTemp: [],
      morningTemp: [],
      humidity: []
    };
    this.flag = false;
  }

  weatherDataFormatter = data => {
    const state = { ...this.state };
    for (let obj of data) {
      const time = this.timeExtractor(obj["dt_txt"]);
      const data = obj["main"];
      if (data) {
        if (time >= 6 && time < 9) state.morningTemp.push(data["temp"]);
        else if (time >= 9 && time < 21) state.dayTemp.push(data["temp"]);
        else state.nightTemp.push(data["temp"]);
        state.humidity.push(data["humidity"]);
      }
    }
    this.setState(state);
  };

  timeExtractor = date => {
    return date.split(" ")[1].split(":")[0];
  };

  handleSubmit = event => {
    event.preventDefault();
    const state = { ...this.state };
    state.city = document.getElementById("city").value;
    state.country = document.getElementById("country").value;
    this.setState(state, () => {
      this.getWeatherData();
    });
  };

  getWeatherData = () => {
    console.log(this.state);
    debugger;
    const apiId = "94b2a14e27a66b598de4cd629dbfadab";
    const url =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      this.state.city +
      "," +
      this.state.country +
      "&APPID=" +
      apiId;
    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.flag = true;
        this.weatherDataFormatter(result["list"]);
      });
  };
  render() {
    const dataForTrack = [
      { key: this.state.dayTemp, type: "Day Temperature" },
      { key: this.state.nightTemp, type: "Night Temperature" },
      { key: this.state.morningTemp, type: "Morning Temperature" },
      { key: this.state.humidity, type: "Humidity" }
    ];
    return (
      <div className="App">
        <Navbar />
        <form>
          <input id="city" placeholder="Enter city" />
          <input id="country" placeholder="Enter country" />
          <button onClick={this.handleSubmit}>Get Details</button>
        </form>
        {this.state.city &&
          this.flag &&
          dataForTrack.map(i => {
            return <DataTracker values={i.key} type={i.type} />;
          })}
      </div>
    );
  }
}

export default App;
