import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import HomeHero from '../components/HomeHero'
import HomeStatsGrid from '../components/HomeStatsGrid'
import HomeRecentActivity from '../components/HomeRecentActivity'
import HomeCalendarCard from '../components/HomeCalendarCard'
import HomeRemindersCard from '../components/HomeRemindersCard'
import HomeTopStudents from '../components/HomeTopStudents'

const StudentHome = () => {
  const { data: session } = useSession()
  const [activeClassId, setActiveClassId] = useState('my')

  const { data: studentProfile } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    enabled: !!session?.accessToken
  })

  const { data: homeDashboard, isLoading: isDashboardLoading } = useGetQuery({
    key: KEYS.studentHomeDashboard,
    url: URLS.studentHomeDashboard,
    params: activeClassId === 'my' ? {} : { class_id: activeClassId },
    enabled: !!session?.accessToken
  })

  const { data: rating, isLoading: isRatingLoading } = useGetQuery({
    key: KEYS.studentRating,
    url: URLS.studentRating,
    enabled: !!session?.accessToken
  })

  const classes = get(homeDashboard, 'data.classes', [])
  const continueLearning = get(homeDashboard, 'data.continue_learning', null)
  const stats = get(homeDashboard, 'data.stats', null)
  const currentClassName = get(homeDashboard, 'data.current_class_name', '')
  const recentActivity = get(homeDashboard, 'data.recent_activity', [])

  const topStudents = get(rating, 'data.score.top_3', [])
  const myRank = get(rating, 'data.score.my_rank', null)
  const myValue = get(rating, 'data.score.my_value', 0)

  const fullName = get(studentProfile, 'data.full_name', '')
  const firstName = fullName ? fullName.split(' ')[0] : ''

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-9">
          <HomeHero
            activeClass={activeClassId}
            onSelectClass={setActiveClassId}
            currentClassName={currentClassName}
            classes={classes}
            continueLearning={continueLearning}
            isLoading={isDashboardLoading}
          />
          <HomeStatsGrid stats={stats} isLoading={isDashboardLoading} />
          <HomeRecentActivity activities={recentActivity} isLoading={isDashboardLoading} />
        </div>

        <div className="flex flex-col gap-5 lg:col-span-3">
          <HomeCalendarCard />
          <HomeRemindersCard />
          <HomeTopStudents
            topStudents={topStudents}
            currentStudent={{ name: firstName, rank: myRank, score: myValue }}
            isLoading={isRatingLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default StudentHome
