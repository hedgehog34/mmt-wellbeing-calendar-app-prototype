import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

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

const pageVariantFadeIn = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0,
  }
}

const pageVariants = {
  initial: direction => {
    return {
      opacity: 0,
      x: direction > 0 ? '100vw' : '-100vw',
      scale: 0.8
    }
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: direction => {
    return {
      opacity: 0,
      x: direction < 0 ? '-100vw' : '100vw',
      scale: 1.2
    }
  }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => Math.abs(offset) * velocity

function Month({ monthData }) {
  const [direction, setDirection] = useState(0)
  const router = useRouter()

  const { title, contentHtml, previousMonth, nextMonth } = monthData

  const handleSwipe = direction => {
    const href = direction === 1 ? `/months/${nextMonth}` : direction === -1 ? `/months/${previousMonth}` : undefined
    href && router.push(href)
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <motion.div
        key={title}
        initial='initial'
        animate='in'
        exit='out'
        custom={direction}
        variants={pageVariants}
        transition={pageTransition}
        drag='x'
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            setDirection(1)
            handleSwipe(1)
          } else if (swipe > swipeConfidenceThreshold) {
            setDirection(-1)
            handleSwipe(-1)
          }
        }}>
          <Center>
            <Box position='relative' maxW='32em' w='100%'>
              <Box h='32em' p={{ base: '20px', md: `20px ${cardVerticalPadding}` }} background='white' overflow='hidden'>
                <Heading {...cardHeaderStyling}>
                  {`${title}.`}
                </Heading>
                <div className='contentHtml' dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </Box>
              {previousMonth && (
                <Link href={`/months/${previousMonth}`}>
                  <a style={{ ...arrowStyles, left: '-28px' }} onClick={() => setDirection(-1)}>
                    <ArrowLeft />
                  </a>
                </Link>
              )}
              {nextMonth && (
                <Link href={`/months/${nextMonth}`}>
                  <a style={{ ...arrowStyles, right: '-28px' }} onClick={() => setDirection(1)}>
                    <ArrowRight />
                  </a>
                </Link>
              )}
            </Box>
          </Center>
        </motion.div>
    </Layout>
  )
}

export default Month

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