import React from 'react'
import PlanCard from './PlanCard'

const PlanGrid = ({ 
  plans, 
  selectedPlan, 
  onSelectPlan 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isSelected={selectedPlan?.id === plan.id}
          onSelect={onSelectPlan}
        />
      ))}
    </div>
  )
}

export default PlanGrid
