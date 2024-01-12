import { IAnnouncement } from "../../components/modules/announcements/Announcement"
import { isBeforeNow } from "./date.util"
import fs from 'fs'
import axios from "axios";
import moment from "moment";

const keepForHoursFromStart = 2

export function filterAndSortAnnouncements(announcements: IAnnouncement[]): IAnnouncement[] {
  const filteredAnnouncements: IAnnouncement[] = []

  for (let i = 0; i < announcements.length; i++) {
    if (announcements[i].dates?.length) {
      for (let j = announcements[i].dates?.length; j >= 0; j--) {
        if (isBeforeNow(announcements[i].dates[j]?.date, keepForHoursFromStart)) announcements[i].dates.splice(j, 1)
      }
      announcements[i].dates.sort((a: any, b: any) => a.date - b.date)
      announcements[i].date = announcements[i].dates[0]?.date
      if (announcements[i].dates.length) filteredAnnouncements.push(announcements[i])
    } else if (announcements[i].date) {
      if (!isBeforeNow(announcements[i].date, keepForHoursFromStart)) {
        filteredAnnouncements.push(announcements[i])
        if (announcements[i].dates) delete announcements[i].dates
      }
    } else {
      filteredAnnouncements.push(announcements[i])
    }
  }

  return filteredAnnouncements.sort((a: any, b: any) => a.date - b.date)
}

export function generateAnnouncementKey(announcement: IAnnouncement) {
  if (announcement?.date && !announcement?.dates) {
    return `${announcement.title}-${announcement.date?.toISOString()}`
  } else if (announcement.dates) {
    const subDateKeys: string[] = []
    for (let i = 0; i < announcement.dates.length; i++) {
      subDateKeys.push(`${announcement.dates[i]?.date.toISOString()}-${announcement.dates[i]?.subTitle}`)
    }
    return `${announcement.title}-${subDateKeys.join("-")}`
  }
  return announcement.title
}

export function csvJSON(rawData, delimiter = ',') {
  let data = rawData.replace(/['"]+/g, '');
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
}

export function announcementConcatenator(announcementArray): string {
  let totalText = '';
  announcementArray.forEach(item => {
    let itemToConcat
    if (!item.date || item.date > new Date()) {
      if (item.date) {
        itemToConcat = `${item.title}\n${moment(item.date).format('ddd, MMM Mo h:mm A')}\n${item.description.replace(/(\r\n|\n|\r)/gm, "")}\n\n`;
      } else {
        itemToConcat = `${item.title}\n${item.description.replace(/(\r\n|\n|\r)/gm, "")}\n\n`;
      }
      totalText = totalText.concat(itemToConcat);
    }
  })
  return totalText;
}
