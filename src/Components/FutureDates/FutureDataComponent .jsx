import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../PreviousDates/Previous.css";

const calculateAverage = (data) => {
  const averages = [];

  data.forEach((item) => {
    let tavgSum = 0;
    let tminSum = 0;
    let tmaxSum = 0;
    let totalCount = 0;

    item.data.forEach((dataItem) => {
      if (!isNaN(parseFloat(dataItem.tavg))) {
        tavgSum += parseFloat(dataItem.tavg);
        totalCount++;
      }
      if (!isNaN(parseFloat(dataItem.tmin))) {
        tminSum += parseFloat(dataItem.tmin);
      }
      if (!isNaN(parseFloat(dataItem.tmax))) {
        tmaxSum += parseFloat(dataItem.tmax);
      }
    });

    const avgTavg = totalCount > 0 ? tavgSum / totalCount : 0;
    const avgTmin = totalCount > 0 ? tminSum / totalCount : 0;
    const avgTmax = totalCount > 0 ? tmaxSum / totalCount : 0;

    averages.push({
      date: item.date,
      tavg: avgTavg,
      tmin: avgTmin,
      tmax: avgTmax,
    });
  });

  return averages;
};

const FutureDataComponent = () => {
  const { location } = useParams(); // Use filename instead of location
  const [currentDate, setCurrentDate] = useState("");
  const [futureData, setFutureData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showData, setShowData] = useState(false); // State to control visibility of fetched data

  useEffect(() => {
    setCurrentDate(getFormattedDate(new Date()));
  }, []);

  const getFormattedDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch(
        `https://weather-backend-1.onrender.com/Cities/${location}/future?date=${currentDate}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const averagedData = calculateAverage(data);
      setFutureData(averagedData);
      setShowData(true); // Show fetched data after successful fetch
    } catch (error) {
      console.error("Error fetching future data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowData(false); // Close fetched data
  };

  return (
    <div className="container">
  <h2>Click on the below button to get data of future dates</h2> <br />
  <button className="button" onClick={fetchData} disabled={loading}>
    {loading ? "Loading..." : "Get Future Data"}
  </button>
  <button className="button" onClick={handleClose}>
    Close
  </button>
  {error && <p className="error">{error}</p>}
  {showData && (
    <div>
      {futureData.map((item, index) => (
        <div className="item" key={index}>
          <h3>Date: {item.date}</h3>
          <ul>
            <li>avg: {item.tavg.toFixed(2)}°C</li>
            <li>min: {item.tmin.toFixed(2)}°C</li>
            <li>max: {item.tmax.toFixed(2)}°C</li>
          </ul>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default FutureDataComponent;
