import { FunctionComponent } from "react";

import { TimelineEvent } from "@/types/timelineEvent";


type TimelineCardProps = {
  timelineEvent: TimelineEvent;
}
 
const TimelineCard: FunctionComponent<TimelineCardProps> = ({ timelineEvent }) => {
  return (
    <div>
      {timelineEvent.title}
    </div>
  );
}
 
export default TimelineCard;