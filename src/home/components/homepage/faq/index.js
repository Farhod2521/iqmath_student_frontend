import React, { useEffect, useState } from 'react'
import { Box, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { styled } from '@mui/material/styles'
import { IconMinus, IconPlus } from '@tabler/icons'
import { useTranslation } from 'react-i18next'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: '8px',
  marginBottom: '16px !important',
  boxShadow: theme.palette.mode === 'light' ? '0px 3px 0px rgba(235, 241, 246, 0.25)' : 'none',
  border: `1px solid ${theme.palette.divider}`,
  '&:before': { display: 'none' },
  '&.Mui-expanded': { margin: 0 },
  '& .MuiAccordionSummary-root': {
    padding: '8px 24px',
    minHeight: '60px',
    fontSize: '18px',
    fontWeight: 500
  },
  '& .MuiAccordionDetails-root': {
    padding: '0 24px 24px'
  }
}))

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(0)
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const faqItems = [
    { question: 'faqq1', answer: 'faqa1' },
    { question: 'faqq2', answer: 'faqa2' },
    { question: 'faqq3', answer: 'faqa3' },
    { question: 'faqq4', answer: 'faqa4' }
  ]

  const handleChange = (index) => (_, isExpanded) => {
    setExpandedIndex(isExpanded ? index : false)
  }

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    request
      .get(URLS.systemFaqs)
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.error('Error fetching social links:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: 3, pb: { xs: '30px', lg: '60px' } }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid xs={12} lg={8}>
          <Box mt={7}>
            {data.map((item, index) => (
              <StyledAccordion key={index} expanded={expandedIndex === index} onChange={handleChange(index)}>
                <AccordionSummary
                  expandIcon={
                    expandedIndex === index ? <IconMinus size={21} stroke={1.5} /> : <IconPlus size={21} stroke={1.5} />
                  }
                >
                  {language === 'uz' ? item.question_uz : item.question_ru}
                </AccordionSummary>
                <AccordionDetails>
                  <div dangerouslySetInnerHTML={{ __html: language === 'uz' ? item.answer_uz : item.answer_ru }} />
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FAQ
