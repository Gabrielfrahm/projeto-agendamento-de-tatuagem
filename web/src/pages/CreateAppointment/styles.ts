import { shade } from 'polished';
import styled from 'styled-components';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

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
  @media (min-width: 640px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export const ProviderListContainer = styled.div`
  height: 112px;
`;

export const ProviderList = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;

  @media (min-width: 640px) {
    justify-content: center;
    align-items: center;
  }
`;

export const ProviderContainer = styled.button<ProviderContainerProps>`
  background: ${props => (props.selected ? '#b34d4b' : '#3e3b47')};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;

  border-radius: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const ProviderName = styled.h1<ProviderNameProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
`;

export const Calender = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 640px) {
    display: flex;

    flex: 1;
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
    background: ${shade(0.5, '#b34d4b')} !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const Schedule = styled.div``;

export const Section = styled.div``;

export const SectionContent = styled.div``;

export const Hour = styled.button<HourProps>`
  padding: 12px;
  background: ${props => (props.selected ? '#b34d4b' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.h1<HourTextProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-size: 16px;
`;
