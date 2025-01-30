import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import CalendarIcon from '@/components/common/icons/calendar-16.svg'
import ChainLinksIcon from '@/components/common/icons/chain-links-16.svg'
import CubeIcon from '@/components/common/icons/cube-16.svg'
import { MonthNumberMM, translateMonth } from '@/logic/utils/date'
import { DateString } from '@/types/date'
import { Locale } from '@/types/locale'
import { Project } from '@/types/project'


const formatDate = (date: DateString, locale: Locale): string => {
  const [y, m] = (date as string).split('-')
  return `${translateMonth(m as MonthNumberMM, locale)} ${y}`
}

type ProjectCardProps = {
  project: Project
}

const ProjectCard: FunctionComponent<ProjectCardProps> = ({ project }) => {
  const { title, fromDate, toDate, stack, text, link, color, locale } = project

  return (
      <div
        className={styles.card}
        style={{ background: `linear-gradient(150deg, ${color}, #7b7b85 70%, #7b7b85)` }}
      >
          <h2 className={styles.title}>
            {title}
          </h2>

          <p className={styles.withIcon}>
            <CalendarIcon />
            {`${formatDate(fromDate, locale)} - ${formatDate(toDate, locale)}`}
          </p>

          <p className={styles.withIcon}>
            <CubeIcon />
            {stack.join(', ')}
          </p>

          {link && (
            <a className={styles.withIcon} href={link} target='_blank' rel='noreferrer'>
              <ChainLinksIcon />
              {link}
            </a>
          )}

          <div className={styles.text}>
            {documentToReactComponents(text)}
          </div>
      </div>
  )
}

export default ProjectCard