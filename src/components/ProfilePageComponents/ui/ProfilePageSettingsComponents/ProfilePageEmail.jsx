import { useSelector } from 'react-redux';
import { EmailIcon } from 'assets/icons/EmailIcon';
import cls from './ProfilePageContent.module.css'

export const ProfilePageEmail = () => {
  const email = useSelector((state) => state.user.userProfile.email);

  return (
    <div className={cls.profilePageEmail}>
      <b>Email</b>
      <div className={cls.emailContainer}>
        <EmailIcon />
        <p className={cls.email}>{email}</p>
      </div>
    </div>
  )
}
