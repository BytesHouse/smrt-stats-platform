import React, {
  FC,
  useEffect,
  useRef,
} from 'react';
import { IconComponent } from 'assets/icons';
import styles from './Modal.module.css';
import { Portal } from '../Portal/Portal';

interface ModalProps {
  children: React.ReactNode,
  onClose: () => void,
  open: boolean,
  title?: string,
}

export const Modal: FC<ModalProps> = ({
  children,
  onClose,
  open,
  title,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (modalRef.current
            && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener(
      'click',
      handleClickOutside,
      true,
    );

    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside,
        true,
      );
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!open) return null

  return (
    <Portal>
      <div className={styles.modalOverlay}>
        <div className={styles.modal} ref={modalRef}>
          <header>
            {title && <h3>{title}</h3>}
            <div className={styles.modalCloseBtn} onClick={onClose}>
              <IconComponent.CLOSE />
            </div>
          </header>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </Portal>

  )
}
