import { useEffect } from 'react'
import { ThemeProvider, CSSReset, extendTheme } from '@chakra-ui/react'

import { Fonts } from '../components/Fonts'
import monthNames from '../constants/monthNames'

import '../styles/globals.scss'

const theme = extendTheme({
  fonts: {
    heading: 'MetaProCond',
  },
})

function CalendarApp({ Component, pageProps, router }) {
  // Redirect to page corresponding to currentMonth
  useEffect(() => {
    const { pathname } = router
    const currentMonthName = monthNames[new Date().getMonth()].toLowerCase()
    if(pathname === '/' && currentMonthName){
      router.push(`/months/${currentMonthName}`)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Fonts />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default CalendarApp
