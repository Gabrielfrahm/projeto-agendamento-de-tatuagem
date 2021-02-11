import React from 'react';
import { GiVikingChurch } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import imag1 from '../../assets/1.jpg';
import imag2 from '../../assets/2.jpg';
import imag3 from '../../assets/3.jpg';
import imag4 from '../../assets/4.jpg';

import {
  Container,
  Header,
  Content,
  VideoWrapper,
  VideoHeader,
  VideoText,
  TextPresentation,
  ImgPresentation,
  Presentation,
  WorkContainer,
  Works,
  TitleWork,
  CardWork,
  Unity,
} from './styles';

const Landpage: React.FC = () => {
  return (
    <Container>
      <Header>
        <ul>
          <li>
            <Link to="/signin">Login</Link>
          </li>

          <li>
            <a href="#presentation">Sobre</a>
          </li>
          <li>
            <a href="#works">Works</a>
          </li>
          <li>
            <a href="/">Artists</a>
          </li>
        </ul>
      </Header>
      <VideoText>
        <span>
          <GiVikingChurch size={100} color="#b34d4b" />
        </span>
        <hr />
        <h1>Notre Dame</h1>
        <hr />
        <h2>Galeria</h2>
      </VideoText>

      <VideoWrapper>
        <VideoHeader>
          <video autoPlay loop muted>
            <track kind="captions" />
            <source src="/videos/videoHeader.webm" type="video/webm" />
          </video>
        </VideoHeader>
      </VideoWrapper>

      <Content>
        <Presentation id="presentation">
          <TextPresentation>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              ornare lectus sit amet est placerat in. Non blandit massa enim nec
              dui nunc mattis enim ut. Leo integer malesuada nunc vel risus
              commodo viverra maecenas accumsan. Ut sem nulla pharetra diam sit.
              Convallis tellus id interdum velit laoreet id donec ultrices.
              Scelerisque viverra mauris in aliquam sem fringilla ut morbi
              tincidunt.
            </p>
          </TextPresentation>
          <ImgPresentation />
        </Presentation>

        <WorkContainer id="works">
          <TitleWork>
            <h1>Trabalhos já realizados</h1>
          </TitleWork>

          <Works>
            <CardWork>
              <img src={imag1} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag1} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag1} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag1} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag1} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag1} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag1} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag1} alt="dale" />
            </CardWork>
          </Works>
        </WorkContainer>
        <Unity />
      </Content>
    </Container>
  );
};

export default Landpage;
