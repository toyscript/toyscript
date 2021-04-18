import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import ChartWrap from "./ChartWrap"
import CharacterRelation from "./CharacterRelation"
import CharacterEmotion from "./CharacterEmotion"
import CharacterFrequency from "./CharacterFrequency"
import CharacterWordCloud from "./CharacterWordCloud";

const Character = ({ movieId, title, totalCharacters }) => {
    const characterFrequencyDesc = <p className="TabDescription">
                        <strong>{title}</strong>&nbsp; 대본에서는 어떤 캐릭터들이 자주 등장할까요? <br />
                        또 어떤 캐릭터들이 가장 많은 대사를 소화할까요? <br />
                        바로 아래에서는 대사를 기준으로, 가장 많은 비중을 차지하는 캐릭터들을 만나볼 수 있습니다. <br />
                        <strong>{totalCharacters}</strong> 명의 캐릭터 중에서 가장 많은 대사를 소화한&nbsp; <strong>5</strong> 명의 캐릭터들을 만나보세요.
                    </p>

    const characterEmotionDesc = <p className="TabDescription">
                        위에서 살펴본 캐릭터들에 대해 더 자세히 알고 싶으신가요? <br />
                        대사를 통해 캐릭터마다 강하게 표현되는 감성이 무엇인지 확인할 수 있습니다. <br />
                        특별히 원하는 감성의 캐릭터가 있나요? 바로 아래에서 확인해보세요. <br />
                        <small>( * 특정 캐릭터의 이름을 클릭할 때 해당 캐릭터의 그래프가 사라지거나 생성됩니다. )</small>
                    </p>

    const characterRelationDesc = <div>
                                        <p className="TabDescription">
                                            <strong>{title}</strong> 캐릭터들은 서로 어떻게 연결되어 있을까요? <br />
                                            TOY SCRIPT는 캐릭터 간의 모든 관계를 파악할 수 있도록 그래프를 제공합니다. <br />
                                            아래 그래프에서 캐릭터 이름 위에 마우스 커서를 올려보세요. 
                                            해당 캐릭터와 관계가 있는 캐릭터들이 표시됩니다. <br />
                                            <small>( * Tip! 그래프가 보이지 않는다면 마우스 휠을 통해 그래프 사이즈를 조절해보세요! 처음엔 캐릭터들이 멀리 떨어져 있습니다.  <br />
                                            캐릭터의 이름이 너무 작게 보인다면 페이지를 새로고침(F5)하고 10초 정도 기다렸다가 들어와주세요. 관계가 복잡할수록 첫 렌더링에 시간이 조금 걸립니다. )</small>
                                        </p>
                                        <br/>
                                        <p>
                                            <center>
                                                <p>
                                                    <strong>1차 관계 네트워크</strong>
                                                </p>                                            
                                                같은 씬에 등장하는 캐릭터들의 1차 연결 관계를 확인할 수 있습니다.
                                            </center>
                                        </p>
                                    </div>

    const characterWordsDesc = <p className="TabDescription">
                        마지막으로 가장 비중 있는 캐릭터들은 어떤 단어들을 자주 사용할까요? <br />
                        특별히 워드 클라우드는 캐릭터가 많이 사용하는 단어들을 직관적으로 보여줍니다. <br />
                        캐릭터가 많이 사용한 단어일수록 단어의 크기가 커집니다. 바로 아래 그림에서 직접 만나보세요.
                    </p>

  return (
    <Container className="TabContents">
        <div className="TabContentsInner">
            {characterFrequencyDesc}
            <ChartWrap chart={<CharacterFrequency movieId={movieId} />}></ChartWrap>
            {characterEmotionDesc}
            <ChartWrap chart={<CharacterEmotion movieId={movieId} />}></ChartWrap>
            {characterRelationDesc}
            <ChartWrap chart={<CharacterRelation movieId={movieId} />}></ChartWrap>
            {characterWordsDesc}
            <ChartWrap chart={<CharacterWordCloud movieId={movieId} />}></ChartWrap>
        </div>
    </ Container>
  );
}

export default Character;
