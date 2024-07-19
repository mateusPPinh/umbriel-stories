import { styled } from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 300px;
  background: ${props => props.theme.colors.gray50};
  height: 100vh;
  padding: 1.5rem;

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    padding-top: 24px;
    padding-bottom: 24px;
  }

  li {
    font-family: 'Rubik Variable';
    line-height: 110%;
    letter-spacing: 1.28px;
    color: ${props => props.theme.colors.gray500};
    font-size: 12px;
  }

  span {
    margin: 0.8rem 0;
    margin-left: 10px;
    font-family: 'Rubik Variable';
    line-height: 110%;
    color: ${props => props.theme.colors.gray800};
    font-size: 16px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7; 
    }
  }
`

export { Container }
