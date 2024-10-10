import {createContext, useReducer} from "react";
import {shuffleAnswers, normalizeQuestions} from "../helpers";


const initialState = {
    currentQuestionIndex: 0,
    questions: [],
    showResults: false,
    answers: [],
    selectedAnswer: '',
    correctAnswers: 0,
    error: null,
    categories: [],
    currentCategory: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'NEXT_QUESTION':
            const showResults = state.currentQuestionIndex === state.questions.length - 1;
            const currentQuestionIndex = state.currentQuestionIndex + Number(!showResults);
            const answers = showResults ? state.answers : shuffleAnswers(state.questions[currentQuestionIndex]);
            return {
                ...state,
                currentQuestionIndex,
                showResults,
                answers,
                selectedAnswer: '',
            };
        case 'RESTART':
            return initialState;
        case 'SELECT_ANSWER':
            const correctAnswers = state.correctAnswers + Number(action.payload === state.questions[state.currentQuestionIndex].correctAnswer);
            return {
                ...state,
                selectedAnswer: action.payload,
                correctAnswers
            };
        case 'SET_QUESTIONS':
            const normalizedQuestions = normalizeQuestions(action.payload);
            return {
                ...state,
                questions: normalizedQuestions,
                answers: shuffleAnswers(normalizedQuestions[0])
            };
        case 'SERVER_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'SET_CATEGORIES':
            console.log('set categories', action.payload);
            return {
                ...state,
                categories: action.payload
            };
        case 'SELECT_CATEGORY':
            console.log('set category', action.payload);
            return {
                ...state,
                currentCategory: action.payload
            };
        default:
            return state;
    }
};
export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
    const value = useReducer(reducer, initialState);

    return (<QuizContext.Provider value={value}>
        {children}
    </QuizContext.Provider>);
};