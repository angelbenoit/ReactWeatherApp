import React, {Component} from 'react';
import Skycons from 'react-skycons';
import '../css/WeatherPick.css';

class MoreDetail extends Component{
    render(){
        const data = this.props.thing;
        const tempHigh = data.tempHigh;
        const tempLow = data.tempLow;
        const humidity = data.humidity;
        const summary = data.summary;
        let icon = data.icon;
        const stle = {"height": "40%", "width": "40%", marginLeft: "30%"};
        return (
            <div id="rightSide">
                <h1>
                    {this.props.city}
                </h1>
                <h3 className="headerDetail">
                   <em>Temperature: {
                       this.props.fahrenheitOrCelsius ?
                       Math.round((tempHigh+tempLow)/2).toFixed(1) :
                       Math.round(this.props.tempConvert((tempHigh+tempLow)/2))
                    }°
                   </em>
                </h3>
                <h4 onClick={() => this.props.displayCelsius()}>
                    {this.props.fahrenheitOrCelsius ? "Convert to Celsius" : "Convert to Fahrenheit"}
                </h4>
                <div style={stle}>
                    <Skycons
                        color='white'
                        icon={icon}
                        autoplay={true}
                    />
                </div>
                <p className="headerDetail">
                    Temperature High: {
                    this.props.fahrenheitOrCelsius ? Math.round(tempHigh) : Math.round(this.props.tempConvert(tempHigh))
                }°
                </p>
                <p className="headerDetail">
                    Temperature Low: {
                    this.props.fahrenheitOrCelsius ? Math.round(tempLow) : Math.round(this.props.tempConvert(tempLow))
                }°
                </p>
                <p>
                    Humidity for today: {humidity}
                </p>
                <p>
                    {summary}
                </p>
            </div>
        )
    }
}

export default MoreDetail;