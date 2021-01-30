import React from 'react';
import { useFormik } from 'formik';
import {FilterType} from '../../../redux/users-reducer';
import s from './UsersSearchForm.module.css'

type UsersSearchFormType = {
    onFilterChanged: (filter: FilterType) => void
}


export const UsersSearchForm = (props: UsersSearchFormType) => {

    const submit = (values: FilterType) => {
        props.onFilterChanged(values)
    }

    const formik = useFormik({
        initialValues: {
            term: '',
        },
        onSubmit: values => {
            submit(values)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}
              className={s.searchForm}>
            <input
                className={s.searchInput}
                id="term"
                name="term"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.term}
            />
            <button className={s.findBtn} type="submit">Find</button>
        </form>
    );

}