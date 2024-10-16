import BritainFlag from '@/components/common/icons/britain-flag.svg'
import CzechFlag from '@/components/common/icons/czech-flag.svg'
import { Locale } from '@/types/locale'


export const flagIconComponents: Record<Locale, JSX.ElementType> = {
  'cs': CzechFlag,
  'en': BritainFlag,
}
