
import styles from './list.module.css';
import { ITodo } from "../../interface/interface";
import Item from "../Item/Item";
interface IList {
    items: ITodo[];
}

export default function List({items}: IList) {
    return (
        <ul className={styles.listTodo}>
            {items.map((todo: ITodo) => {
                return <Item key={todo.id} data={todo}  />
            })}
        </ul>
    )
}
