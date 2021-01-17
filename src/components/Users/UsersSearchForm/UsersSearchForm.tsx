import React from 'react';
import { useFormik } from 'formik';
import {FilterType} from '../../../redux/users-reducer';

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
        <form onSubmit={formik.handleSubmit}>
            <input
                id="term"
                name="term"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.term}
            />
            <button type="submit">Find</button>
        </form>
    );

}