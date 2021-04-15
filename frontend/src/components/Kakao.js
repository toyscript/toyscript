import React, { Component } from 'react';
import kakao from '../asset/buzz.png';

class Kakao extends Component {
  componentDidMount() {
    window.Kakao.init('63a907a131e033a58e0744429adc5add');

    window.Kakao.Link.createDefaultButton({
      container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: '대본 분석 결과',
        description: '대본의 분석요약, 장소, 등장인물, 시간대 분석 결과를 시각화하여 제공합니다.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/%EC%A7%A7%EC%9D%80%EB%8C%80%EB%B3%B8_%EB%A1%9C%EA%B3%A0.jpg',
        link: {
          mobileWebUrl: 'http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:3000/',
          webUrl: 'http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:3000/'
        }
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:3000/',
            webUrl: 'http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:3000/'
          }
        },
        {
          title: '팀 소개',
          link: {
            mobileWebUrl: 'http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:3000/aboutus',
            webUrl: 'http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:3000/aboutus'
          }
        }
      ]
    });
  }
  onClickKakao = () => {
    window.open('https://sharer.kakao.com/talk/friends/picker/link')
  }
  render() {
    return (
      <div className="Kakao">
        <button id="kakao-link-btn" onClick={this.onClickKakao}><img src={kakao} alt="kakao" /></button>
      </div>
    );
  }
}

export default Kakao;