import React from "react";

import "../serviceInfo.css"
import Header from "./Header";

function ServiceInfo() {

  return(
    <>
      <Header />
      <center>
        <img className="toyscript" src="/images/toyscript!.png" alt="logo" />
      </center>
      <div id="service-info-box">
        <div className="desc">
          <p>" TOY SCRIPT " 는 toy project의 'TOY'와 'SCRIPT'의 합성어로,<br/>
            txt 형식 대본을 분석해 영화 제작자가 대본을 읽지 않고도 대본 정보를 빠르게 파악할 수 있게 toy 버전의 Script를 제공합니다.<br/>
             분석 방법으로는 빈도 분석, 감성 분석, 네트워크 분석을 이용했고, <br/>데이터 전처리를 위해 NLTK(Natural Language ToolKit, 자연어 처리 패키지)를 사용했습니다.<br/>
            감성 분석을 위해서는 NRC Emotion Lexicons 감성 사전을 사용했습니다.<br/>
            <br/>
            팀 LAM OR NOT LAM은 서비스 사용자에게 본 서비스가 장난감처럼 작지만 의미 있는 서비스가 되길 바랍니다. 🙂
          </p>
        </div>
      </div>

      <div className="section-box">
        <div className="section-tit">
          <h4 className="page-tit"> " Toy Script 이용방법 "</h4>
        </div>
        <div className="guide-service">
          <ul className="head">
            <li>
              <span className="num">01</span>
              영화 검색
              <span className="arr"></span>
            </li>
            <li>
              <span className="num">02</span>
              G O !
              <span className="arr"></span>
            </li>
            <li>
              <span className="num">03</span>
              정보확인
              <span className="arr"></span>
            </li>
            <li>
              <span className="num">04</span>
              공유하기
            </li>
          </ul>
          <ul className="cont">
            <li>
              <dl className="step1">
                <dt>
                  <span className="num">01</span>
                  영화 검색
                </dt>
                <dd>
                  <p className="dsc">검색하고자 하는 영화를 입력해주세요.</p>
                </dd>
              </dl>
            </li>
            <li>
              <dl className="step2">
                <dt>
                  <span className="num">02</span>
                  정보 확인
                </dt>
                <dd>
                  <p className="dsc">각 TAB에서 분석된 정보를 확인하세요.
                  <br/>
                  <br/>
                  ✅ Summary : 대본의 전반적인 정보를 제공합니다.
                  <br/>
                  ✅ Character : 비중 높은 캐릭터의 관련 정보를 제공합니다.
                  <br/>
                  ✅ Place : 대본 내 전체 장소에 대한 정보를 제공합니다. 
                  <br/>
                  ✅ Time : 시간대 종류와 시간별 빈도높은 장소 정보를 제공합니다.
                  </p>
                </dd>
              </dl>
            </li>
            <li>
              <dl className="step3">
                <dt>
                  <span className="num">03</span>
                  공유하기
                </dt>
                <dd>
                  <p className="dsc">우측 하단의 카카오톡 아이콘을 클릭하시면 해당 정보를 카카오톡으로 공유할 수 있습니다.</p>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>

    </>
  )
}


export default ServiceInfo;