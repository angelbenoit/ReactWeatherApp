import React, {Component} from 'react';
import '../css/WeatherPick.css';

class SideDisplay extends Component{
    constructor(props){
        super(props);
        this.display = this.display.bind(this);
    }
    display = (arr) => {
        let temps = [];
        arr.forEach(item => {
            temps.push(
                    <div className="side">
                        <h1>{item.tempHigh}</h1>
                        <p>{item.time}</p>
                    </div>
            )
        });
        return temps;
    };
    render(){
        let temps = this.display(this.props.temp);
        return (
            <div>
                {temps}
            </div>
        )
    }
}

export default SideDisplay;