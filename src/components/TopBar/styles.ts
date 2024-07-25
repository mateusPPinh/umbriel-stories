import styled from 'styled-components'

const Container = styled.div<{ $variant: 'topbarArticle' | 'topbarDefault' }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &.sticky {
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  nav {
    display: flex;
    align-items: center;
    margin-left: 8px;

    .topbarDefaultContainer {
      margin-left: 1rem;

      img {
        width: 100px;
        height: auto;
      }
    }

    button {
      display: flex;
      align-items: center;
      flex-direction: row;
      color: ${(props) => props.theme.colors.gray800};
      font-size: 1rem;
      line-height: 110%;
      font-weight: 500;
      background: none;
      border: none;
      cursor: pointer;

      > svg {
        width: 16px;
        height: 16px;
      }

      :last-child {
        margin-left: 8px;
        font-family: ${(props) => props.theme.fonts.heading};
      }
    }
  }

  .central-content {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  div {
    display: flex;
    align-items: center;

    button + button {
      margin-left: 8px;
      margin-right: 8px;
    }
  }
`

export { Container }
