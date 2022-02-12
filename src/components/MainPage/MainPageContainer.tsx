
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/index';
import { addTodo } from '../../redux/slice';
import {IState} from '../../interface/interface';
import { createPages } from '../../utils/createPages';
import { MainPage } from './MainPage';
 
export function MainPageContainer() {
	const [ todoContent, setTodoContent ] = useState('');
	const [ searchValue, setSearchValue ] = useState('');
	const [ isFiltered, setIsFiltered ] = useState(false)

	const dispatch = useDispatch<AppDispatch>();

	const totalCount = useSelector((state: IState) => state.totalCount);
	const perPage = useSelector((state: IState) => state.perPage);
	const todos = useSelector((state: IState) => state.todos);
    const currentPage = useSelector((state: IState) => state.currentPage);
    const pagesCount = Math.ceil(totalCount/perPage);
    const pages = createPages(pagesCount, currentPage);
    const offset = (currentPage - 1) * perPage;

	const newTodos = () => {
		const search = searchValue.toLowerCase().trim();
		return search
			? todos.filter(todo => Object.values(todo).some(elem => {
				return elem.toString().toLowerCase().includes(search)
			}))
			: todos;
	}

    const currentTodos = todos?.slice(offset, offset + perPage);

	useEffect(() => {
		searchValue.length ? setIsFiltered(true) : setIsFiltered(false);
	}, [searchValue])

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.id === 'addNew') {
			setTodoContent(event.target.value);
		}
		if (event.target.id === 'search') {
			setSearchValue(event.target.value);
		}
	}

	const handleCLick = () => {
		if (todoContent.length) {
			dispatch(addTodo({content: todoContent}));
			setTodoContent('');
		}
	}

	return (
		<MainPage 
			handleClick={handleCLick}
			handleChange={handleChange}
			currentTodos={currentTodos}
			newTodos={newTodos}
			isFiltered={isFiltered}
			todoContent={todoContent}
			todos={todos}
			perPage={perPage}
			pages={pages}
			currentPage={currentPage}
		/>
	);
}