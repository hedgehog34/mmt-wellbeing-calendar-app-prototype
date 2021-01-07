import Head from 'next/head'
import Link from 'next/link'

import { Box, Heading, Center } from '@chakra-ui/react'

import Layout from '../../components/layout'
import { ArrowRight, ArrowLeft } from '../../components/svg/Arrow'

import { getAllMonthIds, getMonthData } from '../../lib/months'

const cardVerticalPadding = '40px'

const cardHeaderStyling = {
  as: 'h2',
  mb: '40px',
  size: '2xl',
  fontWeight: 800,
  textTransform: 'uppercase',
  display: 'inline-block',
  position: 'relative',
  zIndex: 2,
  _before: {
    content: '""',
    display: 'block',
    height: { base: '24px', md: '32px'},
    width: { base: 'calc(100% + 20px)', md: `calc(100% + ${cardVerticalPadding})`},
    background: '#FFD803',
    position: 'absolute',
    top: { base: '25%', md: '12px' },
    left: { base: '-20px', md: '-40px' },
    zIndex: -1,
    transform: 'skewX(-20deg) rotate(-5deg)',
  },
  _after: {
    content: '""',
    display: 'block',
    height: '3px',
    width: '100px',
    background: 'currentColor',
    position: 'absolute',
    bottom: { base: '-3px', md: '-8px'},
  }
}

const arrowStyles = {
  fill: '#353535',
  position: 'absolute',
}

export default function Month({ monthData }) {
  const { title, contentHtml, previousMonth, nextMonth } = monthData

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Center>
        <Box maxW='48em' w='100%' p={{ base: '20px', md: `20px ${cardVerticalPadding}` }} background='white' position='relative' minH='400px'>
          <Heading {...cardHeaderStyling}>
            {`${title}.`}
          </Heading>
          <div className='contentHtml' dangerouslySetInnerHTML={{ __html: contentHtml }} />
          {previousMonth && <Link href={`/months/${previousMonth}`}><a><ArrowLeft style={{ ...arrowStyles, left: '-15px' }} /></a></Link>}
          {nextMonth && <Link href={`/months/${nextMonth}`}><a><ArrowRight style={{ ...arrowStyles, right: '-15px' }} /></a></Link>}
        </Box>
      </Center>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllMonthIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const monthData = await getMonthData(params.id)
  return {
    props: {
      monthData
    }
  }
}