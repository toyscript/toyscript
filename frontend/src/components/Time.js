import React from "react";
import { Container } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";


const Time = () => {
  const style = {
    backgroundColor: "rgb(246, 233, 180)",
  };

  const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "20px"
  };

  const data = {
    labels: ['LATE AFTERNOON', 'DAWN', 'DAY', 'MOMENTS LATER', 'NIGHT', 'DUSK'],
    datasets: [
      {
        label: '시간별',
        data: [2.3, 2.3, 36.2, 2.3, 54.6, 2.3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(253, 255, 0, 0.2)',
          'rgba(192, 192, 192, 0.2)',
          'rgba(40, 46, 60, 0.2)',
          'rgba(158, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(192, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(158, 159, 64, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const charactersPerTimeState = {
    labels: ["DAY",
    "NIGHT",
    "LATE AFTERNOON",
    "DUSK",
    "DAWN"],
    datasets: [
      {
        label: 'woody',
        data: [10, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(134, 79, 52, 0.6)',
      },
      {
        label: 'buzz',
        data: [10, 3, 20, 5, 1, 4],
        backgroundColor: 'rgba(97, 59, 111, 0.6)',
      },
      {
        label: 'rex',
        data: [5, 10, 13, 15, 22, 30],
        backgroundColor: 'rgba(141, 172, 80, 0.6)',
      },
      {
        label: 'jessie',
        data: [7, 7, 9, 11, 13, 15],
        backgroundColor: 'rgba(173, 37, 27, 0.6)',
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false
          },
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
        text: "시간대별 자주 등장하는 캐릭터",
        fontSize: 20,
      },
      legend: {
        display: true,
        position: "right",
      },
      responsive: true,
      maintainAspectRatio: true,
      layout: {
        padding: 30
      }
  }

  return (
    <Container style={style}>
      <br />
      <div style={chartBackgroundColor}>
        <Pie 
          data={data} 
          options={{
            title: {
              display: true,
              text: "영화에 나온 모든 시간대",
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
      <hr />
      <Bar
      data={charactersPerTimeState} 
      options={options}
      />
      </div>
      <br />
    </Container>
  );
}

export default Time;