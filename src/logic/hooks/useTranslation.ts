import { useLocale } from './useLocale'
import { Translation, translations } from '@/translations'


export const useTranslation = (): Translation => {
  const { locale } = useLocale()

  return translations[locale]
}
