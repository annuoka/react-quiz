export const shuffleAnswers = question => {
    const unshuffledAnswers = [question.correctAnswer, ...question.incorrectAnswers];

    return unshuffledAnswers.map(answer => ({sort: Math.random(), value: answer}))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value);
}

export const normalizeQuestions = (beQuestions) => {
    return beQuestions.map((question) => {
        const incorrectAnswers = question.incorrect_answers.map(
            (incorrectAnswer) => decodeURIComponent(incorrectAnswer));
        return {
            correctAnswer: decodeURIComponent(question.correct_answer),
            question: decodeURIComponent(question.question),
            incorrectAnswers
        }
    })
}