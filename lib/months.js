import { DeliveryClient } from '@kentico/kontent-delivery'

import monthNames from '../constants/monthNames'
import { CONTENT_TYPE_MONTH, CONTENT_TYPE_EVENT } from '../constants/contentTypes'

const client = new DeliveryClient({
  projectId: process.env.KONTENT_PROJECT_ID,
  previewApiKey: process.env.KONTENT_PREVIEW_API_KEY,
})

const parseEvent = event => ({
  title: event.title.value,
  description: event.description.value,
  startsAt: event.starts_at.value.toISOString(),
  endsAt: event.ends_at.value.toISOString(),
  location: event.location.value,
  contentType: CONTENT_TYPE_EVENT
})

const parseMonth = month => ({
  name: month.name.value,
  date: month.date.value.toISOString(),
  shortName: month.short_name.value,
  events: month.events.value.map(event => parseEvent(event)),
  contentType: CONTENT_TYPE_MONTH
})

const getNextMonth = (monthNames, currentMonth) => {
  const currentIndex = monthNames.indexOf(currentMonth)
  const nextIndex = (currentIndex + 1) % monthNames.length
  return monthNames[nextIndex] || null
}

const getPreviousMonth = (monthNames, currentMonth) => {
  const currentIndex = monthNames.indexOf(currentMonth)
  const prevIndex = currentIndex === 0 ? monthNames.length - 1 : (currentIndex - 1) % monthNames.length // this ensures cycling
  return monthNames[prevIndex] || null
}

const getData = async ({ contentType, preview, orderByField, fieldsMapper }) => {
  return await client
    .items()
    .queryConfig({
      usePreviewMode: !!preview,
    })
    .type(contentType)
    .orderByAscending(`elements.${orderByField}`)
    .toPromise()
    .then((response) => response.items.map(fieldsMapper))
}

export async function getAllMonthNames(preview) {
  return await getData({
    contentType: CONTENT_TYPE_MONTH,
    preview,
    orderByField: 'date',
    fieldsMapper: month => ({ name: month.name.value }),
  })
}

export async function getAllMonthsData(preview) {
  return await getData({
    contentType: CONTENT_TYPE_MONTH,
    preview,
    orderByField: 'date',
    fieldsMapper: month => parseMonth(month),
  })
}

export async function getAllEvents(preview) {
  return await getData({
    contentType: CONTENT_TYPE_EVENT,
    preview,
    orderByField: 'startsAt',
    fieldsMapper: event => parseEvent(event),
  })
}

export async function getAllMonthIds() {
  const months = await getAllMonthNames()

  return months.map(month => {
    return {
      params: {
        id: month.name
      }
    }
  })
}

// TODO: to change from making request on every month page change
export async function getMonthDataByMonthId(id, preview) {
  const nextMonth = getNextMonth(monthNames, id)
  const previousMonth = getPreviousMonth(monthNames, id)

  return await client
    .items()
    .queryConfig({
      usePreviewMode: !!preview,
    })
    .type(CONTENT_TYPE_MONTH)
    .equalsFilter('elements.name', id)
    .toPromise()
    .then((result) => result.getFirstItem())
    .then(result => {
      const parsedMonth = parseMonth(result)
      return {
        id,
        ...parsedMonth,
        nextMonth,
        previousMonth,
      }
    })
}
