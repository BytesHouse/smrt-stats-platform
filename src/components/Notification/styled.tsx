import styled from 'styled-components/macro';

export const NotificationContainerSc = styled.div`
  z-index: 120;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 250px;
  color: white;
  background: #171f2f;
  border: 1px solid #ffffff;
  border-radius: 10px;
  padding: 30px;
`;

export const CloseButtonSc = styled.div`
  position: absolute;
  right: 7px;
  top: 7px;
  width: 20px;
  height: 20px;
  border: 0.5px solid white;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const DownloadNotificationContainerSc = styled.div`
  z-index: 120;
  position: absolute;
  right: 10;
  bottom: 10;
  width: 250px;
  color: white;
  background: #171f2f;
  border: 1px solid #ffffff;
  border-radius: 10px;
  padding: 30px;
`;

