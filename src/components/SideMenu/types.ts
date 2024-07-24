import { type MouseEvent } from 'react'

interface MenuItem {
  title: string
  items: Array<{
    label: string
    onClick?: (event: MouseEvent<HTMLSpanElement>) => void
  }>
}

export interface SideMenuProps {
  menu: MenuItem[]
  className?: string
}
