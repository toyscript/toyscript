import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";

const Time = () => {
  const allTimeApiUrl =
    "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/times/frequencys";
  const allScenesPerTimeApiUrl = "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/times/scenes";
  const [allTimeData, setAllTimeData] = useState({});
  const [allScenesPerTimeData, setAllScenesPerTimeData] = useState([]);
  const style = {
    backgroundColor: "rgb(246, 233, 180)",
  };

  const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "20px",
  };

  const charactersPerTimeState = {
    labels: ["DAY", "NIGHT", "LATE AFTERNOON", "DUSK", "DAWN"],
    datasets: [
      {
        label: "woody",
        data: [10, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(134, 79, 52, 0.6)",
      },
      {
        label: "buzz",
        data: [10, 3, 20, 5, 1, 4],
        backgroundColor: "rgba(97, 59, 111, 0.6)",
      },
      {
        label: "rex",
        data: [5, 10, 13, 15, 22, 30],
        backgroundColor: "rgba(141, 172, 80, 0.6)",
      },
      {
        label: "jessie",
        data: [7, 7, 9, 11, 13, 15],
        backgroundColor: "rgba(173, 37, 27, 0.6)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
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
      text: "시간대별 자주 등장하는 캐릭터",
      fontSize: 20,
    },
    legend: {
      display: true,
      position: "right",
    },
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: 30,
    },
  };

  useEffect(() => {
    const fetchAllTimeData = async () => {
      const timeList = [];
      const timeFreq = [];
      let redList = [];
      let greenList = [];
      let blueList = [];
      let rgbList = [];
      await axios.get(allTimeApiUrl).then((response) => {
        // console.log(response);
        for (let dataObj of response.data) {
          timeList.push(dataObj.time);
          timeFreq.push(dataObj.frequency);
        }
        // console.log(timeList, timeFreq);
        for (let i = 0; i < response.data.length; i++) {
          const rand_red = Math.floor(Math.random() * 256);
          const rand_green = Math.floor(Math.random() * 256);
          const rand_blue = Math.floor(Math.random() * 256);
          redList.push(rand_red);
          greenList.push(rand_green);
          blueList.push(rand_blue);
        }
        for (let i = 0; i < greenList.length; i++) {
          let rgb = `rgba(${redList[i]}, ${greenList[i]}, ${blueList[i]}, 0.3)`;
          rgbList.push(rgb);
        }
        // console.log(rgbList)
      });
      setAllTimeData({
        labels: timeList,
        datasets: [
          {
            label: "빈도",
            data: timeFreq,
            backgroundColor: rgbList,
          },
        ],
      });
    };
    fetchAllTimeData();
  }, []);

  useEffect(() => {
    const fetchAllScenesData = async () => {
      const result = [];
      await axios.get(allScenesPerTimeApiUrl).then((response) => {
        for (let dataObj of response.data) {
          result.push(dataObj);
        }
      })
      setAllScenesPerTimeData(result);
      // console.log(allScenesPerTimeData)
    }
    fetchAllScenesData();
  }, []);

  return (
    <Container style={style}>
      <br />
      <div style={chartBackgroundColor}>
        <Pie
          data={allTimeData}
          options={{
            title: {
              display: true,
              text: "영화에 나온 모든 시간대",
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
        {allScenesPerTimeData.map((scenes, index) => {
          // console.log(scenes);
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
            return (
              <>
              <li key={index} style={{listStyle: "none"}}>
                <b>{scenes.time}</b> 시간대에 포함된 씬은 <b>[{scenesList}]</b> 입니다.
              </li>
              </>
            )
          })}
        <br />
        <hr />
        <br />
        <Bar data={charactersPerTimeState} options={options} />
      </div>
      <br />
    </Container>
  );
};

export default Time;
