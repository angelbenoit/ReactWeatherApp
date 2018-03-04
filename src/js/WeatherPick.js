import React, {Component} from 'react';
import SideDisplay from './SideDisplay';
import '../css/WeatherPick.css';


class WeatherPick extends Component{
    constructor(props){
        super(props);
        this.state = {
            temp: [],
            city: "",
            time: [],
            date: []
        };
        this.getData = this.getData.bind(this);
        this.collectData = this.collectData.bind(this);
        this.kelvinToFahrenheit = this.kelvinToFahrenheit.bind(this);
    }


    getData = (latitude, longitude) => {
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=1e54de88d0e253a44e2f06f4b9bed550`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let city = data.city.name;
                this.collectData(data);
                this.setState({
                    city: city
                });
                let temp = data.list[0].main.temp;
                this.kelvinToFahrenheit(temp);
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
        data.list.forEach((temperature) => {
            temps.push(this.kelvinToFahrenheit(temperature.main.temp));
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