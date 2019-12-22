import React from "react";
import { App_Id } from "./lib/API_ID/app_id";
import "./Wthr.css";
export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locate: "",
      wthr: "",
      discript: "",
      temp: "",
      wind: "",
      icon: null
    };
  }

  // HTML5 내장 API 사용
  componentDidMount() {
    const option = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000
    };
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.getWthr(position.coords, position.coords); //내장 API정보를 getWthr 함수로 전달
      },
      error => {
        console.log("위치확인 불가", error);
      },
      option
    );
  }

  // 위도, 경도를 내장 API로 부터 받아서 정보 요청
  getWthr = ({ latitude, longitude }) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${App_Id}&units=metric`
    )
      .then(res => res.json()) //json문서로 변환
      .then(json => {
        //console.log(json);
        this.setState({
          locate: json.name,
          wthr: json.weather[0].main,
          descript: json.weather[0].description,
          temp: json.main.temp,
          wind: json.wind.speed,
          icon: json.weather[0].icon
        }); // json문서의 정보를 상태에 Set

        console.log(this.state);
      });
  };

  render() {
    const { locate, wthr, temp, wind, icon, descript } = this.state;
    return (
      <div>
        <div className="container">
          <section className="wthr-body">
            <div className="title">
              <h1>Current Weather</h1>
            </div>
            <div className="wthr-info">
              <div className="info-container">
                <div>위치: {locate}</div>
                <div>
                  날씨: {wthr}({descript})
                </div>
                <div>기온: {temp}</div>
                <div>풍속: {wind}</div>
              </div>
              <div className="whtr-icon">
                <img
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                  alt="wthr_img"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
