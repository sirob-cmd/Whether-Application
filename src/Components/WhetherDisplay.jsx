import React from "react";
import Clock from "./Clock";
import { motion } from "framer-motion";

// animated svg icons:
import rain from "../images/animated/rainy-6.svg";
import clearDay from "../images/animated/day.svg";
import partlyCloudyDay from "../images/animated/cloudy-day-2.svg";
import partlyCloudyNight from "../images/animated/cloudy-night-3.svg";
import cloudy from "../images/animated/cloudy.svg";
import clearNight from "../images/animated/night.svg";
import snow from "../images/animated/snowy-6.svg";
import sleet from "../images/animated/snowy-4.svg";

// framer motion
const placeAndClockVariants = {
  in: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.6,
    },
  },
  out: {
    opacity: 0,
    y: -10,
  },
};

const sevenDaysVariants = {
  in: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.1,
    },
  },
  out: {
    opacity: 0,
    y: -5,
  },
};

const sevenDaysLinksVariants = {
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: 15 },
};

const temperatureAndIconVariants = {
  in: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.8,
    },
  },
  out: {
    x: 10,
    opacity: 0,
  },
};

const sideInfoVariants = {
  in: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.1,
    },
  },
  out: {
    opacity: 0,
    y: -5,
  },
};

const sideInfoItemVariants = {
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -10 },
};

export default function WhetherInfo({ data }) {
  // rendering animated icons based on the data in the api
  const renderSwitch = (param) => {
    switch (param) {
      case "rain":
        return <img className="svg" src={rain} alt="rain" />;
      case "clear-day":
        return <img className="svg" src={clearDay} alt="clearDay" />;
      case "partly-cloudy-day":
        return <img className="svg" src={partlyCloudyDay} alt="cloudy day" />;
      case "cloudy":
        return <img className="svg" src={cloudy} alt="cloudy" />;
      case "clear-night":
        return <img className="svg" src={clearNight} alt="clear night" />;
      case "partly-cloudy-night":
        return (
          <img className="svg" src={partlyCloudyNight} alt="cloudy night" />
        );
      case "snow":
        return <img className="svg" src={snow} alt="snow" />;
      case "sleet":
        return <img className="svg" src={sleet} alt="sleet" />;
      default:
        return <img className="svg" src={clearDay} alt="clear day" />;
    }
  };

  console.log(data);

  // Week days whether
  let sevenDays = data.daily.data;
  let date = new Date();
  let dayIndex = date.getDay();

  const dayAsString = (day) => {
    let weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    weekdays[7] = "Sunday";
    weekdays[8] = "Monday";
    weekdays[9] = "Tuesday";
    weekdays[10] = "Wednesday";
    weekdays[11] = "Thursday";
    weekdays[12] = "Friday";
    weekdays[13] = "Saturday";

    return weekdays[day];
  };
  console.log(data.currently.humidity);

  return (
    <>
      <div className="top">
        <div className="sideInfo">
          <motion.div animate="in" initial="out" variants={sideInfoVariants}>
            <motion.div className="humidity" variants={sideInfoItemVariants}>
              <p>Humidity:</p>
              {data.currently.humidity >= 1 ? (
                <h3>{data.currently.humidity}%</h3>
              ) : (
                <h3>{String(data.currently.humidity).split(".")[1]}%</h3>
              )}
            </motion.div>

            <motion.div className="airPressure" variants={sideInfoItemVariants}>
              <p>Air Pressure:</p>
              <h3>{Math.round(data.currently.pressure)} PS</h3>
            </motion.div>

            <motion.div className="uvIndex" variants={sideInfoItemVariants}>
              <p>UV Index:</p>
              <h3>{data.currently.uvIndex}</h3>
            </motion.div>

            <motion.div className="visibility" variants={sideInfoItemVariants}>
              <p>Visibility:</p>
              <h3>{data.currently.visibility} mi</h3>
            </motion.div>

            <motion.div className="windSpeed" variants={sideInfoItemVariants}>
              <p>Wind Speed:</p>
              <h3>{Math.round(data.currently.windSpeed)} km/h</h3>
            </motion.div>
          </motion.div>
        </div>

        <div className="placeAndClock">
          <motion.div
            animate="in"
            initial="out"
            variants={placeAndClockVariants}
          >
            <h1 className="place">{data.timezone.split("/")[1]}</h1>
            <Clock />
          </motion.div>
        </div>

        <div className="temperatureAndIcon">
          <motion.div
            animate="in"
            initial="out"
            variants={temperatureAndIconVariants}
          >
            {renderSwitch(data.currently.icon)}
            <h1 className="temperature">
              {Math.round(((data.currently.temperature - 32) * 5) / 9)}°C
            </h1>
          </motion.div>
        </div>
      </div>

      <motion.div animate="in" initial="out" variants={sevenDaysVariants}>
        <div className="sevenDays">
          {sevenDays.slice(1).map((day, index) => {
            index = index + 1;
            return (
              <motion.div
                className="dayCard"
                key={day.time}
                variants={sevenDaysLinksVariants}
              >
                {renderSwitch(day.icon)}
                <p>
                  {Math.round(((day.temperatureMax - 32) * 5) / 9)} °C /
                  {Math.round(((day.temperatureMin - 32) * 5) / 9)} °C
                </p>
                {dayAsString(dayIndex + index)}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
