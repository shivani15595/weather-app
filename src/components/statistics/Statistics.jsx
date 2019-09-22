import React, { Component } from "react";
import "./Statistics.css";
import DataTracker from "../data-tracker/DataTracker";
import Navbar from "../navbar/Navbar";

class Statistics extends Component {
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

  getInitState = () => {
    return {
      city: this.state.city,
      country: this.state.country,
      dayTemp: [],
      nightTemp: [],
      morningTemp: [],
      humidity: []
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

  weatherDataFormatter = data => {
    const state = this.getInitState();
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
        <div className="forecast">
          {this.state.city &&
            this.flag &&
            dataForTrack.map(i => {
              return <DataTracker key={i.key} values={i.key} type={i.type} />;
            })}
        </div>
      </div>
    );
  }
}

export default Statistics;
