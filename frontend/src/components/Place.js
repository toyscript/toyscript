import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// import * as palette from 'google-palette';

const Place = () => {
  const allPlacesApiUrl =
    "https://dd8d3c9d-88a6-468e-971c-ac0ffa96644f.mock.pstmn.io/api/place/frequency/1113";
  const [allPlacesData, setAllPlacesData] = useState({});

  const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px",
  };

  const topPlaceState = {
    labels: [
      "CATERPILLAR ROOM",
      "PLAYGROUND",
      "ANDY'S ROOM",
      "HALLWAY",
      "OFFICE",
    ],
    datasets: [
      {
        label: "비율",
        data: [36, 22, 18, 12, 12],
        backgroundColor: [
          "rgba(0, 83, 98, 0.7)",
          "rgba(18, 121, 131, 0.7)",
          "rgba(56, 160, 166, 0.7)",
          "rgba(106, 188, 190, 0.7)",
          "rgba(146, 213, 208, 0.7)",
        ],
        borderColor: [
          "rgba(0, 83, 98, 0.7)",
          "rgba(18, 121, 131, 0.7)",
          "rgba(56, 160, 166, 0.7)",
          "rgba(106, 188, 190, 0.7)",
          "rgba(146, 213, 208, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const charatersPerPlaceState = {
    labels: [
      "CATERPILLAR ROOM",
      "PLAYGROUND",
      "ANDY'S ROOM",
      "HALLWAY",
      "OFFICE",
    ],
    datasets: [
      {
        label: "woody",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "buzz",
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "andy",
        data: [3, 10, 13, 15, 22, 30],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "lotso",
        data: [5, 7, 9, 11, 13, 15],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
    title: {
      display: true,
      text: "장소별 자주 등장하는 캐릭터",
      fontSize: 20,
    },
    legend: {
      display: true,
      position: "right",
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  useEffect(() => {
    const fetchAllPlacesData = async () => {
      const allPlacesName = [];
      const allPlacesFreq = [];
      let [red, green, blue] = [255, 105, 105];
      let greenList = [105];
      let blueList = [105];
      let rgbList = [];
      await axios.get(allPlacesApiUrl).then((response) => {
        for (let dataObj of response.data) {
          allPlacesName.push(dataObj.placeName);
          allPlacesFreq.push(dataObj.frequency);
        }
        for (let i = 0; i < response.data.length; i++) {
          if (green <= 255 && blue <= 255) {
            green += 2;
            greenList.push(green);
            blue += 2;
            blueList.push(blue);
          }
        }
        for (let i = 0; i < greenList.length; i++) {
          let rgb = `rgb(${red}, ${greenList[i]}, ${blueList[i]})`;
          rgbList.push(rgb);
        }
        // console.log(rgbList);
      });
      setAllPlacesData({
        labels: allPlacesName,
        datasets: [
          {
            label: "빈도",
            data: allPlacesFreq,
            backgroundColor: rgbList,
          },
        ],
      });
    };
    fetchAllPlacesData();
  }, []);

  return (
    <Container style={{ backgroundColor: "rgb(246, 233, 180)" }}>
      <br />
      <div style={chartBackgroundColor}>
        <div style={{ padding: "20px" }}>
          <Bar
            data={allPlacesData}
            options={{
              title: {
                display: true,
                text: "영화에 나오는 전체 장소",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
          <br />
          <hr />
          <br />
          <Doughnut
            data={topPlaceState}
            options={{
              title: {
                display: true,
                text: "가장 자주 등장하는 장소 TOP 5",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
          <br />
          <hr />
          <br />
          <Bar data={charatersPerPlaceState} options={options} />
        </div>
      </div>
      <br />
    </Container>
  );
};

export default Place;
