import { type ReactElement } from 'react'
import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../../components/ui/dialog'
import { type ModalProps } from './types'

export default function Modal({
  modalContent,
  modalSubtitle,
  modalTitle,
  useCustomCloseButton,
  dialogTriggerChild,
  customDialogContentStyles = 'sm:max-w-[480px] space-y-6 px-6 py-6',
  open,
  onOpenChange,
}: ModalProps): ReactElement {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{dialogTriggerChild}</DialogTrigger>
      <DialogContent
        className={customDialogContentStyles}
        showCloseButton={useCustomCloseButton}
      >
        <DialogHeader className="flex items-start justify-between">
          <div className="mb-4">
            <DialogTitle className="text-[16px] font-medium leading-[110%] font-heading">
              {modalTitle}
            </DialogTitle>
            <DialogDescription>{modalSubtitle}</DialogDescription>
          </div>
          {useCustomCloseButton ? null : (
            <DialogClose className="absolute font-heading right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          )}
          {modalContent}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

Modal.defaultProps = {
  modalSubtitle: '',
  modalTitle: 'Adicionar Bloco',
  useCustomCloseButton: false,
  dialogTriggerChild: <></>,
}
