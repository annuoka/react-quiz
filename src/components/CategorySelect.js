import { PrimeReactProvider } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';

import {useContext} from "react";
import {QuizContext} from "../contexts/quiz";

const CategorySelect = ({categories}) => {
    const [quizState, dispatch] = useContext(QuizContext);
    const currentCategory = quizState.currentCategory;

    return (<PrimeReactProvider>
        <Dropdown
            value={currentCategory}
            onChange={(e) => dispatch({type: 'SELECT_CATEGORY', payload: e.target.value.id})}
            options={quizState.categories}
            optionLabel="name"
            placeholder="Select a Category"
            className="w-full"
            style={{minWidth: 370}} />
    </PrimeReactProvider>);
}

export default CategorySelect;