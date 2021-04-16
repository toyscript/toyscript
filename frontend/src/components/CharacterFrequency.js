import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Bar, Radar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";



const CharacterFrequency = ({movieId}) => {
const allCharacterFrequencyApiUrl =
  `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/${movieId}/characters/frequencys`;
const [characterFrequencyData, setCharacterFrequencyData] = useState({});

useEffect(() => {
    const fetchAllCharacterFrequencyData = async () => {
        const characterNames = [];
        const characterFrequencies = [];
        let [red, green, blue] = [30, 100, 100];
        let greenList = [105];
        let blueList = [105];
        let rgbList = [];
        await axios.get(allCharacterFrequencyApiUrl).then((response) => {
            const allCharacterFrequencies = response.data;
            for(let i=0 ; i < 5 ; i++) {
              const characterFreq = allCharacterFrequencies[i];
              characterNames.push(characterFreq.character);
              characterFrequencies.push(characterFreq.frequency);
            }
            for (let i = 0; i < response.data.length; i++) {
              if (green <= 255 && blue <= 255) {
                green += 30;
                greenList.push(green);
                blue += 30;
                blueList.push(blue);
              }
            }
            for (let i = 0; i < greenList.length; i++) {
              let rgb = `rgb(${red}, ${greenList[i]}, ${blueList[i]})`;
              rgbList.push(rgb);
            }
        });
        setCharacterFrequencyData({
            labels: characterNames,
            datasets: [
              {
                label: "빈도",
                data: characterFrequencies,
                backgroundColor: rgbList,
              },
            ]
          });
        }
        fetchAllCharacterFrequencyData();
      }, []);

  return (
      <>
      <Bar
          data={characterFrequencyData}
          options={{
            title: {
              display: true,
              text: "자주 등장하는 캐릭터",
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "top",
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              xAxes: [{
                  barPercentage: 0.4,
                  ticks: {
                    fontSize: 16
                  }
              }]
            }
          }}
        
      />
      <br />
      <br />
    </>
  );
};

export default CharacterFrequency;
