import Head from 'next/head'
import Link from 'next/link'
import { Link as ChakraLink, Heading, Container, Text } from '@chakra-ui/react'

import { Logo } from './svg/Logo'
import { Grid } from './svg/Grid'

import styles from './layout.module.scss'

export const siteTitle = 'MMT Wellbeing Calendar App'

export default function Layout({ children, home }) {
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
          <ChakraLink isExternal href='https://www.mmtdigital.co.uk/about' textTransform='uppercase' border='2px' fontWeight='700' p='5px 10px'>
            About Us
          </ChakraLink>
        </nav>
        <Heading as='h2' size='4xl' fontWeight='800'>
          2021
        </Heading>
        <Heading as='h1' size='3xl' mb='10' textTransform='uppercase'>
          Wellbeing Calendar
        </Heading>
      </header>
      <main>
        {children}
      </main>
      {!home && (
        <Container mt='20px' centerContent>
          <Link href='/'>
            <a>
              <Grid />
              <Text fontWeight='700' fontSize='16px'>Grid</Text>
            </a>
          </Link>
        </Container>
      )}
    </div>
  )
}