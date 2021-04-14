import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// import * as palette from 'google-palette';

const Place = () => {
  const allPlacesApiUrl =
    "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/places/frequencys";
  const scenesPerPlaceApiUrl =
    "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/places/scenes";
  const charactersPerPlaceApiUrl =
    "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/places/characters";
  const [allPlacesData, setAllPlacesData] = useState({});
  const [topPlacesData, setTopPlacesData] = useState({});
  const [allScenesPerPlaceData, setAllScenesPerPlacesData] = useState([]);
  const [allCharactersData, setAllCharactersData] = useState([]);
  const [topCharactersData, setTopCharactersData] = useState([]);

  const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px",
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
        // console.log(response);
        for (let dataObj of response.data) {
          allPlacesName.push(dataObj.place);
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
      });
      // console.log(allPlacesName);
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
      const topPlacesName = allPlacesName.slice(0, 5);
      const topPlacesFreq = allPlacesFreq.slice(0, 5);
      // console.log(topPlacesName, topPlacesFreq);
      setTopPlacesData({
        labels: topPlacesName,
        datasets: [
          {
            label: "빈도",
            data: topPlacesFreq,
            backgroundColor: [
              "rgba(45, 135, 187, 0.6)",
              "rgba(100, 194, 166, 0.6)",
              "rgba(170, 222, 167, 0.6)",
              "rgba(230, 246, 157, 0.6)",
              "rgba(255, 255, 157, 0.6)",
            ],
          },
        ],
      });
    };
    fetchAllPlacesData();
  }, []);

  useEffect(() => {
    const fetchAllScenesData = async () => {
      const result = [];
      await axios.get(scenesPerPlaceApiUrl).then((response) => {
        for (let dataObj of response.data) {
          result.push(dataObj);
        }
      });
      const topResult = result.slice(0, 5);
      setAllScenesPerPlacesData(topResult);
    };
    fetchAllScenesData();
  }, [allCharactersData, topCharactersData]);

  useEffect(() => {
    const fetchAllCharactersData = async () => {
      const result = [];
      await axios.get(charactersPerPlaceApiUrl).then((response) => {
        setAllCharactersData(response.data);
        for (let dataObj of response.data) {
          result.push(dataObj);
        }
      });
      const topCharacters = result.slice(0, 5);
      setTopCharactersData(topCharacters);
    };
    fetchAllCharactersData();
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
                position: "top",
              },
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
          <br />
          <hr />
          <br />
          <Doughnut
            data={topPlacesData}
            options={{
              title: {
                display: true,
                text: "가장 자주 등장하는 장소 TOP 5",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "top",
              },
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
          <br />
          {allScenesPerPlaceData.map((scenes, index) => {
            // console.log(scenes);
            // console.log(scenes.scenes)
            let scenesList = [];
            for (let i = 0; i < scenes.scenes.length; i++) {
              let scene = `${scenes.scenes[i]}, `;
              if (i === scenes.scenes.length - 1) {
                let scene = `${scenes.scenes[i]}`;
                scenesList.push(scene);
                break;
              }
              scenesList.push(scene);
            }
            // console.log(scenesList)
            return (
              <>
                <li key={index} style={{ listStyle: "none" }}>
                  장소 <b>{scenes.place}</b>에 포함되는 씬은{" "}
                  <b>[{scenesList}]</b> 입니다.
                </li>
              </>
            );
          })}
          <br />
          <hr />
          <br />
          {topCharactersData.map((data) => {
            let label = [data.place];
            let labels = [];
            let frequency = [];
            let redList = [];
            let greenList = [];
            let blueList = [];
            let rgbList = [];
            for (let i = 0; i < data.characters.length; i++) {
              labels.push(data.characters[i].characterName);
              frequency.push(data.characters[i].frequency);
              const rand_red = Math.floor(Math.random() * 256);
              const rand_green = Math.floor(Math.random() * 256);
              const rand_blue = Math.floor(Math.random() * 256);
              redList.push(rand_red);
              greenList.push(rand_green);
              blueList.push(rand_blue);
            }
            for (let i = 0; i < greenList.length; i++) {
              let rgb = `rgba(${redList[i]}, ${greenList[i]}, ${blueList[i]}, 0.4)`;
              rgbList.push(rgb);
            }

            return (
              <>
                <Bar
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        label: label,
                        data: frequency,
                        backgroundColor: rgbList,
                      },
                    ],
                  }}
                  options={{
                    title: {
                      display: true,
                      text: label,
                      fontSize: 20,
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                    legend: {
                      display: false,
                    },
                  }}
                />
                <br />
                <br />
              </>
            );
          })}
          {/* {allScenesPerPlaceData.map((data) => {
            // console.log(data);
            // {place: "CATERPILLAR ROOM", scenes: Array(18)}place: "CATERPILLAR ROOM"scenes: (18) [27, 31, 43, 45, 47, 49, 59, 63, 65, 67, 74, 75, 76, 78, 88, 93, 95, 103]__proto__: Object
            // {place: "PLAYGROUND", scenes: Array(11)}
            // {place: "ANDY’S ROOM", scenes: Array(9)}
            // {place: "HALLWAY", scenes: Array(6)}
            // {place: "OFFICE", scenes: Array(6)}
            return <li>ok?</li>;
          })}
          {topCharactersData.map((data) => {
            return <li>ok!</li>;
          })} */}
          <br />
          <hr />
          <br />
        </div>
      </div>
      <br />
    </Container>
  );
};

export default Place;
