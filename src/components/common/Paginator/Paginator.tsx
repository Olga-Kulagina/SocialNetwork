import React from 'react';
import s from './Paginator.module.css';

type PaginatorPropstype = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator: React.FC<PaginatorPropstype> = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {
                pages.map((p, index) =>
                    <span key={index} className={p === props.currentPage ? s.selectedPage : ''}
                          onClick={() => {
                              props.onPageChanged(p)
                          }}>{p}</span>
                )
            }
        </div>
    )
}