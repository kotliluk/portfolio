import { FunctionComponent } from 'react'

import { EventTypePickerValue } from '../eventTypePicker'


export type YearInfo = Record<EventTypePickerValue, boolean> & {
  year: string
}

type YearCardProps = {
  yearInfo: YearInfo
  selectedEventType: EventTypePickerValue
}

const YearCard: FunctionComponent<YearCardProps> = ({ yearInfo, selectedEventType }) => {
  return yearInfo[selectedEventType] ? (<h2>{yearInfo.year}</h2>) : null
}

export default YearCard