import React from 'react';
import AppUtils from '@/utils/AppUtils';
import moment from 'moment';
import {Tooltip} from "antd";
import EmptyText from '../EmptyText/EmptyText';


type TimeAgoProps = {
  unixTimeStamp: number | string | null;
  emptyText?: string;
  maxDay?: number;
  dateFormat?: string;
};
const defaultFormat = 'YYYY-MM-DD HH:mm';
const SmartTime: React.FC<TimeAgoProps> = props => {
  const now = new Date().getTime();
  const emptyTitle = props.emptyText ? props.emptyText : '获取失败';

  if (typeof props.unixTimeStamp !== 'number' || props.unixTimeStamp === 0) {
    return <EmptyText title={emptyTitle}/>;
  }
  const maxDay = props.maxDay ? props.maxDay : 14;
  const microTime = props.unixTimeStamp * 1000;
  if (microTime <= now) {
    return (
      <Tooltip title={moment(props.unixTimeStamp * 1000).format(defaultFormat)}>
        {AppUtils.timeAgo(props.unixTimeStamp, maxDay, defaultFormat)}
      </Tooltip>
    );
  }
  return (
    <Tooltip title={moment(props.unixTimeStamp * 1000).format(defaultFormat)}>
      {AppUtils.timeFuture(props.unixTimeStamp, defaultFormat)}
    </Tooltip>
  );

};
export default SmartTime;
