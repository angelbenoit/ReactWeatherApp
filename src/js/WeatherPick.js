import React, {Component} from 'react';
import '../css/WeatherPick.css';



class WeatherPick extends Component{
    constructor(props){
        super(props);
        this.state = {
            temp: 0
        };
        this.getData = this.getData.bind(this);
    }


    getData = () => {
        let url = "https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=1e54de88d0e253a44e2f06f4b9bed550";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let d = data.list[0].main.temp;
                this.setState({
                    temp: d
                })
            });
    };
    render(){
        this.getData();
        return (
            <div>
                <h1>{this.state.temp}</h1>
                <button onClick={this.getData}>click</button>
            </div>
        )
    }
}

export default WeatherPick;