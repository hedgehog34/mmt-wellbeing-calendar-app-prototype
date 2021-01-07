import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import compareAsc from 'date-fns/compareAsc'

import monthNames from '../constants/monthNames'

const monthsDirectory = path.join(process.cwd(), 'months')

const getFileUpdatedDate = path => {
  const stats = fs.statSync(path)
  return stats.mtime.toString()
}

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

export function getSortedMonthsData() {
  // Get file names under /months
  const fileNames = fs.readdirSync(monthsDirectory)
  const allMonthsData = fileNames
  .filter(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')
    return monthNames.includes(id)
  })
  .map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(monthsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse markdown file metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      dateUpdated: getFileUpdatedDate(`${monthsDirectory}\\${fileName}`),
      ...matterResult.data
    }
  })

  return allMonthsData.sort((a, b) => {
    const dateA = new Date(`${a.title} 1`)
    const dateB = new Date(`${b.title} 1`)

    return compareAsc(dateA, dateB)
  })
}

export function getAllMonthIds() {
  const fileNames = fs.readdirSync(monthsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getMonthData(id) {
  const fullPath = path.join(monthsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  const nextMonth = getNextMonth(monthNames, id)
  const previousMonth = getPreviousMonth(monthNames, id)

  // Combine the data with the id
  return {
    id,
    contentHtml,
    nextMonth,
    previousMonth,
    ...matterResult.data
  }
}