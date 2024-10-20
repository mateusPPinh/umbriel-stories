import { css, styled } from 'styled-components'

const Container = styled.div<{
  $isSubmenuChildrenOpen?: boolean
  $hiddeSideMenu?: boolean
}>`
  width: 100%;
  max-width: 300px;
  background: ${(props) => props.theme.colors.gray50};
  height: calc(100vh - 0px);
  padding: 1.5rem;
  border-right: 1px solid #e4e4e7;
  display: ${(props) => (props.$hiddeSideMenu ? 'none' : '')};
  overflow-y: auto;

  ${({ $hiddeSideMenu }) => {
    if ($hiddeSideMenu === true) {
      return css`
        transform: translateY(-20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
        pointer-events: none;
      `
    }
  }}

  ul.submenu {
    padding-left: 20px;
    display: ${(props) => (props.$isSubmenuChildrenOpen ? '' : 'none')};

    ${({ $isSubmenuChildrenOpen }) => {
      if ($isSubmenuChildrenOpen) {
        return css`
          max-height: 0px;
          padding-left: 20px;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        `
      }
    }}

    li.submenu-item {
      margin: 0.4rem 0;
      padding: 0;
      margin-left: 10px;
      font-family: ${(props) => props.theme.fonts.heading};
      font-size: 1rem;
      list-style: square;
      visibility: visible;
      transition: opacity underline 0.2s, margin 0.2s ease;
      cursor: pointer;
      letter-spacing: 0 !important;
      color: #27272a;

      &:hover {
        opacity: 0.7;
        text-decoration: underline;
      }
    }
  }

  ul.submenu {
    padding-left: 20px;
    display: none;
  }

  ul.submenu.open {
    opacity: 1;
    display: block;
    transition: max-height 0.3s ease, opacity 0.3s ease;
    height: auto;
    margin-bottom: -2rem;
  }

  .highlight {
    font-family: ${(props) => props.theme.fonts.heading};
    line-height: 110%;
    color: ${(props) => props.theme.colors.gray800};
    font-size: 16px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.lightBlue.lightBlue800};
  }

  .isChildren {
    width: 100%;
    background-color: #e0f2fe;
    padding: 0.5rem;
    border-radius: 2px;
    margin-bottom: -1rem;
  }
  ul.submenu.open .submenu-item {
    margin: 1rem 0;
    padding: 0;
    margin-left: 5px;
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: 1rem;
    list-style: square;
    visibility: visible;
    transition: opacity underline 0.2s, margin 0.2s ease;
    cursor: pointer;
    color: #27272a;

    &:hover {
      opacity: 0.7;
      text-decoration: underline;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    padding-top: 24px;
    padding-bottom: 24px;
  }

  li {
    font-family: ${(props) => props.theme.fonts.heading};
    line-height: 110%;
    letter-spacing: 1.28px;
    color: ${(props) => props.theme.colors.gray500};
    font-size: 12px;
  }

  span {
    margin: 0.8rem 0;
    margin-left: 10px;
    font-family: ${(props) => props.theme.fonts.heading};
    line-height: 110%;
    color: ${(props) => props.theme.colors.gray800};
    font-size: 16px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
`

export { Container }
