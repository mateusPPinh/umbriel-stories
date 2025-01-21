import { type DialogProps } from '@radix-ui/react-dialog'
import { type ReactNode } from 'react'

export interface ModalProps extends DialogProps {
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
