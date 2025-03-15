import { type ReactElement, useEffect } from 'react'
import { X } from 'lucide-react'
import ReactModal from 'react-modal'
import { type ModalProps } from './types'

// Função auxiliar para encontrar o elemento raiz
const findRootElement = (): HTMLElement => {
  const rootSelectors = ['#root', '#storybook-root', '#__next', 'body']
  for (const selector of rootSelectors) {
    const element = document.querySelector(selector)
    if (element) return element as HTMLElement
  }
  return document.body
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    position: 'relative' as const,
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    maxWidth: '480px',
    width: '100%',
    padding: '24px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'white'
  }
}

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
  style,
  ...rest
}: ModalProps): ReactElement {
  useEffect(() => {
    const rootElement = findRootElement()
    ReactModal.setAppElement(rootElement)
  }, [])

  return (
    <>
      <div onClick={() => onOpenChange(true)}>{dialogTriggerChild}</div>
      <ReactModal
        isOpen={open}
        onRequestClose={() => onOpenChange(false)}
        style={{
          ...customStyles,
          content: {
            ...customStyles.content,
            ...(style?.content || {})
          },
          overlay: {
            ...customStyles.overlay,
            ...(style?.overlay || {})
          }
        }}
        {...rest}
      >
        <div className={customDialogContentStyles}>
          <div className="w-full">
            <div
              className={`mb-4 flex items-start justify-between ${
                shouldBeSticy ? 'sticky top-0 z-[100] h-auto' : ''
              }`}
            >
              <div className="flex flex-col items-start">
                <h2 className="text-[16px] font-medium leading-[110%] font-heading">
                  {modalTitle}
                </h2>
                {modalSubtitle && (
                  <p className="text-sm text-gray-500">{modalSubtitle}</p>
                )}
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="hover:opacity-80 transition-opacity"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>

          <div className="overflow-y-auto no-scrollbar max-h-[calc(100vh-150px)]">
            {modalContent}
          </div>
        </div>
      </ReactModal>
    </>
  )
}

Modal.defaultProps = {
  modalSubtitle: '',
  modalTitle: 'Adicionar Bloco',
  useCustomCloseButton: false,
  dialogTriggerChild: <></>,
}
