import { useEffect, useRef } from 'react'
import useQuestionStore from '../stores/UseQuestionStore'

export const useFetchQuestions = (familyId: number) => {
  const hasFetched = useRef(false)
  const { fetchQuestions } = useQuestionStore((state) => ({
    fetchQuestions: state.fetchQuestions,
  }))

  useEffect(() => {
    const fetchData = async () => {
      if (!hasFetched.current) {
        try {
          await fetchQuestions(familyId, 0, 45)
        } catch (error) {
          console.error('질문을 가져오는 중 오류 발생:', error)
        }
        hasFetched.current = true
      }
    }

    fetchData()
  }, [fetchQuestions, familyId])
}
