import React from "react";
import { Container } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import 'bootstrap/dist/css/bootstrap.min.css';

const Place = () => {
  const style = {
    backgroundColor: "rgb(246, 233, 180)",
  };

  const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px",
  };

  const placeState = {
    labels: [
      "CATERPILLAR ROOM",
      "PLAYGROUND",
      "ANDY'S ROOM",
      "HALLWAY",
      "OFFICE",
      "GARBAGE TRUCK",
      "CATERPILLAR CLASSROOM",
      "BONNIE'S BEDROOM",
      "KEN'S DREAM HOUSE, BUTTERFLY ROOM",
      "BATHROOM",
    ],
    datasets: [
      {
        label: "빈도",
        backgroundColor: [
          "#FFAACC",
          "#FFAADD",
          "#FFBBCC",
          "#FFCCCC",
          "#FFCCDD",
          "#FFDDCC",
          "#FFEECC",
          "#FFFFCC",
          "#FFFFDD",
          "#FFFFEE",
        ],
        borderColor: [
          "#FFAACC",
          "#FFAABB",
          "#FFBBCC",
          "#FFCCCC",
          "#FFCCDD",
          "#FFDDCC",
          "#FFEECC",
          "#FFFFCC",
          "#FFFFDD",
          "#FFFFEE",
        ],
        borderWidth: 2,
        data: [18, 11, 8, 8, 6, 6, 5, 4, 3, 3],
      },
    ],
  };

  const topPlaceState = {
    labels: [
      "CATERPILLAR ROOM",
      "PLAYGROUND",
      "ANDY'S ROOM",
      "HALLWAY",
      "OFFICE",
    ],
    datasets: [
      {
        label: "비율",
        data: [36, 22, 18, 12, 12],
        backgroundColor: [
          "rgba(0, 83, 98, 0.7)",
          "rgba(18, 121, 131, 0.7)",
          "rgba(56, 160, 166, 0.7)",
          "rgba(106, 188, 190, 0.7)",
          "rgba(146, 213, 208, 0.7)",
        ],
        borderColor: [
          "rgba(0, 83, 98, 0.7)",
          "rgba(18, 121, 131, 0.7)",
          "rgba(56, 160, 166, 0.7)",
          "rgba(106, 188, 190, 0.7)",
          "rgba(146, 213, 208, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const charatersPerPlaceState = {
    labels: ["CATERPILLAR ROOM",
    "PLAYGROUND",
    "ANDY'S ROOM",
    "HALLWAY",
    "OFFICE"],
    datasets: [
      {
        label: 'woody',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'buzz',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'andy',
        data: [3, 10, 13, 15, 22, 30],
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'lotso',
        data: [5, 7, 9, 11, 13, 15],
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  }
  
  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
      title: {
        display: true,
        text: "장소별 자주 등장하는 캐릭터",
        fontSize: 20,
      },
      legend: {
        display: true,
        position: "right",
      },
      responsive: true,
      maintainAspectRatio: true,
  }



  return (
    <Container style={style}>
      <br />
      <div style={chartBackgroundColor}>
        {/* <p style={{ padding: "20px"}}>
          로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인
          분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을
          보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는
          실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움
          글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을
          그리킹(greeking)이라고도 부르며, 때로 로렘 입숨은 공간만 차지하는
          무언가를 지칭하는 용어로도 사용된다. 로렘 입숨은 전통 라틴어와 닮은 점
          때문에 종종 호기심을 유발하기도 하지만 그 이상의 의미를 담지는 않는다.
          문서에서 텍스트가 보이면 사람들은 전체적인 프레젠테이션보다는 텍스트에
          담긴 뜻에 집중하는 경향이 있어서 출판사들은 서체나 디자인을 보일 때는
          프레젠테이션 자체에 초점을 맞추기 위해 로렘 입숨을 사용한다. 로렘
          입숨은 영어에서 사용하는 문자들의 전형적인 분포에 근접하다고도 하는데,
          이 점 때문에 프레젠테이션으로 초점을 이동하는 데에도 도움을 준다.
        </p> */}
        <div style={{ padding: "20px"}}>
          <Bar
            data={placeState}
            options={{
              title: {
                display: true,
                text:
                  "가장 자주 등장하는 장소 TOP 10이 아니고 전체로 해야 하네",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
          <br />
          <Doughnut
            data={topPlaceState}
            options={{
              title: {
                display: true,
                text: "가장 자주 등장하는 장소 TOP 5",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
          <br />
          <Bar 
          data = {charatersPerPlaceState}
          options = {options}
          />
        </div>
      </div>
    <br />
    </Container>
  );
};

export default Place;
