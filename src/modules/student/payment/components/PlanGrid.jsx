import React from 'react'
import PlanCard from './PlanCard'

const PlanGrid = ({ plans, selectedPlan, onSelectPlan }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
      {plans?.map((plan) => (
        <PlanCard key={plan.id} plan={plan} isSelected={selectedPlan?.id === plan.id} onSelect={onSelectPlan} />
      ))}
    </div>
  )
}

export default PlanGrid
