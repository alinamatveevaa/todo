
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../interface/interface';
import { changeCurrentPage } from '../../redux/slice';
import styles from './pagination.module.css';

interface IPagination {
    pages: number[],
}

export default function Pagination({pages}: IPagination) {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: IState) => state.currentPage);

    return (
        <div className={styles.pages}>
            {pages.map((page: number, index: number) => {
                return <span 
                    key={index}
                    className={currentPage === page ? styles.activePage : styles.page}
                    onClick={() => {
                        dispatch(changeCurrentPage({currentPage: page}));
                    }}
                >
                    {page}
                </span>
            })}
        </div>
    )
}
