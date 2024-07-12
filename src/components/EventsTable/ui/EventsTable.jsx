import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLexicon } from 'lib/hooks/useTranslates'
import cls from './EventsTable.module.css'
import { EventsSelector } from '../../TeamProfileComponents/TeamProfileEvents/SelectEventsCard/EventsSelector/EventsSelector'

export const EventsTable = () => {
  const { t } = useTranslation()
  const l = useLexicon();
  return (
    <article className={cls.eventsTable}>
      <p className={cls.title}>{l(15)}</p>
      <EventsSelector />
    </article>
  )
}
