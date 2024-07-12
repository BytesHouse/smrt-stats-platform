import {
  ReactNode, useRef,
} from 'react';
import {
  ScModalContent,
  ScModal,
  ScModalHeader,
  ScModalCloseButton,
  ScModalFooter,
  ScModalFooterButton,
} from 'components/Modal/styled';

// import { useOutsideClick } from '../../hooks';

type TModal = {
  children: ReactNode,
  className?: string,
  footer?: ReactNode,
  onClose: () => void,
  withClose?: boolean,
}

export const Modal = ({
  children,
  className,
  footer,
  onClose,
  withClose,
}: TModal) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  // TODO: посмотреть почему перестает работать выделение в селекте, когда включен хук
  // useOutsideClick({ handleClick: onClose, ref: modalRef })
  return (
    <ScModal
      ref={modalRef}
      className={className}
    >
      <ScModalHeader>
        {withClose
             && (
               <ScModalCloseButton onClick={onClose}>
                 x
               </ScModalCloseButton>
             )}
      </ScModalHeader>
      <ScModalContent>
        {children}
      </ScModalContent>
      {footer && (
        <ScModalFooter>
          <ScModalFooterButton>
            Accept
          </ScModalFooterButton>
        </ScModalFooter>)}
    </ScModal>
  )
}
