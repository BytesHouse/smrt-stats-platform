import { ReactNode } from 'react';
import { DownloadNotificationContainerSc } from './styled';

type Props= {
  children: ReactNode,
}

export const DownloadNotification = ({ children }: Props) => (
  <DownloadNotificationContainerSc>
    {children}
  </DownloadNotificationContainerSc>
);
