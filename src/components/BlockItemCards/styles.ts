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
  transition: box-shadow 0.4s;

  &:hover,
  &:focus {
    box-shadow: inset 15em 0 0 0 rgba(246, 246, 246, 0.8);
  }

  main {
    display: flex;
    flex-direction: column;

    span {
      font-family: 'Rubik Variable';
      line-height: 110%;
      font-weight: 500;
      font-size: 14px;
    }

    p {
      font-family: 'Rubik Variable';
      line-height: 110%;
      font-weight: 400;
      font-size: 12px;
    }
  }

  img {
    width: 84px;
    height: auto;
  }
`
