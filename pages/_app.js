import { motion } from 'framer-motion'
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react'

import '../styles/globals.scss'

function CalendarApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <motion.div key={router.asPath} initial="pageInitial" animate="pageAnimate" variants={{
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
