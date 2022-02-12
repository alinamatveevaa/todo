
import { ChangeEvent } from 'react';
import { ITodo } from '../../interface/interface';
import List from '../List/List';
import Pagination from '../Pagination/Pagination';
import styles from './mainPage.module.css';

interface IMainPage {
    handleClick: () => void;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    currentTodos: ITodo[];
    newTodos: () => ITodo[];
    isFiltered: boolean;
    todoContent: string;
    todos: ITodo[];
    perPage: number;
    pages: number[];
	currentPage: number;
}
 
export function MainPage(data: IMainPage) {
    const { 
        handleChange, 
        handleClick, 
        currentTodos, 
        newTodos, 
        isFiltered, 
        todoContent, 
        perPage, 
        pages, 
        todos,
		currentPage 
    } = data;

    return (
        <div className={styles.container}>
			<h1 className={styles.mainTitle}>
				TODO LIST
			</h1>
			<div className={styles.addItemBlock}>
				<input
					id='addNew'
					className={styles.input}
					onChange={handleChange}
					value={todoContent}
					placeholder='Text your task..'
				/>
				<button
					className={styles.addBtn}
					onClick={handleClick}
				>
					Add
				</button>	
			</div>
			<div className={styles.filterBlock}>
				<input
					className={styles.filterInput}
					onChange={handleChange}
					id='search'
					type="text"
					placeholder='Text to filter items..'
				/>
			</div>
			{isFiltered ?
				<List items={newTodos()} /> :
				currentTodos  ? <List items={currentTodos} /> : null
			}
			<div className={styles.endTitle}>
                {(pages.length) === currentPage ? <div>End of the list</div> : null}
            </div>
			{isFiltered ?
				null :
				(todos?.length > perPage) ? <Pagination pages={pages} /> : null
			}
		</div>
    )
}