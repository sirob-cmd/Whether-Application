import React, { useState, useEffect } from "react";
import axios from "axios";
import WhetherDisplay from "./WhetherDisplay";

import defaultBackground from "../images/changeBg/default.jpg";
import snow from "../images/changeBg/snow1.jpg";
import rain from "../images/changeBg/rain.jpg";
import cloudy from "../images/changeBg/cloudy.jpg";
import clearNight from "../images/changeBg/clearNight.jpg";

const WhetherApp = ({ position }) => {
  const [fetchData, setFetchData] = useState({}); // fetched data
  const [isFetching, setIsFetching] = useState(true); //loader

  // Fetching the data from the API
  useEffect(() => {
    const fetchIt = () => {
      if (position.lat && position.long) {
        axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5e319b2e235e8182bb2ba4f452fd2583/${position.lat},${position.long}`
          )
          .then((res) => {
            setIsFetching(false);
            setFetchData(res.data);
          })
          .catch((err) => {
            console.log(err);
            return (
              <div className="error">
                There was an error, please try again later...
              </div>
            );
          });
      }
    };

    setTimeout(() => {
      fetchIt();
    }, 300000);

    fetchIt();
  }, [position.lat, position.long]);

  // custom background image
  const renderSwitch = (param) => {
    switch (param) {
      case "rain":
        return <img className="customBackground" src={rain} alt="rain" />;
      case "clear-day":
        return (
          <img
            className="customBackground"
            src={defaultBackground}
            alt="clearDay"
          />
        );
      case "partly-cloudy-day":
        return (
          <img
            className="customBackground"
            src={defaultBackground}
            alt="rain"
          />
        );
      case "cloudy":
        return <img className="customBackground" src={cloudy} alt="cloudy" />;
      case "clear-night":
        return (
          <img
            className="customBackground"
            src={clearNight}
            alt="clear-night"
          />
        );
      case "partly-cloudy-night":
        return (
          <img
            className="customBackground"
            src={clearNight}
            alt="clear-night"
          />
        );
      case "snow":
        return <img className="customBackground" src={snow} alt="snow" />;
      case "sleet":
        return <img className="customBackground" src={snow} alt="snow" />;
      default:
        return (
          <img
            className="customBackground"
            src={defaultBackground}
            alt="clear-day"
          />
        );
    }
  };

  return (
    <div className="WhetherApp">
      {/* Display Data Component */}
      {typeof fetchData.currently !== "undefined" && (
        <WhetherDisplay data={fetchData} />
      )}

      {/* Loader */}
      {isFetching && <div className="loader"></div>}

      {/* Custom Background */}
      {typeof fetchData.currently !== "undefined" &&
        renderSwitch(fetchData.currently.icon)}
    </div>
  );
};

export default WhetherApp;
