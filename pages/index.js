import { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Heading, Grid, Square, Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { getAllMonthsData } from '../lib/months'

import Layout, { siteTitle } from '../components/layout'
import { CardContent } from '../components/CardContent'

const cardContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: { base: 'center', md: 'initial' },
  justifyContent: { base: 'center', md: 'initial' },
  flexShrink: 0,
  flexGrow: 0,
  textOverflow: 'ellipsis',
  whiteSpace: 'initial',
  overflow: 'visible',
  width: '100%',
  height: '100%',
  minHeight: '200px',
  background: '#ffffff',
}

const cardHeaderStyling = {
  as: 'h3',
  pt: { base: 0, md: 2 },
  w: '100%',
  size: '3xl',
  textTransform: 'uppercase',
  textAlign: { base: 'center', md: 'left' },
  position: 'relative',
  zIndex: 2,
  _after: {
    content: '""',
    display: 'block',
    height: { base: '40px', md: '52px'},
    width: '100%',
    background: '#FFD803',
    position: 'absolute',
    top: 0,
    zIndex: -1,
    transform: 'skewX(-20deg) rotate(-5deg)',
  }
}

const cardContainerDescriptionStyles = {
  display: { base: 'none', md: 'block' },
  p: 4,
}

const gridStyles = {
  gap: { base: 5, md: 7 },
  gridAutoRows: '1fr',
  templateColumns: {
    base: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(4, 1fr)',
  }
}

export default function Home({ allMonthsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <motion.div initial='pageInitial' animate='pageAnimate' variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimate: {
          opacity: 1
        },
      }}>
        <main>
          <Grid {...gridStyles}>
            {allMonthsData.map(({ name, events }, index) => {
              const truncatedTitle = `${name.substring(0, 3)}.`

              return (
                <Link href={`/months/${name}`} key={`${name}-${index}`}>
                  <a>
                    <Box {...cardContainerStyles} isTruncated>
                      <Heading {...cardHeaderStyling} _before={{ content: { base: `'${truncatedTitle}'`, xl: `'${name}'` }}}>
                        &nbsp;
                      </Heading>
                      <Box {...cardContainerDescriptionStyles}>
                        <CardContent events={events} fontSize='lg' />
                      </Box>
                    </Box>
                  </a>
                </Link>
              )
            })}
          </Grid>
        </main>

        <footer>
          
        </footer>
      </motion.div>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const allMonthsData= await getAllMonthsData(preview)
  return {
    props: {
      allMonthsData,
    }
  }
}
