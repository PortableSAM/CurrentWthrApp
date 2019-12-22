import React from "react";
import { App_Id } from "./lib/API_ID/app_id";

export default class Weather extends React.Component {
  state = {
    locate: "",
    wthr: "",
    discript: "",
    temp: "",
    wind: "",
    icon: null
  };

  componentDidMount() {
    const option = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000
    };
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.getWthr(position.coords, position.coords);
      },
      error => {
        console.log("위치확인 불가", error);
      },
      option
    );
  }

  getWthr = ({ latitude, longitude }) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${App_Id}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        this.setState({
          locate: json.name,
          wthr: json.weather[0].main,
          descript: json.weather[0].description,
          temp: json.main.temp,
          wind: json.wind.speed,
          icon: json.weather[0].icon
        });

        console.log(this.state);
      });
  };

  render() {
    const { locate, wthr, temp, wind, icon } = this.state;
    return (
      <div>
        <div className="container">
          <section className="wthr-body">
            <div className="title">
              <h1>Current Weather</h1>
            </div>
            <ul>
              <li>
                <p>{locate}</p>
              </li>
              <li>
                <p>{wthr}</p>
              </li>
              <li>
                <p>{temp}</p>
              </li>
              <li>
                <p>{wind}</p>
              </li>
            </ul>
            <div className="whtr-icon">
              <img
                src={`http://openweathermap.org/img/w/${icon}.png`}
                alt="wthr_img"
              />
            </div>
          </section>
        </div>
      </div>
    );
  }
}
