import { Locale } from "@/types/locale"
import { useRouter } from "next/router"


export type UseLocaleResult = {
  locale: Locale,
  locales: Locale[],
}

export const useLocale = (): UseLocaleResult => {
  const { locale, locales } = useRouter()

  return { locale, locales } as UseLocaleResult
}
