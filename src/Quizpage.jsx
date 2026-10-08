export default function Quizpage({
  quiz,
  onClick,
  selectedAnswers,
  score,
  isChecking,
  onCheckAnswer,
  resetGame
}) {
  return (
    <section className="flex flex-col gap-4 jusitfy-center max-w-3xl mx-auto mt-4">
      {quiz.map((items, index) => {
        return (
          <div
            className="flex flex-col gap-2 p-4 border-[#DBDEF0] border-b-2"
            key={`question-${index}`}
          >
            <p className="text-[#293264] font-bold text-base font-">
              {items.question}
            </p>
            <div className="flex gap-2 ">
              {items.shuffledOptions?.map((option, optionIndex) => {
                const isSelected = selectedAnswers.some(
                  (ans) => ans.qIndex === index && ans.answer === option,
                );
                const isCorrectAnswer = option === items.correct_answer;
                let buttonStyles = "border-[#4D5B9E] hover:bg-[#F5F7FB]";
                if (isChecking) {
                  if (isCorrectAnswer) {
                    buttonStyles =
                      "bg-[#94D7A2] border-[#94D7A2] text-[#293264] opacity-100";
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonStyles =
                      "bg-[#F8BCBC] border-[#F8BCBC] text-[#293264] opacity-50";
                  } else {
                    buttonStyles =
                      "border-[#DBDEF0] text-[#293264] opacity-50 pointer-events-none";
                  }
                }else if(isSelected){ 
                   buttonStyles = "bg-[#D6DBF5] border-[#D6DBF5] text-[#293264]"
                }

                return (
                  <button
                    onClick={() => onClick(index, option)}
                    key={`q${index}-opt${optionIndex}`}
                    className={`text-[12px] px-4 py-1 font-medium rounded-xl border transition-colors ${
                      isChecking ? "cursor-default" : "cursor-pointer"
                    } ${buttonStyles}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex mx-auto gap-2 items-center ">
        {isChecking && (
          <p className="text-[#293264] font-bold text-base">
            You scored {score}/{quiz.length} correct answers
          </p>
        )}
        <button
          onClick={isChecking?()=>resetGame():() => onCheckAnswer()}
          className="flexw-30 h-8.75 font-semibold text-[10.24px] text-[#F5F7FB] py-2 px-4 bg-[#4D5B9E] rounded-xl"
        >
          {isChecking ? "Play again" : "Check answers"}
        </button>
      </div>
    </section>
  );
}
