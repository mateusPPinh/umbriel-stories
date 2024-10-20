import { styled } from 'styled-components'

export const Container = styled.div`
  max-width: 432px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

export const BlockItem = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.gray100};
  padding: 16px;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.4s;

  &:hover,
  &:focus {
    box-shadow: none;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.lightBlue.lightBlue100};
    z-index: -1;
    transition: transform 0.4s;
    transform: translateX(-100%);
  }

  &:hover:before,
  &:focus:before {
    transform: translateX(0);
  }

  main {
    display: flex;
    flex-direction: column;
    z-index: 1;

    span + p {
      margin-top: 0.3rem;
    }

    span {
      font-family: 'Rubik Variable';
      line-height: 110%;
      font-weight: 500;
      font-size: 14px;
      text-align: start;
    }

    p {
      font-family: 'Rubik Variable';
      line-height: 110%;
      font-weight: 400;
      font-size: 12px;
      text-align: start;
    }
  }

  img {
    width: 84px;
    height: auto;
    z-index: 1;
  }
`
