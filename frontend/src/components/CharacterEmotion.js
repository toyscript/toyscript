import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Radar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";



const CharacterEmotion = () => {
const allCharacterEmotionsApiUrl =
  "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/characters/sentiments";
const [radarData, setRadarData] = useState({});
const chartColors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(255, 205, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(100, 100, 100, 0.7)'
  ];

const effectColors = {
    highlight: 'rgba(255, 255, 255, 0.75)',
    shadow: 'rgba(0, 0, 0, 0.5)',
    innerglow: 'rgba(255, 255, 0, 0.5)',
    outerglow: 'rgb(255, 255, 0)'
  };


const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px",
  };

const options = {
    legend: {
      position: 'bottom',
      labels: {
        padding: 30,
        fontSize: 13,
        fontFamily: 'NEXON Lv1 Gothic',
        lineHeight: 50,
      },
    },
    title: {
      display: true,
      padding: 25,
      text: 'Top 5  캐릭터 감정 분석',
      fontSize: 25,
      fontFamily: 'NEXON Lv1 Gothic',
    },
    scale: {
      gridLines: {
        lineWidth: 2
      },
      angleLines: {
        display: true
      },
      pointLabels: { 
        fontSize: 15,
        fontColor: "black",
        fontFamily: 'NEXON Lv1 Gothic'
      }
    },
}

useEffect(() => {
    const fetchAllCharacterEmotionsData = async () => {
        let radarLabels = [];
        const characterNames = [];
        const emotionResults = [];
        
        await axios.get(allCharacterEmotionsApiUrl).then((response) => {
            radarLabels = response.data.sentimentType;
            response.data.characters.forEach(characterEmotionResult => {
                characterNames.push(characterEmotionResult.characterName)
                emotionResults.push(characterEmotionResult.sentiments)
        })
        setRadarData({
            labels: radarLabels,
            datasets: [0,1,2,3,4].map( i => {
                const dataSet = {
                  fill : true,
                  label: characterNames[i],
                  backgroundColor: chartColors[i].replace('0.7', '0.12'),
                  borderColor: chartColors[i],
                  pointBackgroundColor: chartColors[i],
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: chartColors[i],
                  data: emotionResults[i],
                  pointRadius: 2.5,
                  pointBevelWidth: 2,
                  pointBevelHighlightColor: effectColors.highlight,
                  pointBevelShadowColor: effectColors.shadow,
                  pointHoverRadius: 10,
                  pointHoverBevelWidth: 3,
                  pointHoverInnerGlowWidth: 20,
                  pointHoverInnerGlowColor: effectColors.innerglow,
                  pointHoverOuterGlowWidth: 20,
                  pointHoverOuterGlowColor: effectColors.outerglow
                };
                return dataSet;
                }
            )      
            })
        })}

        fetchAllCharacterEmotionsData();
    }, []);

  return (
      <div style={{ padding: "20px" }}>
        <Radar
          data={radarData}
          options={options}
          />
        <br />
        <hr />
      </div>
  );
};

export default CharacterEmotion;
