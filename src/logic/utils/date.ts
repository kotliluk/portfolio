import { translations } from '@/translations'
import { Locale } from '@/types/locale'

export type MonthNumberMM = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'

export const translateMonth = (month: MonthNumberMM, locale: Locale): string => {
  return translations[locale].common.months[month]
}