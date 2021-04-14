import React from "react";

import "../serviceInfo.css"
import Header from "./Header";

function ServiceInfo() {

  return(
    <>
      <Header />
      <center>
        <img className="toyscript" src="/images/toyscript!.png" />
      </center>
      <div className="desc">
        <p>'Toy Script'는 Toy + Script 의 합성어로, 영화 제작자님을 위해 Toy version의 Script를 제공합니다.</p>
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
              다운로드
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
                  º Summary : 대본의 전반적인 정보를 제공합니다.
                  <br/>
                  º Character : 비중 높은 캐릭터의 관련 정보를 제공합니다.
                  <br/>
                  º Place : 대본 내 전체 장소에 대한 정보를 제공합니다. 
                  <br/>
                  º Time : 시간대 종류와 시간 별 빈도높은 장소 정보를 제공합니다.
                  </p>
                </dd>
              </dl>
            </li>
            <li>
              <dl className="step3">
                <dt>
                  <span className="num">03</span>
                  다운로드
                </dt>
                <dd>
                  <p className="dsc">버즈가 필요한 정보 다운로드를 도와줍니다.</p>
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