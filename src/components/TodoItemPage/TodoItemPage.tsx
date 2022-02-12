
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ITodo } from '../../interface/interface';
import { RootState } from '../../redux';
import { changeIsItemContent } from '../../redux/slice';
import styles from './todoItemPage.module.css';

export default function TodoItemPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const todoList = useSelector((state: RootState) => state.todos);
    const id = (useParams().id)?.split('').slice(1).join('');

    const item = todoList.find((item: ITodo) => {
        return id === item.id ? item : null;
    })

    const [ itemState, setItemState ] = useState(item?.content);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setItemState(event.target.value);
    }

    const handleClick = (event: any) => {
        if (itemState && id) {
            dispatch(changeIsItemContent({content: itemState, id}));
        }
        navigate('/todo');
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Edit ToDo Item
            </h2>
            <div className={styles.editInput}>
                <input
                    className={styles.input}
                    type="text"
                    value={itemState}
                    onChange={handleChange}
                />
                <button
                    className={styles.editBtn}
                    onClick={handleClick}
                >
                    Edit
                </button>
            </div>
        </div>
    )
}
