import { useRouter } from 'next/router'
import { FunctionComponent, useCallback, useEffect } from 'react'

import styles from './index.module.scss'
import { useTranslation } from '@/logic/hooks/useTranslation'
import { EventTypePickerValue, useEventTypeQueryParam } from '@/types/timelineEvent'


const ALL_TYPES: EventTypePickerValue[] = ['technology', 'all', 'sport']

const EventTypePicker: FunctionComponent = () => {
  const router = useRouter()
  const selectedEventType = useEventTypeQueryParam()

  const { timeline: { types: t } } = useTranslation()

  const handleClick = useCallback((type: EventTypePickerValue) => {
    router.push({
      query: type === 'all' ? {} : { events: type }
    })
  }, [router])

  useEffect(() => {
    if (!!router.query.events && router.query.events !== 'technology' && router.query.events !== 'sport') {
      handleClick('all')
    }
  }, [router.query.events, handleClick])

  return (
    <div className={styles.picker}>
      {ALL_TYPES.map((type) => (
        <span
          key={type}
          className={`${styles.type} ${type === selectedEventType ? styles.selected : ''}`}
          onClick={() => handleClick(type)}
        >
          {t[type]}
        </span>
      ))}
    </div>
  )
}

export default EventTypePicker