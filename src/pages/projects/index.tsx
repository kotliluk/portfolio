import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import Layout from '@/components/common/layout'
import ProjectCard from '@/components/projects/card'
import { getEntries } from '@/logic/contentful'
import { useTranslation } from '@/logic/hooks/useTranslation'
import { Locale } from '@/types/locale'
import { Project, parseProject } from '@/types/project'


type ProjectsProps = {
  projects: Project[]
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async ({ locale }) => {
  const projects = await getEntries<Project>('project', parseProject, locale as Locale)

  return {
    props: {
      projects,
    },
    revalidate: 5,
  }
}

const Projects: FunctionComponent<ProjectsProps> = ({ projects }) => {
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