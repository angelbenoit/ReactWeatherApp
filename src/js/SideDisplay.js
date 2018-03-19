import React, {Component} from 'react';
import '../css/WeatherPick.css';

class SideDisplay extends Component{
    constructor(props){
        super(props);
        this.display = this.display.bind(this);
    }

    //this method will return array of divs containing
    display = (arr) => {
        let temps = [];
        let day = new Date();
        arr.forEach((item,i) => {
            //this gets the dates for the week depending on index
            let nextDay = new Date(day);
            nextDay.setDate(day.getDate() + i);
            temps.push(
                    //if user clicks on this div, it will show more detail about it on the right side
                    <div className="side" onClick={() => this.props.displayMoreDetail(item)}>
                        <h1>Avg Temp: {this.getAverageTemp(item.tempHigh, item.tempLow)}F°</h1>
                        <p>{nextDay.toString().substring(0,16)}</p>
                    </div>
            )
        });
        return temps;
    };

    getAverageTemp = (temp1, temp2) => {
        return Math.round((temp1 + temp2)/2).toFixed(1);
    };
    render(){
        //call display() to display the divs
        let temps = this.display(this.props.temp);
        return (
            <div className="left">
                {temps}
            </div>
        )
    }
}

export default SideDisplay;