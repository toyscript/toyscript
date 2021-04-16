import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import WordCloud from "react-d3-cloud";


const CharacterWordCloud = ({ movieId }) => {
  
  const [characterNamesData, setcharacterNamesData] = useState([]);
  const [wordsFreqData, setWordsFreqData] = useState({ list: [] });

  const data = [
    { text: "Hey", value: 1000 },
    { text: "lol", value: 200 },
    { text: "first impression", value: 800 },
    { text: "very cool", value: 1000000 },
    { text: "duck", value: 10 }
  ];
  
  const allCharacterWordCloudsApiUrl =
    `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/${movieId}/characters/words`;

  useEffect(() => {
    const fetchAllCharacterWordsFreqData = async () => {
        const characterNames = [];
        const wordsFrequenciesList = [];
        
        await axios.get(allCharacterWordCloudsApiUrl).then((response) => {
          const characterWordsFrequencies = response.data;

          for (let i=0; i < characterWordsFrequencies.length; i++) {
            characterNames.push(characterWordsFrequencies[i].characterName);
            wordsFrequenciesList.push(characterWordsFrequencies[i].words);
          }
        });
        setcharacterNamesData(characterNames.slice());
        setWordsFreqData({
          list: wordsFrequenciesList
        })
      }
      fetchAllCharacterWordsFreqData();
    }, []);
    
  const fontSizeMapper = word => Math.log2(word.value) * 16;
  const rotate = word => word.value % 360;
  
  const topStyle = {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  const nameStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderBottom: "1px solid rgb(212, 212, 212)",
    marginLeft: 220,
    marginRight: 220
  };

  const wordCloudStyle = {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    paddingBottom: "80px"
  };

  const wordClouds = wordsFreqData.list;
  console.log(wordClouds);

  return (
      <div style={{ padding: "20px" }}>
        {wordsFreqData.list.map((wordsFreq, i) => 
            <div>
              <div style={topStyle}>TOP {i+1}</div>
              <div style={nameStyle}>{characterNamesData[i]}</div>
              <div style={wordCloudStyle}><WordCloud data={wordsFreq} fontSizeMapper={fontSizeMapper} rotate={rotate} width={500} height={300}/></div>
            </div>
          )}
        <br />
        <hr />
      </div>
  );
};

export default CharacterWordCloud;
