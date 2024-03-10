import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CurrentDate/CurrentLocationData.css";

function CurrentLocationData() {
  const { location } = useParams();
  const [currentDayAverages, setCurrentDayAverages] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const currentDate = new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .split("/")
          .join("-");
        const responseCurrent = await fetch(
          `https://weather-backend-1.onrender.com/Cities/${location}/current?date=${currentDate}`
        );
        const dataCurrent = await responseCurrent.json();
        setCurrentDayAverages(calculateAverage(dataCurrent));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const updateCurrentDate = () => {
      const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setCurrentDate(currentDate);
    };

    fetchAverages();
    updateCurrentDate();
  }, [location]); // Re-fetch data when the location changes

  const calculateAverage = (data) => {
    let tavgSum = 0;
    let tminSum = 0;
    let tmaxSum = 0;
    let totalCount = 0;

    data.forEach((item) => {
      if (!isNaN(parseFloat(item.tavg))) {
        tavgSum += parseFloat(item.tavg);
        totalCount++;
      }
      if (!isNaN(parseFloat(item.tmin))) {
        tminSum += parseFloat(item.tmin);
      }
      if (!isNaN(parseFloat(item.tmax))) {
        tmaxSum += parseFloat(item.tmax);
      }
    });

    const avgTavg = totalCount > 0 ? tavgSum / totalCount : 0;
    const avgTmin = totalCount > 0 ? tminSum / totalCount : 0;
    const avgTmax = totalCount > 0 ? tmaxSum / totalCount : 0;

    return {
      tavg: avgTavg,
      tmin: avgTmin,
      tmax: avgTmax,
    };
  };

  return (
    <div className="location-data">
      <h2>{currentDate ? currentDate : "Loading..."}</h2>
      <div className="data">
        <h3>Today's Approx. Temperature</h3>
        <p>
          avg:{" "}
          {currentDayAverages
            ? currentDayAverages.tavg.toFixed(2)
            : "Loading..."}
        </p></div>
        <div className="min-max">
          <p>
            min:{" "}
            {currentDayAverages
              ? currentDayAverages.tmin.toFixed(2)
              : "Loading..."}
          </p>
          <p>
            max:{" "}
            {currentDayAverages
              ? currentDayAverages.tmax.toFixed(2)
              : "Loading..."}
          </p>
        </div>
      
    </div>
  );
}

export default CurrentLocationData;
