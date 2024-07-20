import styled from 'styled-components'

export const ImageBlur = styled.img<{ $isLoading: boolean }>`
  filter: ${(props) => ((props.$isLoading) ? 'blur(20px)' : 'blur(0)')};
  transition: filter 1s linear;
`
