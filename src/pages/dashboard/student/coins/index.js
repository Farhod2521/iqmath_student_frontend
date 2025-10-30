import CoinsIcon from '@/components/icons/coins'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import 'swiper/css'
import 'swiper/css/navigation'
import { useSession } from 'next-auth/react'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { get } from 'lodash'
import { useScoreStore } from '@/store'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { ArrowLeftRight, Coins, Award, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react'
import { usePostQuery } from '@/hooks'
import { useMemo, useState } from 'react'

const RATES = {
  BALL_PER_TANGA: 15, // 15 ball = 1 tanga
  SUM_PER_TANGA: 100 // 1 tanga = 100 so'm
}

const Index = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()

  const { data: coins, isLoading: coinsLoading } = useGetQuery({
    key: KEYS.coins,
    url: URLS.coins,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken && false
  })

  const [fromUnit, setFromUnit] = useState('ball') // 1-selection
  const [toUnit, setToUnit] = useState('tanga')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState(null) // { type: 'success' | 'error', text: string }

  const parsed = amount ? parseFloat(amount) : 0

  const convertedAmount = useMemo(() => {
    if (!amount || Number.isNaN(parsed) || parsed <= 0) return '0'

    if (fromUnit === 'ball' && toUnit === 'tanga') {
      return (parsed / RATES.BALL_PER_TANGA).toFixed(2)
    }
    if (fromUnit === 'ball' && toUnit === 'sum') {
      return (parsed * (RATES.SUM_PER_TANGA / RATES.BALL_PER_TANGA)).toFixed(2)
    }
    if (fromUnit === 'tanga' && toUnit === 'sum') {
      return (parsed * RATES.SUM_PER_TANGA).toFixed(2)
    }
    return '0'
  }, [amount, parsed, fromUnit, toUnit])

  const sumEquivalent = useMemo(() => {
    if (!amount || Number.isNaN(parsed) || parsed <= 0) return '0'
    // Hamma marshrutda so‘mni hisoblab ko‘rsatamiz:
    if (fromUnit === 'ball') {
      // ball → sum
      return (parsed * (RATES.SUM_PER_TANGA / RATES.BALL_PER_TANGA)).toFixed(2)
    }
    // tanga → sum
    return (parsed * RATES.SUM_PER_TANGA).toFixed(2)
  }, [amount, parsed, fromUnit])

  const { mutate: convertMutate, isPending: isConvertLoading } = usePostQuery({
    listKeyId: '/api/v1/func_student/my-convert/',
    onSuccess: (data) => {
      setMessage({ type: 'success', text: `Muvaffaqiyatli konvertatsiya qilindi! ${data?.message || ''}` })
      setAmount('')
    },
    onError: (err) => {
      setMessage({
        type: 'error',
        text: err?.response?.data?.message || 'Konvertatsiya amalga oshmadi'
      })
    }
  })

  const getApiType = () => {
    if (fromUnit === 'ball' && toUnit === 'tanga') return 'SCORE_TO_COIN'
    if (fromUnit === 'ball' && toUnit === 'sum') return 'SCORE_TO_SOM'
    if (fromUnit === 'tanga' && toUnit === 'sum') return 'COIN_TO_SOM'
    return null
  }

  const postConvert = (data) => {
    convertMutate(
      {
        url: '/api/v1/func_student/my-convert/',
        attributes: data,
        config: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      },
      {
        onSuccess: (data) => {
          setMessage({ type: 'success', text: `Muvaffaqiyatli konvertatsiya qilindi! ${data?.message || ''}` })
          setAmount('')
        },
        onError: (error) => {
          setMessage({
            type: 'error',
            text: error?.response?.data?.error || 'Konvertatsiya amalga oshmadi'
          })
        }
      }
    )
  }

  const handleConvert = () => {
    if (!amount || parsed <= 0 || Number.isNaN(parsed)) {
      setMessage({ type: 'error', text: "Iltimos, to'g'ri miqdor kiriting" })
      return
    }
    const type = getApiType()
    if (!type) {
      setMessage({ type: 'error', text: 'Konvertatsiya turi noto‘g‘ri tanlangan' })
      return
    }
    postConvert({ type, amount: parsed })
  }

  console.log('coins', coins)

  return (
    <LayoutAdmin title={t('points')}>
      <div className="grid grid-cols-12 gap-x-[24px]">
        <div
          style={{ backgroundImage: `url(/images/bg-img-2.png)` }}
          className="col-span-12 p-[24px] rounded-[12px] text-white bg-no-repeat bg-cover relative"
        >
          <div className="flex gap-8 mb-6">
            <div className=" min-w-[180px]">
              <p className="text-[17px] font-medium">{t('yourballs')}</p>
              <div className="flex items-center gap-x-[10px] mt-[8px] mb-[8px]">
                <CoinsIcon color="white" />
                <p className="text-[26px] font-semibold">
                  {get(coins, 'data.score')} {t('ball')}
                </p>
              </div>
            </div>
            <div className=" min-w-[180px]">
              <p className="text-[17px] font-medium text-white">{t('yourcoins') || 'Jami tangalaringiz'}</p>
              <div className="flex items-center gap-x-[10px] mt-[8px] mb-[8px]">
                <CoinsIcon color="white" />
                <p className="text-[26px] font-semibold text-white">
                  {get(scoreData, 'coin', 0)} {t('coin') || 'tanga'}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[17px] text-[#DCDCDD] w-3/5">{t('descballs')}</p>

          <Image
            src={'/images/wallet-img-1.png'}
            alt="wallet-img"
            width={254}
            height={266}
            className="absolute right-0 bottom-0"
          />

          <Image
            src={'/images/wallet-img-2.png'}
            alt="wallet-img"
            width={153}
            height={159}
            className="absolute right-[220px] bottom-0"
          />
          <Image
            src={'/images/wallet-img-3.png'}
            alt="wallet-img"
            width={90}
            height={90}
            className="absolute right-[240px] top-0"
          />
          <Image
            src={'/images/wallet-img-4.png'}
            alt="wallet-img"
            width={41}
            height={41}
            className="absolute right-[500px] top-5"
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coins className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Konverter</h1>
          </div>
          <p className="text-gray-600">Ball va tangalarni oson konvertatsiya qiling</p>
        </div>

        {/* Conversion Rates Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Konvertatsiya kurslari</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
              <Award className="w-8 h-8 text-amber-600" />
              <div>
                <div className="text-2xl font-bold text-amber-700">{RATES.BALL_PER_TANGA}</div>
                <div className="text-xs text-amber-600">Ball</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-gray-400 text-xl">=</div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <Coins className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-700">1</div>
                <div className="text-xs text-blue-600">Tanga</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-4 p-3 bg-green-50 rounded-xl">
            <DollarSign className="w-6 h-6 text-green-600" />
            <div className="text-sm text-green-700 font-medium">1 Tanga = {RATES.SUM_PER_TANGA} so'm</div>
          </div>
        </div>

        {/* Converter Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Selections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* 1-selection: qaysidan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">1-tanlov: Qaysidan</label>
              <div className="relative">
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                >
                  <option value="ball">Ball</option>
                  <option value="tanga">Tanga</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {/* <FromIcon className="w-5 h-5 text-gray-500" /> */}
                </div>
              </div>
            </div>

            {/* 2-selection: qaysiga */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">2-tanlov: Qaysiga</label>
              <div className="relative">
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  disabled={fromUnit === 'tanga'} // tanga tanlanganda faqat sum bo‘ladi
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all disabled:opacity-60"
                >
                  {fromUnit === 'ball' && (
                    <>
                      <option value="tanga">Tanga</option>
                      <option value="sum">So'm</option>
                    </>
                  )}
                  {fromUnit === 'tanga' && <option value="sum">So'm</option>}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {/* <ToIcon className="w-5 h-5 text-gray-500" /> */}
                </div>
              </div>
            </div>
          </div>

          {/* Amount input (from-unit bo‘yicha) */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {fromUnit === 'ball' ? 'Balldan miqdor' : 'Tangadan miqdor'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full px-6 py-4 text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                min="0"
                step="0.01"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                {fromUnit === 'ball' ? (
                  <>
                    <Award className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-gray-700">Ball</span>
                  </>
                ) : (
                  <>
                    <Coins className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-700">Tanga</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Switch (ixtiyoriy) */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => {
                setMessage(null)
                setAmount('')
                if (fromUnit === 'ball') {
                  setFromUnit('tanga')
                  setToUnit('sum')
                } else {
                  setFromUnit('ball')
                  setToUnit('tanga')
                }
              }}
              className="p-3 bg-indigo-100 hover:bg-indigo-200 rounded-full transition-colors group"
              aria-label="Konvertatsiyani almashtirish"
            >
              <ArrowLeftRight className="w-6 h-6 text-indigo-600 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* Natija (to-unit bo‘yicha) */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {fromUnit === 'ball' ? (toUnit === 'tanga' ? 'Tangaga' : "So'mga") : "So'mga"}
            </label>
            <div className="relative">
              <div className="w-full px-6 py-4 text-2xl font-semibold border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600">
                {convertedAmount}
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg">
                {toUnit === 'tanga' ? (
                  <>
                    <Coins className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-700">Tanga</span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-gray-700">So'm</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* So'm ekvivalenti */}
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">So'm ekvivalenti:</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-green-700">{sumEquivalent} so'm</span>
              </div>
            </div>
          </div>

          {/* Xabar */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {message.text}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleConvert}
            disabled={isConvertLoading || !amount || parsed <= 0}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
          >
            {isConvertLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Kutilmoqda...</span>
              </div>
            ) : (
              'Konvertatsiya qilish'
            )}
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Barcha konvertatsiyalar avtomatik hisoblangan va API orqali saqlanadi</p>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default Index
