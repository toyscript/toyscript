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
  const [allPlacesData, setAllPlacesData] = useState({});
  const [topPlacesData, setTopPlacesData] = useState({});
  const [allScenesPerPlaceData, setAllScenesPerPlacesData] = useState([]);

  const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px",
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
        label: "WOODY",
        data: [1, 1, 1, 1, 1]
      },
      {
        label: "BUZZ",
        data: [1, 1, 1, 1, 1]
      },
      {
        label: "JESSIE",
        data: [1, 1, 1, 1, 1]
      },
      {
        label: "LOTSO",
        data: [1, 0, 0, 1, 1]
      },
      {
        label: "KEN",
        data: [1, 0, 0, 1, 1]
      },
      {
        label: "MR. POTATO HEAD",
        data: [1, 1, 1, 1, 1]
      },
      {
        label: "REX",
        data: [1, 1, 1, 1, 1]
      },
      {
        label: "HAMM",
        data: [1, 1, 1, 1, 1]
      },
      {
        label: "MRS. POTATO HEAD",
        data: [1, 1, 1, 1, 0]
      },
      {
        label: "BARBIE",
        data: [1, 0, 0, 1, 1]
      },
      {
        label: "SLINKY",
        data: [1, 0, 0, 1, 1]
      },
      {
        label: "LIFER",
        data: [1, 0, 0, 0, 1]
      },
      {
        label: "SPANISH BUZZ",
        data: [1, 0, 0, 0, 1]
      },
      {
        label: "BONNIE'S MOM",
        data: [1, 0, 0, 0, 0]
      },
      {
        label: "STRETCH",
        data: [1, 0, 0, 0, 0]
      },
      {
        label: "KEN & BARBIE",
        data: [1, 0, 0, 0, 0]
      },
      {
        label: "TEACHER",
        data: [1, 0, 0, 0, 0]
      },
      {
        label: "ANDY",
        data: [0, 1, 1, 0, 0]
      },
      {
        label: "MOM",
        data: [0, 1, 1, 0, 0]
      },
      {
        label: "ALIENS",
        data: [0, 1, 0, 1, 0]
      },
      {
        label: "SARGE",
        data: [0, 1, 0, 0, 0]
      },
      {
        label: "THE TOY CHEST",
        data: [0, 1, 0, 0, 0]
      },
      {
        label: "SOLDIER ONE",
        data: [0, 1, 0, 0, 0]
      },
      {
        label: "SOLDIER TWO",
        data: [0, 1, 0, 0, 0]
      },
      {
        label: "MOLLY",
        data: [0, 0, 1, 0, 0]
      },
      {
        label: "YOUNG ANDY",
        data: [0, 0, 1, 0, 0]
      },
      {
        label: "TOYS",
        data: [0, 0, 1, 0, 1]
      },
      {
        label: "THE TOYS",
        data: [0, 0, 1, 0, 0]
      },
      {
        label: "ANDY'S ROOM",
        data: [0, 0, 1, 0, 0]
      },
      {
        label: "BUTTERFLY ROOM TEACHER",
        data: [0, 0, 0, 1, 0]
      },
      {
        label: "BIG BABY",
        data: [0, 0, 0, 0, 1]
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
        // console.log(response)
        for (let dataObj of response.data) {
          result.push(dataObj);
        }
      // console.log(result)
      })
      const topResult = result.slice(0, 5);
      setAllScenesPerPlacesData(topResult);
      // console.log(allScenesPerPlaceData)
    }
    fetchAllScenesData();
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
              scenesList.push(scene);
              if (i === scenes.scenes.length - 1) {
                let scene = `${scenes.scenes[i]}`;
              scenesList.push(scene);
              }
            }
            // console.log(scenesList)
            return (
              <>
              <li key={index} style={{listStyle: "none"}}>
                장소 <b>{scenes.place}</b>에 포함되는 씬은 <b>[{scenesList}]</b> 입니다.
              </li>
              </>
            )
          })}
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
