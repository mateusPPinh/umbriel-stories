import { type ReactNode } from 'react'

export interface ModalProps {
  modalTitle: string
  modalSubtitle?: string
  modalContent: ReactNode
  useCustomCloseButton: boolean
  dialogTriggerChild: ReactNode
  customDialogContentStyles?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}
