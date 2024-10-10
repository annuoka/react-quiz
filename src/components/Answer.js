const Answer = ({answerText, onSelectAnswer, index, selectedAnswer, correctAnswer}) => {
    const letterMapping = ['A', 'B', 'C', 'D'];
    const isCorrectAnswer = selectedAnswer && answerText === correctAnswer;
    const isWrongAnswer = selectedAnswer && selectedAnswer !== correctAnswer && selectedAnswer === answerText;

    const correctAnswerClass = isCorrectAnswer ? 'correct-answer': '';
    const wrongAnswerClass = isWrongAnswer ? 'wrong-answer': '';
    const disabledClass = selectedAnswer ? 'disabled': '';

    return (<div className={`answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`}
                 onClick={() => onSelectAnswer(answerText)}>
        <div className="answer-letter">{letterMapping[index]}</div>
        <div className="answer-text">{answerText}</div>
    </div>);
};

export default Answer;