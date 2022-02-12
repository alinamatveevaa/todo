
import styles from './item.module.css';
import { useDispatch } from 'react-redux';
import { ITodo } from '../../interface/interface';
import { AppDispatch } from '../../redux';
import { removeTodo, changeIsDone } from '../../redux/slice';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { formatDate } from '../../utils/formatDate';

interface IItem {
    data: ITodo;
    key: string;
}

export default function Item({data}: IItem) {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [ isConfirm, setIsConfirm ] = useState(false);

    const handleClick = (event: any) => {

        let id = event.target.id;

        if (id === 'change') {
            dispatch(changeIsDone({ 
                isDone: !data.isDone,
                id: data.id,
                updatedAt: formatDate(new Date())
            }));
        }
        if (id === 'remove') {
            setIsConfirm(true);
        }
        if (id === 'edit') {
            navigate(`/todo:${data.id}`);
        }
    }

    return (
        <li className={data.isDone ? styles.itemIsDone : styles.itemNotDone}>
            <div className={styles.left}>
                <h4 className={styles.itemTitle}>
                    {data.content}
                </h4>
                <span className={styles.createdAt}>
                    <strong>added: </strong>{data.createdAt}
                </span>
                {data.isDone && 
                    <span className={styles.updatedAt}>
                        <strong>updated: </strong>{data.updatedAt}
                    </span>
                }
            </div>
            <div className={styles.controls}>
                <button
                    id='change'
                    className={data.isDone ? styles.changeBtnDone : styles.changeBtn}
                    onClick={handleClick}
                />
                <button
                    id='remove'
                    className={styles.removeBtn}
                    onClick={handleClick} 
                />
                <button
                    id='edit'
                    className={styles.editBtn}
                    onClick={handleClick}
                />
                {isConfirm && 
                    <div className={styles.confirm}>
                        <p>Are you sure you want to delete the Task?</p>
                        <div className={styles.confirmBtns}>
                            <button
                                className={styles.okBtn}
                                onClick={() => {
                                    setIsConfirm(false)
                                    dispatch(removeTodo(data.id));
                                }}
                            >Yes</button>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => {
                                    setIsConfirm(false)
                                }}
                            >Cancel</button>
                        </div>
                    </div>
                }
            </div>
        </li>
    )
}
