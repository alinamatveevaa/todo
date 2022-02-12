import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { MainPageContainer } from './components/MainPage/MainPageContainer';
import TodoItemPage from './components/TodoItemPage/TodoItemPage';

export function App() {
	return (
		<Router>
			<Routes>
				<Route path='/todo' element={<MainPageContainer />} />
				{/* <Route path='/todo/:currentPage' element={<MainPageContainer />} /> */}
				<Route path='/todo:id' element={<TodoItemPage />} />
				<Route path='*' element={
					<h2 className='notFound'>
						Page Not Found
					</h2>
				} />
			</Routes>
		</Router>
	);
}