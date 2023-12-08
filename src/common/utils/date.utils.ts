import * as moment from 'moment-timezone';

export function setMomentToBeginning(moment: moment.Moment) {
  return moment.hours(0).minutes(0).second(0).milliseconds(0).clone();
}

export function setMomentToEnd(moment: moment.Moment) {
  return moment.hours(23).minutes(59).second(59).milliseconds(999).clone();
}

export function getReadableDateFormat(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes} ${day}-${month}-${year}`;
}
