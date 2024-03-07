import styled from 'styled-components';
import ThemedStyledProps from 'styled-components';
import { TextProps } from './types';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextWrapper = styled.span<{ color?: keyof Theme['colors']['base'] }>`
  color: ${({ color, theme }) => color ? theme.colors.base[color] : theme.colors.base.black};
  // ...other styles
`;