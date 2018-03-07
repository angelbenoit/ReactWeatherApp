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
                <h3 className="headerDetail">
                   <em>Temperature: {Math.round((tempHigh+tempLow)/2)}</em>
                </h3>
                <div style={stle}>
                    <Skycons
                        color='white'
                        icon={icon}
                        autoplay={true}
                    />
                </div>
                <p className="headerDetail">
                    Temperature High: {tempHigh}
                </p>
                <p className="headerDetail">
                    Temperature Low: {tempLow}
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