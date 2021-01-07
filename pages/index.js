import Head from 'next/head'
import Link from 'next/link'
import { Heading, Grid, Square } from '@chakra-ui/react'

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
    height: { base: '52px', md: '60px'},
    width: '100%',
    background: '#FFD803',
    position: 'absolute',
    top: { base: 0, md: '4px'},
    zIndex: -1,
    transform: 'skewX(-20deg) rotate(-5deg)',
  }
}

const gridStyles = {
  gap: 5,
  templateColumns: {
    base: 'repeat(3, 1fr)',
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
