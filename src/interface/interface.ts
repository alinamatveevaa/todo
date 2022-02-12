export interface ITodo {
    id: string;
    content: string;
    isDone: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IState {
	todos: ITodo[],
	currentPage: number,
	perPage: number,
	totalCount: number,
}
