import { type MouseEvent } from 'react'

interface MenuItem {
  title: string
  items: Array<{
    label: string
    childrenUniqueId: string
    onClick?: (event: MouseEvent<HTMLSpanElement>) => void
    children?: Array<{
      label: string
      onClick?: (event: MouseEvent<HTMLLIElement>) => void
    }>
  }>
}

export interface SideMenuProps {
  menu: MenuItem[]
  className?: string
  customListStyle?: string
  customTitleStyle?: string
  hiddeSideMenu?: boolean
}
