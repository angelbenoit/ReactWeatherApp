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
                    <div>
                        {item}
                    </div>
            )
        });
        return temps;
    };
    render(){
        let temps = this.display(this.props.temp);
        return (
            <div className="side">
                {temps}
            </div>
        )
    }
}

export default SideDisplay;