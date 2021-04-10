import React, { useState } from "react";
import "../aboutUs.css";
import {
  faSearch,
  faBlog
} from "@fortawesome/free-solid-svg-icons";
import { 
  faGithub,
  faGitlab
 } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";


const AboutUs = () => {
  const members = ["김수람", "노하람", "이보람", "김수연", "김유나"];
  const githubUrl = [
    "https://github.com/su-ram", 
    "https://github.com/moey920", 
    "https://github.com/bky373", 
    "https://github.com/alveloper", 
    "https://github.com/yuna-k621"
  ];
  const gitlabUrl = [
    "https://kdt-gitlab.elice.io/suram",
    "https://kdt-gitlab.elice.io/Rohharam",
    "https://kdt-gitlab.elice.io/bky373",
    "https://kdt-gitlab.elice.io/alveloper",
    "https://kdt-gitlab.elice.io/yunk621"
  ];
  const blogUrl = [
    "https://velog.io/@su-ram",
    "https://velog.io/@moey920",
    "https://velog.io/@bky373/",
    "https://alveloper.github.io/",
    "https://velog.io/@yunk621"
  ];
  const role = ["backend", "frontend"];
  const profile = [
    "/images/buzz_profile.png",
    "/images/pig_profile.png",
    "/images/rex_profile.png",
    "/images/lotso.png",
    "/images/woody_profile.png",
  ];
  const questions = ["이 페이지를 보고 계시는 사용자분들께 자기 소개 한 마디 부탁드립니다.", "가장 좋아하는 영화가 있다면 이유와 함께 추천해주세요!"]; 
  const suramSpeech = ["안녕하세요. LAM1을 맡고 있는 김수람입니다. 대본 분석을 통해 얻은 인사이트들이 영화 제작에 도움이 되었으면 좋겠습니다. 창의적이고 좋은 영화 많이 만들어 주세요!!!", "‘월터의 상상은 현실이 된다’를 강력히 추천드립니다. 영화 전반에 걸쳐 나오는 메세지도  좋고 무엇보다도 내가 하는 모든 일의 중요성을 되새길 수 있어서 좋아요. 😉"];
  const haramSpeech = ["안녕하세요. LAM2인 노하람입니다. 토이 스크립트에선 데이터분석을 맡고 있습니다! 대본 속에서 제작에 도움이 될 정보를 뽑아보려고 노력했어요. 우리 서비스를 통해 대략적인 영화의 느낌을 한 눈에 파악해보세요! 츄라이츄라이!", "제가 추천해드리고 싶은 영화는 '초속 5cm'입니다. 표정과 작은 숨소리 등으로 감정을 아주 디테일하게 표현한게 이 영화만의 장점같아요. 감성적인 영화를 좋아하시거나 아련한 첫사랑의 기억을 떠올려보고 싶은 분들께 추천드려요."];
  const boramSpeech = ["안녕하세요. LAM3를 맡고 있는 이보람입니다 😉  글로만 이루어진 대본의 내용들을 그림으로 보여드리기 위해 노력했습니다. 대본을 읽기 전, 또는 읽은 후 저희의 서비스가 대본을 이해하는 데 도움이 되셨기를 바랍니다!", "저는 '인셉션'을 추천합니다! 한 번 이해하면 감탄할 수밖에 앖는 영화! 도대체 어디까지가 꿈이고, 어디까지가 꿈 속의 꿈인지 종잡을 수 없어요. 박진감 터지는 전개를 느끼고 싶다면 인셉션 꼭 한 번 보시는 걸 추천합니다~~!"];
  const suyeonSpeech = ["안녕하세요. 팀 LAM OR NOT LAM 중 NOT LAM no.1인 김수연입니다! 토이 스크립트에선 프론트엔드를 맡고 있습니다. 영화 제작 시 대본을 모두 읽어야 하는 수고를 덜고자 이런 프로젝트를 기획했어요. 토이 스크립트가 감독님의 의사결정에 도움이 되길 바랍니다. 감사합니다.", "좋아하는 영화는 항상 바뀌는데 최근에 푹 빠진 영화는 ‘더 헌트’ 입니다. 미국 문화를 좋아하시거나 액션이 화려해서 스트레스 풀리는 영화를 보고 싶으신 분이라면 200% 만족하실 거예요!"];
  const yunaSpeech = ["안녕하세요 여러분, LAM OR NOT LAM 에서 NOT LAM no.2를 담당하고 있는 김유나 입니다. 😎  'Toy Script'에서는 전체적인 기획과 프론트엔드 파트를 담당했어요~ 대본의 전반적인 내용을 빨리 파악하시는데 작게나마 도움이 되길 바랍니다.", "요즘은 일정이 바빠서 그런지, '심야식당'을 가장 좋아하고 있어요. 바쁘고 힘든 일상이 끝난 후, 늦은 저녁 따뜻한 식당 안에서 맛있는 마스터의 음식을 먹으며 하루를 마무리하는 그 영화를 가만히 보고 있자면 저도 같이 힐링이 되는 기분이더라구요. 추천드려요!"];

  const [memberPage, setMemberPage] = useState(0);

  // profile.map((profile) => {
  //   return (
  //     <div className="img_cont">
  //       <img src={profile} className="rounded-circle user_img" />
  //     </div>
  //   );
  // });

  return (
    <>
      <Header />
      <div className="container-fluid h-100 display">
        <div className="d-flex row justify-content-center h-100">
          <div className="col-md-4 col-xl-3 chat">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
              <div className="card-header">
                <div className="input-group">
                  <input
                    disabled="true"
                    type="text"
                    placeholder="LAM OR NOT LAM"
                    className="form-control search"
                  />
                  <div className="input-group-prepend">
                    <span className="input-group-text search_btn">
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-body contacts_body">
                <div className="contacts">
                  <li
                    className="d-flex bd-highligh"
                    onClick={() => {
                      setMemberPage(0);
                    }}
                  >
                    <div className="img_cont">
                      <img
                        src={profile[0]}
                        className="rounded-circle user_img"
                        alt="profile"
                      />
                    </div>
                    <div className="user_info">
                      <span>{members[0]}</span>
                      <p>{role[0]}</p>
                    </div>
                  </li>
                  <li
                    className="d-flex bd-highligh"
                    onClick={() => {
                      setMemberPage(1);
                    }}
                  >
                    <div className="img_cont">
                      <img
                        src={profile[1]}
                        className="rounded-circle user_img"
                        alt="profile"
                      />
                    </div>
                    <div className="user_info">
                      <span>{members[1]}</span>
                      <p>{role[0]}</p>
                    </div>
                  </li>
                  <li
                    className="d-flex bd-highligh"
                    onClick={() => {
                      setMemberPage(2);
                    }}
                  >
                    <div className="img_cont">
                      <img
                        src={profile[2]}
                        className="rounded-circle user_img"
                        alt="profile"
                      />
                    </div>
                    <div className="user_info">
                      <span>{members[2]}</span>
                      <p>{role[0]}</p>
                    </div>
                  </li>
                  <li
                    className="d-flex bd-highligh"
                    onClick={() => {
                      setMemberPage(3);
                    }}
                  >
                    <div className="img_cont">
                      <img
                        src={profile[3]}
                        className="rounded-circle user_img"
                        alt="profile"
                      />
                    </div>
                    <div className="user_info">
                      <span>{members[3]}</span>
                      <p>{role[1]}</p>
                    </div>
                  </li>
                  <li
                    className="d-flex bd-highligh"
                    onClick={() => {
                      setMemberPage(4);
                    }}
                  >
                    <div className="img_cont">
                      <img
                        src={profile[4]}
                        className="rounded-circle user_img"
                        alt="profile"
                      />
                    </div>
                    <div className="user_info">
                      <span>{members[4]}</span>
                      <p>{role[1]}</p>
                    </div>
                  </li>
                </div>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
          <div className="col-md-8 col-xl-6 chat">
            <div
              className="card"
              style={{ display: memberPage === 0 ? "block" : "none" }}
            >
              <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src={profile[0]} className="rounded-circle user_img" />
                  </div>
                  <div className="user_info">
                    <span>{members[0]}</span>
                  </div>
                  <div className="video_cam">
                    <a href={githubUrl[0]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faGithub} />
                      </span>
                    </a>
                    <a href={gitlabUrl[0]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faGitlab} />
                      </span>
                    </a>
                    <a href={blogUrl[0]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faBlog} />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body msg_card_body">
                <div className="d-flex justify-content-start mb-4">
                  <div className="msg_container">{questions[0]}</div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_container_send">{suramSpeech[0]}</div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="msg_container">{questions[1]}</div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_container_send">{suramSpeech[1]}</div>
                </div>
              </div>
            </div>
            <div
              className="card"
              style={{ display: memberPage === 1 ? "block" : "none" }}
            >
              <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src={profile[1]} className="rounded-circle user_img" />
                  </div>
                  <div className="user_info">
                    <span>{members[1]}</span>
                  </div>
                  <div className="video_cam">
                    <a href={githubUrl[1]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faGithub} />
                      </span>
                    </a>
                    <a href={gitlabUrl[1]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faGitlab} />
                      </span>
                    </a>
                    <a href={blogUrl[1]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faBlog} />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body msg_card_body">
                <div className="d-flex justify-content-start mb-4">
                  <div className="msg_container">{questions[0]}</div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_container_send">{haramSpeech[0]}</div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="msg_container">{questions[1]}</div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_container_send">{haramSpeech[1]}</div>
                </div>
              </div>
              
            </div>
            <div
              className="card"
              style={{ display: memberPage == 2 ? "block" : "none" }}
            >
              <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src={profile[2]} className="rounded-circle user_img" />
                  </div>
                  <div className="user_info">
                    <span>{members[2]}</span>
                  </div>
                  <div className="video_cam">
                    <a href={githubUrl[2]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faGithub} />
                      </span>
                    </a>
                    <a href={gitlabUrl[2]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faGitlab} />
                      </span>
                    </a>
                    <a href={blogUrl[2]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faBlog} />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body msg_card_body">
                <div className="d-flex justify-content-start mb-4">
                  <div className="msg_container">{questions[0]}</div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_container_send">{boramSpeech[0]}</div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="msg_container">{questions[1]}</div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_container_send">{boramSpeech[1]}</div>
                </div>
              </div>
            </div>
            <div
              className="card"
              style={{ display: memberPage == 3 ? "block" : "none" }}
            >
              <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src={profile[3]} className="rounded-circle user_img" />
                  </div>
                  <div className="user_info">
                    <span>{members[3]}</span>
                  </div>
                  <div className="video_cam">
                    <a href={githubUrl[3]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faGithub} />
                      </span>
                    </a>
                    <a href={gitlabUrl[3]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faGitlab} />
                      </span>
                    </a>
                    <a href={blogUrl[3]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faBlog} />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body msg_card_body">
                <div className="d-flex justify-content-start mb-4">
                  <div className="msg_container">{questions[0]}</div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_container_send">{suyeonSpeech[0]}</div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="msg_container">{questions[1]}</div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_container_send">{suyeonSpeech[1]}</div>
                </div>
              </div>
              
            </div>
            <div
              className="card"
              style={{ display: memberPage == 4 ? "block" : "none" }}
            >
              <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src={profile[4]} className="rounded-circle user_img" />
                  </div>
                  <div className="user_info">
                    <span>{members[4]}</span>
                  </div>
                  <div className="video_cam">
                    <a href={githubUrl[4]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faGithub} />
                      </span>
                    </a>
                    <a href={gitlabUrl[4]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faGitlab} />
                      </span>
                    </a>
                    <a href={blogUrl[4]} target="_blank">
                      <span>
                        <FontAwesomeIcon icon={faBlog} />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body msg_card_body">
                <div className="d-flex justify-content-start mb-4">
                  <div className="msg_container">{questions[0]}</div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_container_send">{yunaSpeech[0]}</div>
                </div>
                <div className="d-flex justify-content-start mb-4">
                  <div className="msg_container">{questions[1]}</div>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <div className="msg_container_send">{yunaSpeech[1]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
