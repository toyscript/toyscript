import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";

const Time = () => {
  const allTimeApiUrl =
    "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/times/frequencys";
  const allScenesPerTimeApiUrl =
    "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/times/scenes";
  const charactersPerTimeApiUrl =
    "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/times/characters";
  const [allTimeData, setAllTimeData] = useState({});
  const [allScenesPerTimeData, setAllScenesPerTimeData] = useState([]);
  const [allCharactersData, setAllCharactersData] = useState([]);
  const [topCharactersData, setTopCharactersData] = useState([]);

  const style = {
    backgroundColor: "rgb(246, 233, 180)",
  };

  const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "20px",
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
      });
      setAllScenesPerTimeData(result);
    };
    fetchAllScenesData();
  }, []);

  useEffect(() => {
    const fetchAllCharactersData = async () => {
      const result = [];
      await axios.get(charactersPerTimeApiUrl).then((response) => {
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
              <li key={index} style={{ listStyle: "none" }}>
                <b>{scenes.time}</b> 시간대에 포함된 씬은 <b>[{scenesList}]</b>{" "}
                입니다.
              </li>
            </>
          );
        })}
        <br />
        <hr />
        <br />
        {topCharactersData.map((data) => {
            let label = [data.time];
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
                        backgroundColor: rgbList
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
                      display: false
                  },
                  }}
                />
                <br />
                <br />
              </>
            );
          })}
      </div>
      <br />
    </Container>
  );
};

export default Time;
