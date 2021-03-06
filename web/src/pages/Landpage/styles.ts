import styled from 'styled-components';
import { shade } from 'polished';

import imag from '../../assets/landpage.jpg';

export const Container = styled.div`
  justify-content: center;
  overflow-x: hidden;
`;

export const Header = styled.div`
  /* position: fixed; */
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b34d4b;

  width: 100%;
  height: 50px;
  z-index: 2;
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  li {
    font-size: 18px;

    display: inline;

    & + li {
      margin-left: 50px;
    }
  }

  a {
    font-weight: 500;
    text-decoration: none;
    letter-spacing: 1px;
    color: #fff;

    &:hover {
      color: ${shade(0.2, '#f2f2f2')};
    }
  }
`;

export const VideoWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  /* height: 100vh; */
  overflow: hidden;
  z-index: -1;

  @media (max-width: 1300px) {
    margin: 0;
    padding: 0;
    width: 100vw;
    /* height: 60vh; */
    overflow: hidden;
    z-index: -1;
  }

  @media (max-width: 1000px) {
    margin: 0;
    padding: 0;
    width: 100vw;
    /* height: 60vh; */
    overflow: hidden;
    z-index: -1;
  }

  @media (max-width: 600px) {
    margin: 0;
    padding: 0;
    width: 100vw;
    /* height: 28vh; */
    overflow: hidden;
    z-index: -1;
  }
`;

export const VideoHeader = styled.div`
  video {
    margin: 0;
    padding: 0;
    width: 100%;

    overflow: hidden;
    filter: grayscale(100%);
  }
`;

export const VideoText = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  align-items: center;
  position: absolute;
  z-index: 1;

  hr {
    margin: 5px 10px;
    height: 50px;
    /* width: 300px; */
  }
  h1 {
    font-size: 80px;
    font-weight: 500;
  }

  h2 {
    font-weight: 300;
    color: #b34d4b;
    font-size: 30px;
  }

  @media (max-width: 1300px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 60%;
    z-index: 1;

    span {
    }

    h1 {
      font-weight: 500;
      font-size: 60px;
    }

    hr {
      margin: 5px 10px;
      height: 30px;
    }

    h2 {
      font-weight: 300;
      color: #b34d4b;
      font-size: 30px;
    }
  }

  @media (max-width: 1000px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 50%;
    z-index: 1;

    span {
      transform: scale(0.8);
    }

    h1 {
      font-weight: 500;
      font-size: 40px;
    }

    hr {
      margin: 5px 10px;
      height: 30px;
    }

    h2 {
      font-weight: 300;
      color: #b34d4b;
      font-size: 30px;
    }
  }

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 30%;
    z-index: 1;

    span {
      display: none;
    }

    h1 {
      font-weight: 500;
      font-size: 30px;
    }

    hr {
      display: none;
    }

    h2 {
      font-weight: 300;
      color: #b34d4b;
      font-size: 20px;
    }
  }
`;

export const Content = styled.div`
  overflow: hidden;
`;

export const Presentation = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  @media (max-width: 1000px) {
    height: 100vh;
  }

  @media (max-width: 600px) {
    height: 100vh;
  }
`;

export const TextPresentation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;

  p {
    font-size: 30px;
    padding: 50px;
    text-align: justify;
  }

  @media (max-width: 1000px) {
    width: 100%;
    max-width: 1000px;
  }

  @media (max-width: 600px) {
    width: 100%;

    p {
      font-size: 25px;
      padding: 50px;
      text-align: justify;
    }
  }
`;

export const ImgPresentation = styled.div`
  flex: 1;
  background: url(${imag}) no-repeat center;
  background-size: cover;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const WorkContainer = styled.div`
  /* height: 100vh; */
  overflow: hidden;
`;

export const TitleWork = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  h1 {
    margin: 16px;
  }
`;

export const Works = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-left: 80px;
  margin-top: 84px;

  @media (max-width: 1360px) {
    margin-top: 10px;
    margin-left: 100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 1000px) {
    margin-top: 10px;
    margin-left: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    margin-top: 10px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const CardWork = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background: #b34d4b;
  margin-left: 30px;
  margin-bottom: 45px;

  img {
    width: 300px;
    height: 300px;
    border-radius: 10px;
    margin-top: 5px;
    margin-left: 10px;
  }

  @media (max-width: 600px) {
    width: 250px;
    height: 250px;
    border-radius: 10px;
    background: #b34d4b;
    margin-left: 30px;
    margin-bottom: 45px;

    img {
      width: 250px;
      height: 250px;
      border-radius: 10px;
      margin-top: 5px;
      margin-left: 10px;
      margin-bottom: 45px;
    }
  }
`;

export const ArtistsText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b34d4b;
  h1 {
    margin: 16px;
  }
`;

export const ArtistsContainer = styled.div``;

export const Artists = styled.div`
  /* height: 100vh; */

  background-color: #b34d4b;

  @media (max-width: 600px) {
  }
`;

export const Artist = styled.div`
  display: flex;
  /* justify-content: space-between; */
  padding: 55px;
  /* margin-bottom: 20px; */
  background: ${shade(0.2, '#b34d4b')};
  margin-bottom: 10px;

  h2 {
    font-size: 35px;
    font-weight: 500;
    margin: 5px 0;
  }

  p {
    font-size: 25px;
    font-weight: 300;
  }

  @media (max-width: 1000px) {
    display: flex;
    /* justify-content: space-between; */
    padding: 50px;
    /* margin-bottom: 20px; */
    margin-bottom: 0;
    background: transparent;
    h2 {
      font-size: 30px;
      font-weight: 500;
      margin: 5px 0;
    }

    p {
      font-size: 20px;
      font-weight: 300;
    }
  }

  @media (max-width: 600px) {
    display: flex;
    /* justify-content: space-between; */
    padding: 25px;
    /* margin-bottom: 20px; */

    h2 {
      font-size: 20px;
      font-weight: 500;
      margin: 5px 0;
    }

    p {
      font-size: 15px;
      font-weight: 300;
    }
  }
`;

export const ArtistImg = styled.div`
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;
