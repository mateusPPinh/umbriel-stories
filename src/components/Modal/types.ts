import { type Props as ReactModalProps } from 'react-modal'
import { type ReactNode } from 'react'

export interface ModalProps extends Omit<ReactModalProps, 'isOpen' | 'onRequestClose'> {
  modalTitle: string
  modalSubtitle?: string
  modalContent: ReactNode
  useCustomCloseButton: boolean
  dialogTriggerChild: ReactNode
  customDialogContentStyles?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  shouldBeSticy?: boolean
}
