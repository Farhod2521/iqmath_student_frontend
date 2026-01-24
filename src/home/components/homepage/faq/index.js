import React, { useEffect, useState } from 'react'
import { Box, Container, Accordion, AccordionSummary, AccordionDetails, Dialog, IconButton } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { styled } from '@mui/material/styles'
import { IconMinus, IconPlayerPlay, IconPlus, IconX } from '@tabler/icons'
import { useTranslation } from 'react-i18next'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { Button } from '@heroui/react'
import { FaEye } from 'react-icons/fa'
import { Link } from 'brainly-style-guide'

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

const VideoModal = ({ open, onClose, videoId }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          bgcolor: 'background.paper'
        }
      }}
    >
      <Box sx={{ position: 'relative', bgcolor: '#000' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 10,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' }
          }}
        >
          <IconX size={24} />
        </IconButton>

        <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', bgcolor: '#000' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
          />
        </Box>
      </Box>
    </Dialog>
  )
}

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(0)
  const { t, i18n } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedVideoId, setSelectedVideoId] = useState(null)

  const language = i18n.language

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

  const extractYoutubeId = (text) => {
    if (!text) return null
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = text.match(regExp)
    return match ? match[1] : null
  }

  const handleWatchVideo = (url) => {
    const youtubeId = extractYoutubeId(url)
    if (youtubeId) {
      setSelectedVideoId(youtubeId)
      setModalOpen(true)
    }
  }

  return (
    <Container sx={{ maxWidth: '1400px !important', mt: 3, pb: { xs: '30px', lg: '60px' } }}>
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
                {/* <AccordionDetails>
                  <div dangerouslySetInnerHTML={{ __html: language === 'uz' ? item.answer_uz : item.answer_ru }} />
                </AccordionDetails> */}
                <AccordionDetails>
                  <Box>
                    {(() => {
                      const answer = language === 'uz' ? item.answer_uz : item.answer_ru
                      const url = item?.url
                      const youtubeId = extractYoutubeId(url)

                      return (
                        <>
                          {answer && (
                            <Box mb={youtubeId ? 2 : 0}>
                              <div dangerouslySetInnerHTML={{ __html: answer }} />
                            </Box>
                          )}

                          {youtubeId && (
                            <Box>
                              {/* <Link
                                onClick={() => handleWatchVideo(url)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '5px 10px',
                                  backgroundColor: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  fontSize: '14px',
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = '#dc2626'
                                  // e.target.style.transform = 'translateY(-2px)'
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = '#ef4444'
                                  // e.target.style.transform = 'translateY(0)'
                                }}
                              >
                                <IconPlayerPlay size={18} stroke={2} />
                                Video ko'rish
                              </Link> */}
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  color: '#1677ff', // Ant Design primary blue
                                  fontSize: '14px',
                                  fontWeight: 500,
                                  textDecoration: 'none',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.textDecoration = 'underline'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.textDecoration = 'none'
                                }}
                              >
                                Ko'rish
                              </a>
                            </Box>
                          )}
                        </>
                      )
                    })()}
                  </Box>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </Box>
        </Grid>
      </Grid>
      <VideoModal open={modalOpen} onClose={() => setModalOpen(false)} videoId={selectedVideoId} />
    </Container>
  )
}

export default FAQ
