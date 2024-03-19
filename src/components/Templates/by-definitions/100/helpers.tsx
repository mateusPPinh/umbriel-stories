import { type ReactElement, type ReactNode } from 'react'
import Box from '../../../Boxes/Boxes'
import { type DefaultTheme } from 'styled-components'

interface ColumnProps {
  children: ReactNode
}

export const Column = ({ children }: ColumnProps): ReactElement => {
  return (
    <Box
      css={{
        flexDirection: 'column',
        width: '100%',
        textAlign: 'left',
        verticalAlign: 'top'
      }}
    >
      {children}
    </Box>
  )
}

interface ColumnColorProps {
  bgColor?: any | keyof DefaultTheme['colors']
  children: React.ReactNode
  minHeight?: number | string
  transparent?: boolean
  slot?: string
}

export const ColumnColor = ({
  children,
  bgColor,
  transparent
}: ColumnColorProps): ReactElement => {
  return (
    <Box
      css={{
        flexDirection: 'column',
        bgColor,
        py: transparent ?? false ? '0px' : 16,
        width: 'calc(100% - 32px)',
        mb: transparent === true ? '' : '',
        textAlign: 'left',
        verticalAlign: 'top'
      }}
    >
      {children}
    </Box>
  )
}
