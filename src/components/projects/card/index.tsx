import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import { FunctionComponent } from 'react'

import styles from './index.module.scss'
import CalendarIcon from '@/components/common/icons/calendar-16.svg'
import ChainLinksIcon from '@/components/common/icons/chain-links-16.svg'
import CubeIcon from '@/components/common/icons/cube-16.svg'
import { classNames } from '@/logic/utils/css'
import { MonthNumberMM, translateMonth } from '@/logic/utils/date'
import { translations } from '@/translations'
import { DateString } from '@/types/date'
import { Locale } from '@/types/locale'
import { Project } from '@/types/project'


const formatDate = (date: DateString | undefined, locale: Locale): string => {
  if (!date) {
    return translations[locale].projects.untilNow
  }

  const [y, m] = (date as string).split('-')
  return `${translateMonth(m as MonthNumberMM, locale)} ${y}`
}

type ProjectCardProps = {
  project: Project
}

const ProjectCard: FunctionComponent<ProjectCardProps> = ({ project }) => {
  const {
    title, fromDate, toDate, stack, text, link, thumbnail,
    colorOne, colorTwo = '#7b7b85', colorText,
    locale,
  } = project

  return (
      <div
        className={styles.card}
        style={{
          color: colorText,
          background: `linear-gradient(150deg, ${colorOne}, ${colorTwo} 70%, ${colorTwo})`
        }}
      >
          <h2 className={styles.title}>
            {title}
          </h2>

          <Image
            className={styles.thumbnail}
            alt=''
            src={thumbnail.url}
            width={300}
            height={150}
          />

          <p className={styles.withIcon}>
            <CalendarIcon />
            {`${formatDate(fromDate, locale)} - ${formatDate(toDate, locale)}`}
          </p>

          <p className={styles.withIcon}>
            <CubeIcon stroke={colorText} />
            {stack.join(', ')}
          </p>

          {link && (
            <a
              className={classNames(styles.withIcon, styles.link)}
              href={link}
              target='_blank'
              rel='noreferrer'
            >
              <ChainLinksIcon fill={colorText} />
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