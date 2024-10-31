import Layout from '@/components/common/layout'
import { useTranslation } from '@/logic/hooks/useTranslation'


export default function Home() {
  const { home: t } = useTranslation()

  return (
    <Layout title='Home'>
      {t.title}
    </Layout>
  )
}
