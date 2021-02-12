import React from 'react';
import { GiVikingChurch } from 'react-icons/gi';
import { FiInstagram, FiFacebook, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import imag1 from '../../assets/1.jpg';
import imag2 from '../../assets/2.jpg';
import imag3 from '../../assets/3.jpg';
import imag4 from '../../assets/4.jpg';
import imag5 from '../../assets/5.jpeg';
import imag6 from '../../assets/6.jpeg';
import imag7 from '../../assets/teste.gif';
import imag8 from '../../assets/teste2.gif';
import gui from '../../assets/gui.jpg';
import yas from '../../assets/yasmin.jpg';
import yuri from '../../assets/yuri.jpg';

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
  ArtistsContainer,
  ArtistsText,
  Artists,
  Artist,
  ArtistImg,
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
            <a href="#artists">Artists</a>
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
            <source src="/videos/video.webm" type="video/webm" />
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
              <img src={imag2} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag3} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag4} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag5} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag6} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag7} alt="dale" />
            </CardWork>

            <CardWork>
              <img src={imag8} alt="dale" />
            </CardWork>
          </Works>
        </WorkContainer>

        <ArtistsText id="artists">
          <h1>Artistas</h1>
        </ArtistsText>

        <ArtistsContainer>
          <Artists>
            <Artist>
              <ArtistImg>
                <img src={gui} alt="dale" />
                <a href="https://www.instagram.com/rip_gui/" target="blank">
                  <FiInstagram size={25} color="#fff" />
                </a>
                <a href="https://www.facebook.com/SKAZI.18" target="blank">
                  <FiFacebook size={25} color="#fff" />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=551998999-4190&text= Ola Guilherme!, Gostaria de fazer um orçamento"
                  target="blank"
                >
                  <FiPhone size={25} color="#fff" />
                </a>
                <h2>Guilherme Oliveira</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </ArtistImg>
            </Artist>
            <Artist>
              <ArtistImg>
                <img src={yas} alt="dale" />
                <a href="https://www.instagram.com/_limite._/" target="blank">
                  <FiInstagram size={25} color="#fff" />
                </a>
                <a href="https://www.facebook.com/yasmin.boer" target="blank">
                  <FiFacebook size={25} color="#fff" />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=551999977-8220&text= Ola Yasmin!, Gostaria de fazer um orçamento"
                  target="blank"
                >
                  <FiPhone size={25} color="#fff" />
                </a>
                <h2>Yasmin Boer</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </ArtistImg>
            </Artist>
            <Artist>
              <ArtistImg>
                <img src={yuri} alt="dale" />
                <a
                  href="https://www.instagram.com/Yuriferreira.ink/?fbclid=IwAR1CbAoV01YVeT_BWBC8sOwarSdEZEK3UqvU6_ZOyNjVd7rHHElQsdLn1Jo"
                  target="blank"
                >
                  <FiInstagram size={25} color="#fff" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100025007539049"
                  target="blank"
                >
                  <FiFacebook size={25} color="#fff" />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=551999487-1958&text= Ola Yuri!, Gostaria de fazer um orçamento"
                  target="blank"
                >
                  <FiPhone size={25} color="#fff" />
                </a>
                <h2>Yuri Ferreira</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </ArtistImg>
            </Artist>
          </Artists>
        </ArtistsContainer>
      </Content>
    </Container>
  );
};

export default Landpage;
