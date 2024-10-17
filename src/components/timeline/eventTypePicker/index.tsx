import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import { useLocale } from '@/logic/hooks/useLocale'
import { Locale } from '@/types/locale'
import { TimelineEventType } from '@/types/timelineEvent'


export type EventTypePickerValue = TimelineEventType | 'all'

const ALL_TYPES: EventTypePickerValue[] = ['technology', 'all', 'sport']

const TRANSLATIONS: Record<Locale, Record<EventTypePickerValue, string>> = {
  'cs': {
    'technology': 'Technologie',
    'all': 'Vše',
    'sport': 'Sport',
  },
  'en': {
    'technology': 'Technology',
    'all': 'All',
    'sport': 'Sport',
  },
}

type EventTypePickerProps = {
  selectedType: EventTypePickerValue,
  onSelect: (type: EventTypePickerValue) => void,
}

const EventTypePicker: FunctionComponent<EventTypePickerProps> = ({ selectedType, onSelect }) => {
  const { locale } = useLocale()

  return (
    <div className={styles.picker}>
      {ALL_TYPES.map((type) => (
        <span
          key={type}
          className={`${styles.type} ${type === selectedType ? styles.selected : ''}`}
          onClick={() => onSelect(type)}
        >
          {TRANSLATIONS[locale][type]}
        </span>
      ))}
    </div>
  )
}

export default EventTypePicker