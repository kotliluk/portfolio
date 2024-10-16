import { useRouter } from 'next/router'

import { Locale } from '@/types/locale'


export type UseLocaleResult = {
  locale: Locale,
  locales: Locale[],
}

export const useLocale = (): UseLocaleResult => {
  const { locale, locales } = useRouter()

  return { locale, locales } as UseLocaleResult
}
