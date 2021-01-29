import Head from 'next/head'
import Link from 'next/link'
import { Link as ChakraLink, Heading, Container, Text } from '@chakra-ui/react'

import { Logo } from './svg/Logo'
import { Grid } from './svg/Grid'

import styles from './layout.module.scss'

export const siteTitle = 'MMT Wellbeing Calendar App'

const homeButtonStyles = {
  m: '20px auto',
  position: 'fixed',
  bottom: 0,
  right: 0,
  left: 0,
  width: '100%',
}

export default function Layout({ children, home }) {
  const currentYear = new Date().getFullYear()
  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Learn how to build a personal website using Next.js'
        />
        <meta
          property='og:image'
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <header>
        <nav className={styles.nav}>
          <Link href='/'>
            <a><Logo className={styles.logo} /></a>
          </Link>
          <ChakraLink isExternal href='https://www.mmtdigital.co.uk/about' textTransform='uppercase' border='2px' p='3px 10px 0' fontFamily='MetaProCond' _hover={{ textDecoration: 'none' }}>
            About Us
          </ChakraLink>
        </nav>
        <Heading as='h2' size='4xl'>
          {currentYear}
        </Heading>
        <Heading as='h1' size='xl' mb='10' textTransform='uppercase' lineHeight='1'>
          Wellbeing Calendar
        </Heading>
      </header>
      <main>
        {children}
      </main>
      {!home && (
        <Container mt='20px' {...homeButtonStyles} centerContent>
          <Link href='/'>
            <a>
              <Grid />
              <Text fontFamily='MetaProCond' fontSize='18px'>Grid</Text>
            </a>
          </Link>
        </Container>
      )}
    </div>
  )
}