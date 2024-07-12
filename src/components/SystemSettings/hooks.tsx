import {
  ChangeEvent,
  FormEvent,
  useState,
} from 'react';
import { SELECTED_API } from '../../config/api'

export const settingsList = ['development', 'pos_development', 'demo_development', 'new_development', 'production']

export const useSystemSettings = () => {
  const [open, setOpen] = useState(false)

  const [selectedApi, setSelectedApi] = useState(
    localStorage.getItem(SELECTED_API) ?? settingsList[0],
  )

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (selectedApi === localStorage.getItem(SELECTED_API)) {
      setOpen(false)
      return
    }

    localStorage.setItem(SELECTED_API, selectedApi)
    window.location.reload()
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedApi(e.target.value)
  }

  return {
    onChange,
    onSubmit,
    open,
    selectedApi,
    setOpen,
  }
}
