import React, { useEffect, useState } from "react";
import { HorizontalBar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const CharacterFrequency = ({movieId}) => {
  const allCharacterFrequencyApiUrl =
    `https://toyscriptapi.azurewebsites.net/api/${movieId}/characters/frequencys`;
  const [characterFrequencyData, setCharacterFrequencyData] = useState({});

  useEffect(() => {
      const fetchAllCharacterFrequencyData = async () => {
          const characterNames = [];
          const characterFrequencies = [];
          await axios.get(allCharacterFrequencyApiUrl).then((response) => {
              const allCharacterFrequencies = response.data;
              for(let i=0 ; i < 5 ; i++) {
                const characterFreq = allCharacterFrequencies[i];
                characterNames.push(characterFreq.character);
                characterFrequencies.push(characterFreq.frequency);
              }
          });
          setCharacterFrequencyData({
              labels: characterNames,
              datasets: [
                {
                  label: "빈도",
                  data: characterFrequencies,
                  backgroundColor: [
                    "rgba(224, 187, 228, 0.8)", 
                    "rgba(149, 125, 173, 0.8)", 
                    "rgba(210, 145, 188, 0.8)", 
                    "rgba(254, 200, 216, 0.8)", 
                    "rgba(255, 223, 211, 0.8)"],
                },
              ]
            });
          }
    fetchAllCharacterFrequencyData();
  }, []);

  return (
      <>
      <HorizontalBar
          data={characterFrequencyData}
          options={{
            title: {
              display: true,
              text: "가장 많은 대사를 소화한 캐릭터",
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "top",
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              yAxes: [{
                  barPercentage: 0.4,
                  ticks: {
                    fontSize: 16
                  }
              }]
            }
          }}
      />
    </>
  );
};

export default CharacterFrequency;
