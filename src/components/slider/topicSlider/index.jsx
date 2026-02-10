import { useRef, useState, useEffect } from 'react'
import { KEYS, URLS } from '@/constants'
import { useGetQuery } from '@/hooks'

const TopicDropdown = ({ chapterId, session }) => {
  const scrollRef = useRef(null)
  const [activeId, setActiveId] = useState(null)

  const { data: topics, isLoading } = useGetQuery({
    key: KEYS.studentTopics,
    url: `${URLS.studentTopics}${chapterId}/`,
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}` || "",
    // },
    enabled: !!chapterId && !!session?.accessToken
  })

  const handleScroll = (direction) => {
    const scrollAmount = 200
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleSelect = (id, locked) => {
    if (!locked) setActiveId(id)
  }

  useEffect(() => {
    if (topics?.length) {
      setActiveId(topics[0]?.id) // birinchi topic avtomatik tanlanadi
    }
  }, [topics])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="relative flex items-center w-full overflow-hidden">
      <button className="absolute left-0 z-10 bg-white text-xl px-2 py-1" onClick={() => handleScroll('left')}>
        &#9664;
      </button>

      <div ref={scrollRef} className="flex overflow-x-auto gap-2 px-8 py-2 scroll-smooth no-scrollbar">
        {topics?.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleSelect(topic.id, topic.locked)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm
              ${
                topic.locked
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : activeId === topic.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {topic.title}
            {topic.locked && <span className="ml-1">🔒</span>}
          </button>
        ))}
      </div>

      <button className="absolute right-0 z-10 bg-white text-xl px-2 py-1" onClick={() => handleScroll('right')}>
        &#9654;
      </button>
    </div>
  )
}

export default TopicDropdown
