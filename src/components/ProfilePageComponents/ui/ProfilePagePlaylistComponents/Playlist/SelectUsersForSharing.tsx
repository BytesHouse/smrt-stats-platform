/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import { IconComponent } from 'assets/icons';
import {
  FC,
  useState,
} from 'react'
import styles from './Playlist.module.css';

export interface User {
  email: string,
  first_name: string,
  id: number,
  last_name: string,
  username: string,
}

interface SelectUsersForSharingProps {
  selectedEmails: Array<string>,
  setSelectedEmails: (emails: Array<string>) => void,
}

export const SelectUsersForSharing: FC<SelectUsersForSharingProps> = ({
  selectedEmails,
  setSelectedEmails,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const selectEmail = (email: string) => {
    try {
      const isSelected = selectedEmails.includes(email);
      if (isSelected) {
        const newEmails = selectedEmails.filter((item) => item !== email);
        setSelectedEmails(newEmails);
      } else {
        const newEmails = [...selectedEmails, email];
        setSelectedEmails(newEmails);
      }
    } catch (e) {
      console.log('select email error', e);
    }
  }

  const validateEmail = (email: string) => email.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  const onChangeEmail = (email: string) => {
    setIsValidEmail(true);
    setInputValue(email);
  }

  const addNoUserEmail = () => {
    if (inputValue?.length > 0) {
      if (validateEmail(inputValue)) {
        setIsValidEmail(true);
        selectEmail(inputValue);
        setInputValue('');
      } else {
        setIsValidEmail(false);
      }
    }
  }

  return (
    <div className={styles.selectContainer}>
      <input type='search' value={inputValue} placeholder='Type user email to add' onChange={(e) => onChangeEmail(e.target.value)} />
      {!isValidEmail && <span className={styles.errMsg}>{inputValue} is not a valid email</span>}
      <div
        className={styles.addBtn}
        onClick={addNoUserEmail}
      >
        Add email
      </div>
      <div className={styles.selectedEmails}>
        <b>Selected emails</b>
        {selectedEmails.length === 0 && <div>No user selected</div>}
        {selectedEmails?.map((email) => (
          <div key={email}>
            <span>{email}</span>
            <div className={styles.selectedEmailsDelete} onClick={() => selectEmail(email)}>
              <IconComponent.CLOSE />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
