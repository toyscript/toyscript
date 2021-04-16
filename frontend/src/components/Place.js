import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// import * as palette from 'google-palette';

const Place = ({ movieId }) => {
  
  const allPlacesApiUrl =
    `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/${movieId}/places/frequencys`;
  const scenesPerPlaceApiUrl =
    `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/${movieId}/places/scenes`;
  const charactersPerPlaceApiUrl =
    `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/${movieId}/places/characters`;
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
        console.log(response);
        for (let dataObj of response.data) {
          result.push(dataObj);
        }
      });
      const topCharacters = result.slice(0, 5);
      // console.log(topCharacters);
      setTopCharactersData(topCharacters);
      setMostChartData({
        actors: topCharacters[0].characters.length,
        place: topCharacters[0].place,
      });
    };
    fetchAllCharactersData();
  }, []);

  return (
    <Container style={{ backgroundColor: "rgb(246, 233, 180)" }}>
      <br />
      <div style={chartBackgroundColor}>
        <div style={{ padding: "20px" }}>
          <p style={{ padding: "20px" }}>
            검색하신 대본에서 어떤 장소들이 많이 나올지 궁금하신가요? 
            더 이상 대본을 뒤적거리며 어떤 장소가 몇 번 나왔는지 일일히 세지 마세요.
            <br />
            TOY SCRIPT는 영화를 효율적으로 촬영할 수 있도록
            대본에 나온 모든 장소의 이름과
            장소별 빈도를 함께 알려드립니다. 
            <br />
            현재 보고 계시는 대본에서 가장 많이 나온 장소는 <b>{mostData.firstPlace}</b>이고, 
            무려 <b>{mostData.firstFreq}</b>번이나 나왔네요!
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
            대본에 등장하는 전체 장소 중 TOP 5만 보실 수도 있습니다.
            간편하게 그래프에 마우스를 올려보세요. 장소명과 함께 빈도를 확인할 수 있습니다.
            <br />
            두번째로 많이 나온 장소인 <b>{mostData.secondPlace}</b>에선 
            총 <b>{mostData.secondFreq}</b>개의 씬이 있다는 걸 의미합니다.
          </p>
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
          <p style={{ padding: "20px" }}>
            이쯤에서 '많이 나오는 장소가 몇 번 나오는진 알겠는데 이 장소가 어느 씬에 등장하는 건지 알려줘야 하지 않나?'라는 의문이 들 수도 있습니다.
            <br />
            걱정마세요. TOY SCRIPT는 빈도가 높은 TOP 5 장소에 해당하는 씬 번호도 함께 알려드리니까요.
            바로 아래에서 확인하실 수 있습니다.
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
                  장소 <b>{scenes.place}</b>에 포함되는 씬은{" "}
                  <b>[{scenesList}]</b> 입니다.
                </li>
              </ul>
            );
          })}
          <br />
          <hr />
          <br />
          <p style={{ padding: "20px" }}>
            대본에서 많이 나오는 장소를 봤으니 이제 많은 캐릭터가 등장하는 장소도 봐야겠죠.
            얼마나 많은 배우들이 출연하는지도 영화 제작비에 큰 영향을 주니까요.
            <br />
            아래의 그래프 다섯개는 출연자수를 기준으로 장소별 출연자 빈도를 나타낸 그래프입니다.
            조금 더 풀어서 설명해볼까요?
            <br />
            보고 계시는 첫번째 그래프는 {mostChartData.actors}명의 배우들이 출연했습니다.
            각각의 배우가 같은 장면에 몇 번이나 출연했는지 알고 싶으시다면 바에 마우스를 올려보세요.
            <br />
            여기서 한 가지 주의하실 점은
            대본에서 빈도가 높은 장소라 해서 반드시 많은 배우들이 출연한 장소는 아니라는 것입니다.
          </p>
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
