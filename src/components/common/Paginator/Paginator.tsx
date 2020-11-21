import React, {useState} from 'react';
import s from './Paginator.module.css';

type PaginatorPropstype = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

export const Paginator: React.FC<PaginatorPropstype> = (props) => {

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
        <div>
            {
                portionCount > 1 &&
                    <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, index) =>
                <span key={index} className={`${p === props.currentPage ? s.selectedPage : ''} ${s.page}`}
                      onClick={() => {
                          props.onPageChanged(p)
                      }}>{p}</span>
            )}
            {
                portionCount > portionNumber &&
                <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>
            }
        </div>
    )
}