import { FunctionComponent } from 'react'

import Layout from '@/components/common/layout'
import { useTranslation } from '@/logic/hooks/useTranslation'


const About: FunctionComponent = () => {
  const { about: t } = useTranslation()

  return (
    <Layout title='About'>
      {t.title}
    </Layout>
  )
}

export default About