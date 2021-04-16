import React, { Component } from 'react';

class Kakao extends Component {
  componentDidMount() {
    window.Kakao.init("63a907a131e033a58e0744429adc5add"); // 노출되어도 괜찮은 javascript key입니다. 허용한 url에서 api호출만 허용합니다.

    window.Kakao.Link.createDefaultButton({
      container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: '대본 분석 결과',
        description: '대본의 분석요약, 장소, 등장인물, 시간대 분석 결과를 시각화하여 제공합니다.',
        imageUrl: 'https://media.vlpt.us/images/moey920/post/b1332948-dfce-4ce5-9e99-2bcea4374bab/Logo2.png',
        link: {
          mobileWebUrl: 'http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:3000/',
          webUrl: 'http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:3000/'
        }
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845
      },
      buttons: [
        {
          title: '대본 분석하기',
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
  onClickUpBtn = () => {
    window.scrollTo(0,0)
  }

  render() {
    return (
      <div className="Kakao">
        <img id="up-btn" onClick={this.onClickUpBtn} src={"/images/up-arrow.png"} alt="맨 위로" />
        <img id="kakao-link-btn" onClick={this.onClickKakao} src={"/images/kakaologo2.png"} alt="kakao" />
      </div>
    );
  }
}

export default Kakao;