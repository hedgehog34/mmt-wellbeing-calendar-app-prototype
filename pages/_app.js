import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react'

import '../styles/globals.scss'

function CalendarApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default CalendarApp
