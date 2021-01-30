import React, {useState} from 'react';
import s from './Paginator.module.css';

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

export const Paginator: React.FC<PaginatorPropsType> = (props) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize

    return (
        <div className={s.center}>
            <button className={s.navBtn} onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}
                    disabled={portionNumber === 1}>Prev
            </button>
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, index) =>
                    <button key={index} className={`${s.pageBtn} ${p === props.currentPage ? s.selectedPage : ''}`}
                          disabled={p === props.currentPage} onClick={() => {
                              props.onPageChanged(p)
                          }}>{p}</button>
                )}
            <button className={s.navBtn} onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}
                    disabled={portionNumber === portionCount}>Next
            </button>
        </div>
    )
}