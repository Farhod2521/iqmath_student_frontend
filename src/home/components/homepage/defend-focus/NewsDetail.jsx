const NewsDetail = ({ news, onBack }) => {
  return (
    <Box py={8}>
      <Container maxWidth="md">
        <Button startIcon={<ArrowLeft />} onClick={onBack}>
          Orqaga
        </Button>

        <Box mt={4}>
          <Typography variant="h3" fontWeight={700} mb={2}>
            {news.title}
          </Typography>

          <Box display="flex" gap={2} mb={4} color="text.secondary">
            <span>{news.author}</span>
            <span>•</span>
            <span>{news.readTime}</span>
          </Box>

          <Box component="img" src={news.image} sx={{ width: '100%', borderRadius: 3, mb: 4 }} />

          {news.fullContent.split('\n\n').map((p, i) => (
            <Typography key={i} paragraph fontSize={18} lineHeight={1.8}>
              {p}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
