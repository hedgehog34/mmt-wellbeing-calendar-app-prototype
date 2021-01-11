import { useEffect } from 'react'
import { motion } from 'framer-motion'
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
      <motion.div key={router.asPath} initial='pageInitial' animate='pageAnimate' variants={{
            pageInitial: {
              opacity: 0
            },
            pageAnimate: {
              opacity: 1
            },
          }}>
            <Component {...pageProps} />
      </motion.div>
    </ThemeProvider>
  )
}

export default CalendarApp
