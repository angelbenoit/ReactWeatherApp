import React, {Component} from 'react';
import '../css/WeatherPick.css';

class MoreDetail extends Component{
    render(){
        const data = this.props.thing;
        const temp = data.tempHigh;
        return (
            <div className="rightSide">
                <p>
                    {temp}
                </p>
            </div>
        )
    }
}

export default MoreDetail;