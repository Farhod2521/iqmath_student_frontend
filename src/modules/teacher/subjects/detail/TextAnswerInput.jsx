// components/subject-detail/QuestionModal/TextAnswerInput.jsx
import { MathJax, MathJaxContext } from 'better-react-mathjax'

const TextAnswerInput = ({ correctAnswer, correctAnswerRu, onChange }) => {
  return (
    <div className="px-4 space-y-4">
      <MathJaxContext>
        <div>
          <label className="block mb-2">To&apos;g&apos;ri javob (O&apos;zbek tilida)</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => onChange('correctAnswer', e.target.value.replace(/\s/g, ''))}
            placeholder="Latex (O'zbek)"
            className="w-full px-3 py-2 mb-2 border rounded-lg"
          />
          <MathJax dynamic>{correctAnswer}</MathJax>
        </div>

        <div>
          <label className="block mb-2">To&apos;g&apos;ri javob (Rus tilida)</label>
          <input
            type="text"
            value={correctAnswerRu}
            onChange={(e) => onChange('correctAnswerRu', e.target.value.replace(/\s/g, ''))}
            placeholder="Latex (Rus)"
            className="w-full px-3 py-2 mb-2 border rounded-lg"
          />
          <MathJax dynamic>{correctAnswerRu}</MathJax>
        </div>
      </MathJaxContext>
    </div>
  )
}

export default TextAnswerInput
