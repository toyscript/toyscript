import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import Container from '@material-ui/core/Container';

const Place = ({ movieId, title }) => {
  
  const allPlacesApiUrl =
    `https://toyscriptapi.azurewebsites.net/api/${movieId}/places/frequencys`;
  const scenesPerPlaceApiUrl =
    `https://toyscriptapi.azurewebsites.net/api/${movieId}/places/scenes`;
  const charactersPerPlaceApiUrl =
    `https://toyscriptapi.azurewebsites.net/api/${movieId}/places/characters`;
  const [allPlacesData, setAllPlacesData] = useState({});
  const [topPlacesData, setTopPlacesData] = useState({});
  const [mostData, setMostData] = useState({});
  const [mostChartData, setMostChartData] = useState({});
  const [allScenesPerPlaceData, setAllScenesPerPlacesData] = useState([]);
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
      setMostData({
        firstPlace: topPlacesName[0],
        firstFreq: topPlacesFreq[0],
        secondPlace: topPlacesName[1],
        secondFreq: topPlacesFreq[1],
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
  }, []);

  useEffect(() => {
    const fetchAllCharactersData = async () => {
      const result = [];
      await axios.get(charactersPerPlaceApiUrl).then((response) => {
        // console.log(response);
        for (let dataObj of response.data) {
          result.push(dataObj);
        }
      });
      const topCharacters = result.slice(0, 5);
      setTopCharactersData(topCharacters);
      setMostChartData({
        actors: topCharacters[0].characters.length,
        place: topCharacters[0].place,
      });
    };
    fetchAllCharactersData();
  }, []);

  return (
    <Container className="TabContents">
      <div className="TabContentsInner">
          <p>
            <strong>{title}</strong> 대본에서 어떤 장소들이 많이 나올지 궁금하신가요? <br />
            TOY SCRIPT는 영화를 효율적으로 촬영할 수 있도록 대본에 나온 장소의 이름과 장소별 빈도를 모두 알려드립니다. 
            <br />
            현재 보이는 대본에서 가장 많이 나온 장소는 <strong>{mostData.firstPlace}</strong>이고, 
            &nbsp;무려 <strong>{mostData.firstFreq}</strong>번이나 나왔네요!
          </p>
          <Bar
            data={allPlacesData}
            options={{
              title: {
                display: true,
                text: "영화에 나오는 전체 장소",
                fontSize: 20,
              },
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
            전체 장소 중 TOP 5 장소만 보실 수도 있습니다. <br />
            간편하게 아래 그래프에 마우스를 올려보세요. 장소명과 함께 빈도를 확인할 수 있습니다.
            <br />
            두번째로 많이 나온 장소인 &nbsp;<strong>{mostData.secondPlace}</strong>에선 
            &nbsp;총 <strong>{mostData.secondFreq}</strong>개의 씬이 있다는 걸 의미하네요!
          </p>
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
          <br />
          <hr />
          <br />
          <p style={{ padding: "20px" }}>
            지금까지 전체 장소와 TOP 5 장소, 그리고 각각의 장소에서 몇 개의 씬이 포함되는지 알아보았습니다. <br />
            <br />
            이번에는 TOP 5 장소에 포함된 씬이 각각 무엇인지 알아볼게요! <br />
          </p>
          {allScenesPerPlaceData.map((scenes, index) => {
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
                  장소 <b>{scenes.place}</b>에 포함되는 씬은, <br />
                  <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ {scenesList} ]</b> 입니다.
                </li>
              </ul>
            );
          })}
          <br />
          <hr />
          <br />
          <p style={{ padding: "20px" }}>
            대본에서 많이 나오는 장소를 봤으니 이제 많은 배우가 등장하는 장소도 봐야겠죠? <br/>
            얼마나 많은 배우들이 출연하는지도 영화 제작비에 큰 영향을 주니까요.
            <br />
            아래의 다섯 개의 그래프는 출연자 수를 기준으로 장소별 출연자 빈도를 나타낸 그래프입니다. <br/>
            <br />
            조금 더 풀어서 설명해볼까요? 지금 보이는 첫번째 그래프는 {mostChartData.actors}명의 배우들이 출연했습니다. <br />
            각각의 배우가 같은 장면에 몇 번이나 출연했는지 알고 싶다면 바에 마우스를 올려보세요.
            <br />
            여기서 한 가지 주의할 점은
            대본에서 자주 등장한 장소가 반드시 많은 배우들이 출연한 장소는 아니라는 점입니다.
          </p>
          <br />
          {topCharactersData.map((data) => {
            // console.log(topCharactersData)
            let label = [data.place];
            let labels = [];
            let frequency = [];
            let redList = [];
            let greenList = [];
            let blueList = [];
            let rgbList = [];
            for (let i = 0; i < data.characters.length; i++) {
              labels.push(data.characters[i].characterName);
              frequency.push(data.characters[i].characters);
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
            // console.log(frequency);

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
                    scales: {
                      xAxes: [{
                          barPercentage: 0.5
                      }]
                  }
                  }}
                />
                <br />
                <br />
              </>
            );
          })}
      </div>
    </Container>
  );
};

export default Place;
