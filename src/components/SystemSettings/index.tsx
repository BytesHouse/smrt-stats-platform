import { settingsList, useSystemSettings } from './hooks';
import { IconComponent } from '../../assets/icons';

export const SystemSettings = () => {
  const {
    onChange,
    onSubmit,
    open,
    selectedApi,
    setOpen,
  } = useSystemSettings()

  return (
    open ? (
      <section className='settings-container'>
        <div className='header'>Select your API:</div>
        <form
          onSubmit={onSubmit}
          className='settings-container__form'
        >
          {settingsList.map((api) => (
            <div key={api}>
              <label htmlFor={api}>
                <input
                  type='radio'
                  id={api}
                  name='api'
                  value={api}
                  defaultChecked={selectedApi === api}
                  onChange={onChange}
                />
                {api}
              </label>
            </div>
          ))}
          <button type='submit'>Применить</button>
        </form>
        <div
          className='close'
          onClick={() => setOpen(false)}
        >
          x
        </div>
      </section>
    ) : (
      <div className='settings__collapsed' onClick={() => setOpen(true)}>
        <IconComponent.SYSTEM_SETTINGS />
      </div>
    )
  )
}
