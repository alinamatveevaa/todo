import { IState } from "../interface/interface";

export const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('todos');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        throw new Error(`todos not found in Local Storage`);
    }
  };
  
export const saveToLocalStorage = (state: IState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('todos', serializedState);
    } catch (err) {
        throw new Error("Changes did not save in Local Storage");
    }
};