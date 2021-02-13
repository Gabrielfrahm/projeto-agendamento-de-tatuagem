import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 25px 0;
  background: #201e1e;

  @media (max-width: 600px) {
    padding: 30px 0;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 1000px) {
    margin: 0 auto;
    display: flex;
    align-items: center;

    button {
      margin-right: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  @media (max-width: 600px) {
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    p {
      color: #fff;
      font-weight: 300;
    }

    a {
      text-decoration: none;
      color: #b34d4b;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;

  @media (max-width: 640px) {
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export const Schedule = styled.div`
  @media (min-width: 300px) {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      font-size: 30px;
    }

    p {
      margin-top: 8px;
      color: #b34d4b;
      display: flex;
      align-items: center;
      font-weight: 500;

      span {
        display: flex;
        align-items: center;
      }

      span + span::before {
        content: '';
        width: 5px;
        height: 1px;
        background: #b34d4b;
        margin: 0 8px;
      }
    }
  }

  @media (min-width: 640px) {
    margin-right: 80px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      font-size: 36px;
    }

    p {
      margin-top: 8px;
      color: #b34d4b;
      display: flex;
      align-items: center;
      font-weight: 500;

      span {
        display: flex;
        align-items: center;
      }

      span + span::before {
        content: '';
        width: 5px;
        height: 1px;
        background: #b34d4b;
        margin: 0 8px;
      }
    }
  }
`;

export const NextAppointment = styled.div`
  @media (min-width: 300px) {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > strong {
      color: #727272;
      font-size: 20px;
      font-weight: 300;
    }

    div {
      background: #fff;
      display: flex;
      align-items: center;
      padding: 16px 24px;
      border-radius: 10px;
      margin-top: 24px;
      position: relative;

      &::before {
        position: absolute;
        height: 80px;
        width: 3px;
        left: 0;
        top: 2%;
        content: '';
        background: #b34d4b;
      }

      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
      }

      strong {
        margin-left: 50px;
        margin-right: 24px;
        color: #b34d4b;
        font-size: 20px;
      }

      span {
        margin-left: auto;
        display: flex;
        align-items: center;
        color: #999591;

        svg {
          color: #b34d4b;
          margin-right: 8px;
        }
      }
    }
  }
`;

export const ContentSection = styled.div`
  /* @media (min-width: 640px) {
    position: absolute;
    bottom: 60px;
  } */
`;

export const Section = styled.section`
  display: block;
  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
    margin-top: 16px;
  }

  > p {
    color: #999591;
  }

  @media (max-width: 640px) {
    > strong {
      color: #999591;
      font-size: 20px;
      line-height: 26px;
      border-bottom: 1px solid #3e3b47;
      display: block;
      padding-bottom: 16px;
      margin-bottom: 16px;
      margin-top: 16px;
    }

    > p {
      color: #999591;
    }
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    /* margin-left: 12px; */
    display: flex;
    align-items: center;
    color: #999591;
    width: 70px;
  }

  svg {
    color: #b34d4b;
    margin-right: 8px;
  }

  div {
    flex: 1;
    background: #504642;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    /* margin-left: 24px; */
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  strong {
    margin-left: 24px;
    margin-right: 24px;
    color: #fff;
    font-size: 20px;
  }
`;

export const Calender = styled.aside`
  width: 300px;

  @media (max-width: 640px) {
    display: flex;

    flex: 1;
    margin-top: 20px;
  }
  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #b34d4b;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 8px;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    color: #666360;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #b34d4b;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#b34d4b')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #b34d4b !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
