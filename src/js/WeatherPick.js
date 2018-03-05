import React, {Component} from 'react';
import SideDisplay from './SideDisplay';
import '../css/WeatherPick.css';


class WeatherPick extends Component{
    constructor(props){
        super(props);
        this.state = {
            temp: [],
            time: [],
            date: []
        };
        this.getData = this.getData.bind(this);
        this.collectData = this.collectData.bind(this);
        this.kelvinToFahrenheit = this.kelvinToFahrenheit.bind(this);
    }

    //TO CONVERT TIME INTO DATE
    // var d = new Date(timestamp*1000);
    // console.log(d);

    getData = (latitude, longitude) => {
        let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c81c141332e2654bd0fb53064d0b1402/${latitude},${longitude}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.collectData(data);
            });
    };

    /*Converts the kelvin temperature given from api to fahrenheit*/
    kelvinToFahrenheit = (kelvin) => {
      return 1.8*(kelvin - 273) + 32;
    };

    getLocation = () => {
        if( navigator.geolocation ){
            // Call getCurrentPosition with success and failure callbacks
            navigator.geolocation.getCurrentPosition(this.success, this.fail );
        }
        else{
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

    collectData = (data) => {
        let temps = [];
        data.daily.data.forEach((temperature) => {
            temps.push(temperature.temperatureHigh);
        });
        this.setState({
            temp: temps
        });
    };
    render(){
        this.getLocation();
        return (
                <div>
                    <SideDisplay
                        temp={this.state.temp}
                    />
                </div>

        )
    }
}

export default WeatherPick;