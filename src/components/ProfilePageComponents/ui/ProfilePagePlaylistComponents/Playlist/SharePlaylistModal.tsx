/* eslint-disable no-console */
/* eslint-disable no-alert */
import { $api } from 'config/api';
import { FC, useState } from 'react'
import { Spinner } from 'components/ui';
import { SelectUsersForSharing } from './SelectUsersForSharing';
import styles from './Playlist.module.css';

interface SharePlaylistModalProps {
  onCloseModal: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  playlist: any,
}

export const SharePlaylistModal: FC<SharePlaylistModalProps> = ({ onCloseModal, playlist }) => {
  const [selectedEmails, setSelectedEmails] = useState<Array<string>>([]);

  const [loadingSharing, setLoadingSharing] = useState(false);

  const sharePlaylist = async () => {
    setLoadingSharing(true)
    try {
      const response = await $api.post('users/share/', { email: selectedEmails, playlist: playlist.id })
      if (response.status === 200) {
        alert('You have successfully shared your playlist');
        $api.post('/users/activity/', {
          entity_id: playlist.id,
          link_to: '',
          type: 5,
        })
        onCloseModal();
      }
    } catch (e) {
      console.log('share playlist error', e)
      alert('An error has occurred, we can\'t share the playlist');
    } finally {
      setLoadingSharing(false);
    }
  }

  return (
    <div className={styles.shareModalContent}>
      <SelectUsersForSharing
        selectedEmails={selectedEmails}
        setSelectedEmails={(emails: Array<string>) => setSelectedEmails(emails)}
      />
      <div
        className={`${styles.shareBtn} ${selectedEmails?.length === 0 ? styles.disabledBtn : styles.activeBtn}`}
        onClick={sharePlaylist}
      >
        {
          loadingSharing ? <Spinner size='small' /> : <span>Share playlist</span>
        }

      </div>
    </div>
  )
}
