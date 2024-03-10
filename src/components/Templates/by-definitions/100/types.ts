import { type ReactNode } from 'react'

interface Menu {
  title: string
  href: string
}

interface Footer {
  footer?: {
    title_top: string
    title_bottom: string
  }
}

interface Carrousel {
  layoutCarrousel?: {
    image_middle_desktop_path?: string
    image_mobile_path?: string
  }
}

export interface SlotDefinitions {
  bgColor: string
  children: ReactNode
  minHeight: [string, string]
  transparent: boolean
  genericMenu?: Menu[]
  genericFooter?: Footer[]
  genericCarrousel?: Carrousel[]
  template: 'Template100'
}
