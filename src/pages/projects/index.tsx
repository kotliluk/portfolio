import { FunctionComponent } from 'react'

import Layout from '@/components/common/layout'
import { useTranslation } from '@/logic/hooks/useTranslation'


const Projects: FunctionComponent = () => {
  const { projects: t } = useTranslation()

  return (
    <Layout title={t.title}>
      {t.title}
    </Layout>
  )
}

export default Projects