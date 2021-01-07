// import { create } from 'domain';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 }

 body{
  background: #191919;
  color: #fff;
  -webkit-font-smooth: antialiased;
}

body,input,button,a{
  font-family: 'Big Shoulders Stencil Display', cursive ,' serif';
  font-size: 16px;
}


h1, h2 , h3, h4, h5, h6, strong{
  font-weight: 500;
}

button{
  cursor: pointer;
}


`;
