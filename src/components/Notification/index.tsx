import { ReactNode } from 'react';
import { CloseButtonSc, NotificationContainerSc } from './styled';

type Props= {
  children: ReactNode,
  handleClose: () => void,
}

export const Notification = ({ children, handleClose }: Props) => (
  <NotificationContainerSc>
    <CloseButtonSc
      onClick={handleClose}
    >
      x
    </CloseButtonSc>
    {children}
  </NotificationContainerSc>
);
