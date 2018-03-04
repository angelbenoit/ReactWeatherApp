import React, {Component} from 'react';
import '../css/WeatherPick.css';



class WeatherPick extends Component{
    constructor(props){
        super(props);
        this.state = {
            temp: 0,
            city: ""
        };
        this.getData = this.getData.bind(this);
        this.kelvinToFahrenheit = this.kelvinToFahrenheit.bind(this);
    }


    getData = (latitude, longitude) => {
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=1e54de88d0e253a44e2f06f4b9bed550`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let city = data.city.name;
                this.setState({
                    city: city
                });
                let temp = data.list[0].main.temp;
                this.kelvinToFahrenheit(temp);
            });
    };

    kelvinToFahrenheit = (kelvin) => {
      let fahrenheit = 1.8*(kelvin - 273) + 32;
      this.setState({
          temp: fahrenheit
      })
    };

    getLocation = () => {
        if( navigator.geolocation )
        {
            // Call getCurrentPosition with success and failure callbacks
            navigator.geolocation.getCurrentPosition(this.success, this.fail );
        }
        else
        {
            alert("Sorry, your browser does not support geolocation services.");
        }
    };

    success = (position) => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        this.getData(lat, long);
    };

    fail = () => {
        alert("ERROR: CANT GET LOCATION");
    };

    
    render(){
        return (
            <div>
                <h1>{this.state.temp}</h1>
                <h1>{this.state.city}</h1>
                <button onClick={this.getLocation}>click</button>
            </div>
        )
    }
}

export default WeatherPick;