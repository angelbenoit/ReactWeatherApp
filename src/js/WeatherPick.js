import React, {Component} from 'react';
import SideDisplay from './SideDisplay';
import '../css/WeatherPick.css';
import MoreDetail from "./MoreDetail";


class WeatherPick extends Component{
    constructor(props){
        super(props);
        this.state = {
            city: "",
            //pickedDate is the data that will display extra detail on the right
            pickedDate: {},
            //dataObj is the array of objects
            dataObj: [],
            //fahrenheit, if true, displays fahrenheit, if false, display celsius
            fahrenheit: true
        };
        this.getData = this.getData.bind(this);
        this.getCity = this.getCity.bind(this);
        this.collectData = this.collectData.bind(this);
        this.displayCelsius = this.displayCelsius.bind(this);
        this.displayMoreDetail = this.displayMoreDetail.bind(this);

    }

    componentDidMount() {
        this.getLocation();
    };

    getData = (latitude, longitude) => {
        //cors link allows the api to work
        let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c81c141332e2654bd0fb53064d0b1402/${latitude},${longitude}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.collectData(data);
            });
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
        this.getCity(lat, long)
    };

    fail = () => {
        alert("ERROR: CANT GET LOCATION");
    };

    collectData = (data) => {
        let dataObj = [];
        //loop through array of objects to get all the data
        //we will put this array of objects into the state
        data.daily.data.forEach((temperature) => {
            dataObj.push(
                //each object will contain time(date), summary, temphigh, templow, humidity, and icon
                {
                    time: temperature.time,
                    summary: temperature.summary,
                    tempHigh: this.state.fahrenheit ? temperature.temperatureHigh : this.fahrenheitToCelsius(temperature.temperatureHigh),
                    tempLow: this.state.fahrenheit ? temperature.temperatureLow : this.fahrenheitToCelsius(temperature.temperatureLow),
                    humidity: temperature.humidity,
                    //to get the weather icon animations, we needs all underscores, so we replace them
                    icon: temperature.icon.replace(/-/g, "_").toUpperCase()
                }
            );
        });
        //replace current array of objs into our state
        this.setState({
            dataObj
        });
    };

    //the right side of the screen showing more detail, depending on which date user clicked
    displayMoreDetail = (item) => {
        //this method will be called in SideDisplay.js and when it gets called,
        //it will then become visible and user can see
        document.getElementById("rightSide").style.visibility = "visible";
        //also, the specific data will be passed on to MoreDetail.js
        this.setState({
            pickedDate: item
        })
    };

    //google api gives us the city name because darksky api doesn't display city
    getCity = (lat, long) => {
        let language = "en";
        let url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=true&language="+language;
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({city: data.results[0].address_components[2].long_name});
            })
    };

    fahrenheitToCelsius = (temp) => {
        return (temp - 32)*(5/9);
    };

    displayCelsius = () => {
        console.log("Converted");
        this.getLocation();
        this.setState({fahrenheit: !this.state.fahrenheit});
    };

    render(){
        return (
                <div>
                    <SideDisplay
                        temp={this.state.dataObj}
                        displayMoreDetail={this.displayMoreDetail}
                    />
                    <MoreDetail
                        city={this.state.city}
                        thing={this.state.pickedDate}
                        fahrenheitOrCelsius={this.state.fahrenheit}
                        displayCelsius={this.displayCelsius}
                        tempConvert = {this.fahrenheitToCelsius}
                    />
                </div>

        )
    }
}

export default WeatherPick;