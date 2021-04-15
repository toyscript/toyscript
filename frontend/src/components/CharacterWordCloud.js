import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import WordCloud from "react-d3-cloud";


const CharacterWordCloud = () => {
  
  const [characterNamesData, setcharacterNamesData] = useState([]);
  const [wordsFreqData, setWordsFreqData] = useState([]);


  const data = [
    { text: "Hey", value: 1000 },
    { text: "lol", value: 200 },
    { text: "first impression", value: 800 },
    { text: "very cool", value: 1000000 },
    { text: "duck", value: 10 }
  ];
  
  const allCharacterWordCloudsApiUrl =
    "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/characters/words";

  useEffect(() => {
    const fetchAllCharacterWordsFreqData = async () => {
        const characterNames = [];
        const wordsFrequenciesList = [];
        
        await axios.get(allCharacterWordCloudsApiUrl).then((response) => {
          const characterWordsFrequencies = response.data;
          characterWordsFrequencies.forEach(characterWordsFrequency => {
            characterNames.push(characterWordsFrequency.characterName);
            wordsFrequenciesList.push(characterWordsFrequency.words);
          });
        });
        setcharacterNamesData(characterNames.slice());
        setWordsFreqData(wordsFrequenciesList[0].slice());
      }
      fetchAllCharacterWordsFreqData();
    }, []);
    
  console.log(wordsFreqData);
  const fontSizeMapper = word => Math.log2(word.value) * 16;
  const rotate = word => word.value % 360;
    
  return (
      <div style={{ padding: "20px" }}>
        <div style={{
          maxWidth: "100%",
          height: "100vh",
          display: "block",
          padding: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <p>{characterNamesData[0]}</p>
          <WordCloud data={wordsFreqData} fontSizeMapper={fontSizeMapper} rotate={rotate} width={500} height={500}/>
        </div>
        <br />
        <hr />
      </div>
  );
};

export default CharacterWordCloud;
