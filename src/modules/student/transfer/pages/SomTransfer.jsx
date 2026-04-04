import { useState } from 'react'

import TransferConfirm from '../components/TransferConfirm'
import TransferHistory from '../components/TransferHistory'
import { useTranslation } from 'react-i18next'
import TransferForm from '../components/TransferForm'

const STEPS = Object.freeze({
  FORM: 'form',
  CONFIRM: 'confirm',
  HISTORY: 'history'
})

const SomTransfer = () => {
  const { t } = useTranslation()

  const [step, setStep] = useState(STEPS.FORM)
  const [transferId, setTransferId] = useState(null)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('transferMoney')}</h1>

        {step !== STEPS.HISTORY && (
          <button onClick={() => setStep(STEPS.HISTORY)} className="text-indigo-600 font-medium">
            {t('viewHistory')}
          </button>
        )}
      </div>

      {/* CONTENT */}
      {step === STEPS.FORM && (
        <TransferForm
          onSuccess={(id) => {
            setTransferId(id)
            setStep(STEPS.CONFIRM)
          }}
        />
      )}

      {step === STEPS.CONFIRM && (
        <TransferConfirm
          transferId={transferId}
          onBack={() => setStep(STEPS.FORM)}
          onSuccess={() => setStep(STEPS.HISTORY)}
        />
      )}

      {step === STEPS.HISTORY && <TransferHistory onBack={() => setStep(STEPS.FORM)} />}
    </div>
  )
}

export default SomTransfer
