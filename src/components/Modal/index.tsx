import { type ReactElement } from 'react'
import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { type ModalProps } from './types'

export default function Modal({
  modalContent,
  modalSubtitle,
  modalTitle,
  useCustomCloseButton,
  dialogTriggerChild,
  customDialogContentStyles = 'sm:max-w-[480px] space-y-6 px-6 py-6 h-full max-h-[700px]',
  open,
  onOpenChange,
  shouldBeSticy,
}: ModalProps): ReactElement {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{dialogTriggerChild}</DialogTrigger>
      <DialogContent
        className={customDialogContentStyles}
        showCloseButton={useCustomCloseButton}
      >
        <DialogHeader className="w-full">
          <div
            className={`mb-4 flex items-start justify-between ${
              shouldBeSticy ? 'sticky top-0 z-[100] h-auto' : ''
            }`}
          >
            <div className="flex flex-col items-start">
              <DialogTitle className="text-[16px] font-medium leading-[110%] font-heading">
                {modalTitle}
              </DialogTitle>
              <DialogDescription>{modalSubtitle}</DialogDescription>
            </div>
            <button
              onClick={() => {
                onOpenChange(false)
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </DialogHeader>

        <div className="overflow-y-scroll no-scrollbar max-h-[calc(100vh-150px)]">
          {modalContent}
        </div>
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
