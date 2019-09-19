import React, { Component } from 'react';
import './App.css';
import DataTracker from './components/data-tracker/DataTracker';
import Navbar from './components/navbar/Navbar';

class App extends Component {
    state = {
      city : "",
      dayTemp : [],
      nightTemp : [],
      morningTemp : [],
      humidity : [],
  };

  weatherDataFormatter(data) {
    const {dayTemp, nightTemp, morningTemp, humidity} = this.state;

    for(let obj of data) {
      const time = this.timeExtractor(obj['dt_txt'])
      const data = obj['main'];
      if(data){
        if(time >= 6 && time < 9)
          morningTemp.push(data['temp']);
        else if(time >= 9 && time < 21)
          dayTemp.push(data['temp']);
        else
          nightTemp.push(data['temp']);

        humidity.push(data['humidity']);
      }
    }

    this.setState({dayTemp, nightTemp, morningTemp, humidity});
  };

  timeExtractor(date){
    return date.split(" ")[1].split(":")[0];
  }

  componentDidMount() {
    const city = 'London,uk';
    const url = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&APPID=94b2a14e27a66b598de4cd629dbfadab";
    fetch(url)
    .then(res => res.json())
    .then((result) => {
        this.weatherDataFormatter(result['list']);
        console.log(this.state);
    });
  }
  render() {
    return (
      <div className="App">
        <Navbar/>
        <DataTracker values={this.state.dayTemp} type="Day Temperature"/>
        <DataTracker values={this.state.nightTemp} type="Night Temperature"/>
        <DataTracker values={this.state.morningTemp} type="Morning Temperature"/>
        <DataTracker values={this.state.humidity} type="Humidity"/>
      </div>
    );
  }
}

export default App;
