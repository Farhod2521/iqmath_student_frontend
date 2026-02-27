import React from 'react'
import QuickAddition from './games/QuickAddition'
import MemoryCards from './games/MemoryCards'
import OddEven from './games/OddEven'
import ShapeMatch from './games/ShapeMatch'
import LogicSequence from './games/LogicSequence'
import BiggerSmaller from './games/BiggerSmaller'
import FocusClick from './games/FocusClick'

export default function GameRenderer({ slug }) {
  switch (slug) {
    case 'quick-addition':
      return <QuickAddition />
    case 'memory-cards':
      return <MemoryCards />
    case 'odd-even':
      return <OddEven />
    case 'shape-match':
      return <ShapeMatch />
    case 'logic-sequence':
      return <LogicSequence />
    case 'bigger-smaller':
      return <BiggerSmaller />
    case 'focus-click':
      return <FocusClick />
    default:
      return (
        <div className="p-6 bg-white border rounded-2xl">
          <div className="font-extrabold">O‘yin topilmadi</div>
          <div className="mt-2 text-gray-600">Slug: {slug}</div>
        </div>
      )
  }
}
