import React from 'react'
import format from 'date-fns/format'
import { Text, List, ListItem } from '@chakra-ui/react'

export const CardContent = ({ events, fontSize = 'md' }) => (
  <List spacing={3}>
    {events.map(event => {
      const { title, description, location, startsAt, endsAt } = event
      const formattedStartsAt = format(new Date(startsAt), 'do')
      const formattedEndsAt = format(new Date(endsAt), 'do')

      return (
        <ListItem fontSize={fontSize} fontFamily='MetaProSerif' key={title}>
          <Text fontFamily='MetaProSerifBold'>{formattedStartsAt}{endsAt && formattedStartsAt !== formattedEndsAt && ` - ${formattedEndsAt}`}</Text>
          <div className='contentHtml' dangerouslySetInnerHTML={{ __html: description }} />
        </ListItem>
      )
    })}
  </List>
)
