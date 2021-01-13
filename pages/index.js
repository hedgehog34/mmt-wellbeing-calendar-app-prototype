import Head from 'next/head'
import Link from 'next/link'
import { Heading, Grid, Square } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { getSortedMonthsData } from '../lib/months'

import Layout, { siteTitle } from '../components/layout'

const cardHeaderStyling = {
  as: 'h3',
  w: '100%',
  size: '3xl',
  textTransform: 'uppercase',
  textAlign: 'center',
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

const gridStyles = {
  gap: 5,
  templateColumns: {
    base: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(4, 1fr)',
    lg: 'repeat(6, 1fr)',
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
            {allMonthsData.map(({ id, title }) => {
              const truncatedTitle = `${title.substring(0, 3)}.`

              return (
                <Link href={`/months/${id}`} key={id}>
                  <a>
                    <Square w='100%' h='200px' bg='white' overflow='visible' isTruncated>
                      <Heading {...cardHeaderStyling}>
                        {truncatedTitle}
                      </Heading>
                    </Square>
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

export async function getStaticProps() {
  const allMonthsData = getSortedMonthsData()
  return {
    props: {
      allMonthsData
    }
  }
}
