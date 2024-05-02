import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import "../LocationDetails/LocationDetails.css";
import CurrentLocationData from "../CurrentDate/CurrentLocationData";
import PreviousDataComponent from "../PreviousDates/PreviousDataComponent";
import FutureDataComponent from "../FutureDates/FutureDataComponent ";

function LocationDetails() {
  const { location } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [chartData, setChartData] = useState(null);
  const [showChart, setShowChart] = useState(false); // State to manage chart visibility
  const chartRef = useRef(null);

  const formatSelectedDate = (dateString) => {
    const [, /*year*/ month, day] = dateString.split("-");
    return `${day}-${month}`;
  };

  const fetchData = useCallback(async () => {
    try {
      const formattedDate = formatSelectedDate(selectedDate);
      const response = await fetch(
        `http://localhost:5000/Cities/${location}/data?date=${formattedDate}`
      );
      const data = await response.json();

      const tavgData = data.map((item) => item.tavg);
      const tminData = data.map((item) => item.tmin);
      const tmaxData = data.map((item) => item.tmax);

      setChartData({
        labels: data.map((item) => item.time),
        datasets: [
          {
            label: "tavg",
            data: tavgData,
            borderColor: "blue",
            fill: false,
          },
          {
            label: "tmin",
            data: tminData,
            borderColor: "green",
            fill: false,
          },
          {
            label: "tmax",
            data: tmaxData,
            borderColor: "red",
            fill: false,
          },
        ],
      });
      setShowChart(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedDate, location]);

  useEffect(() => {
    if (chartData) {
      if (chartRef.current) {
        // If chart instance exists, update the data
        chartRef.current.data = chartData;
        chartRef.current.update();
      } else {
        // If chart instance doesn't exist, create a new one
        const ctx = document.getElementById("weatherChart").getContext("2d");
        const newChart = new Chart(ctx, {
          type: "line",
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        chartRef.current = newChart; // Store the chart instance in the ref
      }
    }
  }, [chartData]);

  const handleSubmit = () => {
    if (selectedDate) {
      fetchData();
      setShowChart(true);
    }
  };

  const handleResetDate = () => {
    setSelectedDate("");
    setShowChart(false);

  };
  const handleCloseChart = () => {
    setShowChart(false);
  };
  return (
    <div className="cover">
      <div className="prediction">
        <h2>Approx. Weather Prediction for {location}</h2>
        <CurrentLocationData/> <br />
        <div className="previous-future">
        <PreviousDataComponent/> <br />
        <FutureDataComponent/></div>
      </div>

      <div className="location">
        <h2>Chart will be available for all previous dates</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />{" "}
        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleResetDate}>Reset Date</button>
        </div>
        {showChart && (
          <>
            <button onClick={handleCloseChart}>Close Chart</button>
            <canvas id="weatherChart"></canvas>
          </>
        )}
      </div>
    </div>
  );
}

export default LocationDetails;
