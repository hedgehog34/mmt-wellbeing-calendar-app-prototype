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
  size: '3xl',
  fontWeight: 800,
  textTransform: 'uppercase',
  display: 'inline-block',
  position: 'relative',
  zIndex: 2,
  _before: {
    content: '""',
    display: 'block',
    height: { base: '32px', md: '48px'},
    width: { base: 'calc(100% + 20px)', md: `calc(100% + ${cardVerticalPadding})`},
    background: '#FFD803',
    position: 'absolute',
    top: '8px',
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
  top: 'calc(50% - (50px / 2))',
}

export default function Month({ monthData }) {
  const { title, contentHtml, previousMonth, nextMonth } = monthData

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Center>
        <Box position='relative' maxW='32em' w='100%'>
          <Box h='32em' p={{ base: '20px', md: `20px ${cardVerticalPadding}` }} background='white' overflow='hidden'>
            <Heading {...cardHeaderStyling}>
              {`${title}.`}
            </Heading>
            <div className='contentHtml' dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </Box>
          {previousMonth && <Link href='/months/[id]' as={`/months/${previousMonth}`}><a style={{ ...arrowStyles, left: '-28px' }}><ArrowLeft /></a></Link>}
          {nextMonth && <Link href='/months/[id]' as={`/months/${nextMonth}`}><a style={{ ...arrowStyles, right: '-28px' }}><ArrowRight /></a></Link>}
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