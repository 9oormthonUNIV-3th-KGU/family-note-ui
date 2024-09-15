import Header from '../components/Header'
import FamilyBox from '../components/FamilyBox'
import GetQuestionBtn from '../components/GetQuestionBtn'
import QuestionBox from '../components/QuestionBox'
import AnswerBox from '../components/AnswerBox'
import useQuestionStore from '../stores/useQuestionStore'

function Home() {
  const isAnswerVisible = useQuestionStore((state) => state.isAnswerVisible)

  return (
    <>
      <Header />
      <FamilyBox />
      <GetQuestionBtn />
      <QuestionBox />
      {isAnswerVisible && <AnswerBox />}
    </>
  )
}

export default Home
