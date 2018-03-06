import React, {Component} from 'react';
import SideDisplay from './SideDisplay';
import '../css/WeatherPick.css';
import MoreDetail from "./MoreDetail";


class WeatherPick extends Component{
    constructor(props){
        super(props);
        this.state = {
            pickedDate: {},
            dataObj: []
        };
        this.getData = this.getData.bind(this);
        this.collectData = this.collectData.bind(this);
        this.displayMoreDetail = this.displayMoreDetail.bind(this);

    }

    //TO CONVERT TIME INTO DATE
    // var d = new Date(timestamp*1000);
    // console.log(d);

    componentDidMount() {
        this.getLocation();
    };

    getData = (latitude, longitude) => {
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
    };

    fail = () => {
        alert("ERROR: CANT GET LOCATION");
    };

    collectData = (data) => {
        let dataObj = [];
        data.daily.data.forEach((temperature) => {
            dataObj.push(
                {
                    time: temperature.time,
                    summary: temperature.summary,
                    tempHigh: temperature.temperatureHigh,
                    tempLow: temperature.temperatureLow,
                    humidity: temperature.humidity
                }
            );
        });
        this.setState({
            dataObj
        });
    };

    displayMoreDetail = (item) => {
        this.setState({
            pickedDate: item
        })
    };

    render(){
        return (
                <div>
                    <SideDisplay
                        temp={this.state.dataObj}
                        displayMoreDetail={this.displayMoreDetail}
                    />
                    <MoreDetail
                        thing={this.state.pickedDate}
                    />
                </div>

        )
    }
}

export default WeatherPick;