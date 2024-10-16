import { FunctionComponent } from "react";

import { TimelineEvent } from "@/types/timelineEvent";
import Link from "next/link";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from './index.module.scss'


type TimelineCardProps = {
  timelineEvent: TimelineEvent;
}

const TimelineCard: FunctionComponent<TimelineCardProps> = ({ timelineEvent }) => {
  const { slug, title, date, place, tags, shortText } = timelineEvent

  return (
    <Link href={`/timeline/${slug}`} className={styles.card}>
      <div>
        <h2>
          {title}
        </h2>

        <div className={styles.info}>
          <span>
            {date}
          </span>
          <span>
            {place}
          </span>
          <span>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>{`#${tag}`}</span>
            ))}
          </span>
        </div>
        
        <div className={styles.shortText}>
          {documentToReactComponents(shortText)}
        </div>
      </div>
    </Link>
  );
}
 
export default TimelineCard;