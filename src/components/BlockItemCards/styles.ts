import styled from 'styled-components'

export const Container = styled.div`
  max-width: 432px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

export const BlockItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.gray100};
  padding: 16px;

  main {
    display: flex;
    flex-direction: column;

    span {
      font-family: ${props => props.theme.fonts.heading};
      line-height: 110%;
      font-weight: 500;
      font-size: 14px;
    }

    p {
      font-family: ${props => props.theme.fonts.heading};
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
