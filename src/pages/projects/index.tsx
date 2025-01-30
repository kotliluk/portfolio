import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import Layout from '@/components/common/layout'
import ProjectCard from '@/components/projects/card'
import { createSimpleRichText } from '@/logic/contentful/richText'
import { useTranslation } from '@/logic/hooks/useTranslation'
import { Project } from '@/types/project'


const projects: Project[] = [
  {
    id: '1',
    locale: 'cs',
    title: 'Tetronik - QTir, QTCloud',
    fromDate: '2021-10-01',
    toDate: '2023-12-01',
    stack: ['TypeScript', 'React', 'Node.js', 'GraphQL', 'PostgreSQL'],
    text: createSimpleRichText(['FE (React) a BE (Node.js) vývojář na projektu správy vozidel v logistických areálech.']),
    link: 'https://www.qtir.cz/',
    color: 'red',
  },
  {
    id: '2',
    locale: 'cs',
    title: 'Karla - Virtuel',
    fromDate: '2024-10-01',
    toDate: '2025-02-01',
    stack: ['TypeScript', 'JavaScript', 'React'],
    text: createSimpleRichText(['FE vývojář na projektu správy generatoru elektriny.']),
    link: 'https://www.virtuel.cz/',
    color: 'green',
  },
]

const Projects: FunctionComponent = () => {
  const { projects: t } = useTranslation()

  return (
    <Layout title={t.title}>
      <div className={styles.body}>
        <div className={styles.header}>
          <h1>
            {t.title}
          </h1>
        </div>

        <div className={styles.cards}>
          {projects.map((project) => (<ProjectCard key={project.id} project={project} />))}
        </div>
      </div>
    </Layout>
  )
}

export default Projects