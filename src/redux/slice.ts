import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IState, ITodo } from "../interface/interface";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../utils/formatDate";
 
const initialState: IState = {
	todos: [],
	currentPage: 1,
	perPage: 15,
	totalCount: 0,
};

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo(state, action: PayloadAction<{content: string}>) {
			state.todos.push({
				id: uuidv4(),
				content: action.payload.content,
				isDone: false,			
				createdAt: formatDate(new Date()),
				updatedAt: '',
			})
			state.totalCount += 1;
		},
		removeTodo(state, action: PayloadAction<string>) {
			const index = state.todos.findIndex((todo: ITodo) => todo.id === action.payload);
			state.todos.splice(index, 1);
			state.totalCount -= 1;
		},
		changeIsDone(
			state,
			action: PayloadAction<{ isDone: boolean, id: string, updatedAt: string, }>
		) {
			const index = state.todos.findIndex((todo: ITodo) => todo.id === action.payload.id);
			state.todos[index].isDone = action.payload.isDone;
			state.todos[index].updatedAt = action.payload.updatedAt;
		},
		changeIsItemContent(
			state,
			action: PayloadAction<{ content: string; id: string }>
		) {
			const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
			state.todos[index].content = action.payload.content;
		},
		changeCurrentPage(
			state,
			action: PayloadAction<{ currentPage: number }>
		) {
			state.currentPage = action.payload.currentPage;
		},
	},
});
 
export const { addTodo, removeTodo, changeIsDone, changeIsItemContent, changeCurrentPage } = todoSlice.actions;
export default todoSlice.reducer;
