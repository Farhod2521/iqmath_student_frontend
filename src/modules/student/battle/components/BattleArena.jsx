import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { WifiOff, Flag, Loader2 } from 'lucide-react'
import { useBattle } from '../hooks/useBattle'
import BattleVsHeader from './BattleVsHeader'
import BattleQuestionCard from './BattleQuestionCard'
import BattleChat from './BattleChat'
import BattleResultModal from './BattleResultModal'
import BattleSearching from './BattleSearching'

const BattleArena = ({ roomId }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const battle = useBattle(roomId)
  const {
    room,
    status,
    me,
    opponent,
    question,
    questionIndex,
    questionStartedAt,
    secondsPerQuestion,
    myAnswered,
    opponentAnswered,
    result,
    chatMessages,
    chatEnabled,
    sendAnswer,
    sendSkip,
    sendChat
  } = battle

  // "connecting" (WebSocket handshake) and "waiting" (queued for an
  // opponent) are shown as one seamless searching screen — no separate
  // bare loading flash before it, matching a chess.com-style matchmaking
  // experience.
  if (status === 'connecting' || status === 'waiting') {
    return <BattleSearching me={me} room={room} />
  }

  if (status === 'voided') {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <WifiOff className="mb-4 text-gray-300" size={40} />
        <h2 className="mb-2 text-lg font-bold text-gray-700">{t('battle.voidedTitle')}</h2>
        <p className="mb-6 text-sm text-gray-400">{t('battle.voidedDescription')}</p>
        <button
          onClick={() => router.push('/dashboard/student/battle')}
          className="px-5 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-xl"
        >
          {t('battle.playAgain')}
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <BattleVsHeader
          me={me}
          opponent={opponent}
          total={room?.question_count}
          myAnswered={myAnswered}
          opponentAnswered={opponentAnswered}
          questionStartedAt={questionStartedAt}
          secondsPerQuestion={secondsPerQuestion}
        />

        {question ? (
          <BattleQuestionCard
            question={question}
            index={questionIndex}
            total={room?.question_count}
            disabled={myAnswered}
            onAnswer={sendAnswer}
            onSkip={sendSkip}
          />
        ) : (
          <div className="flex items-center justify-center py-16 text-gray-300">
            <Loader2 className="animate-spin" size={22} />
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-300">
          <Flag size={12} />
          {t('battle.ruleDisconnect')}
        </div>
      </div>

      <div className="space-y-4">
        {chatEnabled ? (
          <BattleChat messages={chatMessages} myParticipantId={me?.participant_id} onSend={sendChat} />
        ) : null}
      </div>

      {status === 'finished' ? (
        <BattleResultModal result={result} myParticipantId={me?.participant_id} questionCount={room?.question_count} />
      ) : null}
    </div>
  )
}

export default BattleArena
