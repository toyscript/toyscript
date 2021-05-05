import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import Container from '@material-ui/core/Container';

const Time = ({ movieId }) => {
  const allTimeApiUrl =
    `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/${movieId}/times/frequencys`;
  const allScenesPerTimeApiUrl =
    `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/${movieId}/times/scenes`;
  const charactersPerTimeApiUrl =
    `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/${movieId}/times/characters`;
  const [allTimeData, setAllTimeData] = useState({});
  const [allScenesPerTimeData, setAllScenesPerTimeData] = useState([]);
  const [topCharactersData, setTopCharactersData] = useState([]);
  const [mostData, setMostData] = useState({});
  const [mostChartData, setMostChartData] = useState({});

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
        for (let dataObj of response.data) {
          timeList.push(dataObj.time);
          timeFreq.push(dataObj.frequency);
        }
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
      setMostData({
        firstTime: timeList[0],
        firstFreq: timeFreq[0],
        secondTime: timeList[1],
        secondFreq: timeFreq[1]
      })
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
        for (let dataObj of response.data) {
          result.push(dataObj);
        }
      });
      const topCharacters = result.slice(0, 5);
      setTopCharactersData(topCharacters);
      setMostChartData({
        actors: topCharacters[0].characters.length,
        time: topCharacters[0].time,
      });
    };
    fetchAllCharactersData();
  }, []);

  return (
    <Container className="TabContents">
      <div className="TabContentsInner">
        <p style={{ padding: "20px" }}>
            앞선 자료에서는 장소별 그래프를 보셨으니 이제 시간대별 그래프도 확인해보겠습니다. <br />
            전체 대본에서 어떤 시간대의 장면이 얼마나 있는지 대본을 보지 않고도 미리 알 수 있다면 <br />
            영화를 더욱 효율적으로 촬영할 수 있을 테니까요. 
            <br />
            <br />
            이 탭에서는 대본에 나오는 모든 시간대의 목록과 그 빈도를 그래프로 보실 수 있습니다.
            <br />
            현재 보고 계시는 대본에서 가장 많이 나온 시간대는 &nbsp;<strong>{mostData.firstTime}</strong> 이고,&nbsp;&nbsp; 
            <strong>{mostData.firstFreq}</strong> 번 나왔네요. <br /><br /> 
            두번째로 많이 나온 시간대도 한 번 살펴볼까요?
            <br />
            이 대본에서 두번째로 많이 나온 시간대는 &nbsp;<strong>{mostData.secondTime}</strong> 이고,
            &nbsp;<strong>{mostData.secondFreq}</strong> 번 나왔습니다. <br />
            다른 시간대와 빈도를 알고 싶으시다면 그래프에 마우스를 올려보세요.
          </p>
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
          <hr />
          <br />
        <p style={{ padding: "20px" }}>
            각 장소별로 씬 번호를 알려드렸던 것처럼, TOY SCRIPT는 시간대별로 들어가는 씬 번호도 모두 제공합니다. <br />
            바로 아래에서 각각의 내용을 확인해보세요!
          </p>
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
            <ul>
              <li key={index} style={{ listStyle: "none" }}>
                <strong>{scenes.time}</strong> 시간대에 포함된 씬은 &nbsp;<strong>[{scenesList}]</strong>{" "}
                입니다.
              </li>
            </ul>
          );
        })}
        <br />
        <hr />
        <br />
        <p style={{ padding: "20px" }}>
            그렇다면 가장 많은 캐릭터가 출연한 시간대는 언제일까요?
            <br />
            아래 다섯개 그래프는 출연하는 캐릭터의 수가 많은 시간대 TOP 5를 뽑아, <br />
            어떤 시간대에 어떤 캐릭터가 얼마나 자주 출연하는지 빈도를 확인하는 그래프입니다. <br />
            이 설명으로는 한 번에 이해하기 어려울 수도 있으니 바로 아래 그래프를 예시로 들어 설명하겠습니다.
            <br /> <br />
            아래 그래프에서 &nbsp;<strong>{mostChartData.time}</strong> 시간대에는 
            총 <strong>{mostChartData.actors}</strong>명의 캐릭터가 출연했습니다. <br />
            각 캐릭터의 출연 빈도는 그래프의 바에 마우스를 올려서 확인하실 수 있습니다.
        </p>
        {topCharactersData.map((data) => {
          let label = [data.time];
          let labelList = [];
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
      </div>
      <br />
    </Container>
  );
};

export default Time;
