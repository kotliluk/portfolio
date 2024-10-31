import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import { useTranslation } from '@/logic/hooks/useTranslation'
import { TimelineEventType } from '@/types/timelineEvent'


export type EventTypePickerValue = TimelineEventType | 'all'

const ALL_TYPES: EventTypePickerValue[] = ['technology', 'all', 'sport']

type EventTypePickerProps = {
  selectedType: EventTypePickerValue,
  onSelect: (type: EventTypePickerValue) => void,
}

const EventTypePicker: FunctionComponent<EventTypePickerProps> = ({ selectedType, onSelect }) => {
  const { timeline: { types: t } } = useTranslation()

  return (
    <div className={styles.picker}>
      {ALL_TYPES.map((type) => (
        <span
          key={type}
          className={`${styles.type} ${type === selectedType ? styles.selected : ''}`}
          onClick={() => onSelect(type)}
        >
          {t[type]}
        </span>
      ))}
    </div>
  )
}

export default EventTypePicker