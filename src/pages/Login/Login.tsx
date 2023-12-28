import {Button, Checkbox, Form, Input} from 'antd';
import React, {FC} from 'react';
import {login} from 'features/auth/modal/authSlice';
import {Navigate} from 'react-router-dom';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from 'shared/hook';

type FieldType = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

type FormikErrorType = Partial<FieldType>

export const Login: FC = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) {
                errors.password = 'Invalid password'
            }

            return errors
        },
        onSubmit: values => {
            dispatch(login(values))
            formik.resetForm()
        },
    })


    if (isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return (
        <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Form
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{rememberMe: true}}
            onFinish={formik.handleSubmit}
        >
            <Form.Item
                label="Email"
                {...formik.getFieldProps('email')}
            >
                <Input/>
            </Form.Item>
            {formik.errors.email && formik.touched.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
            <Form.Item
                label="Password"
                {...formik.getFieldProps('password')}
            >
                <Input.Password/>
            </Form.Item>
            {formik.errors.password && formik.touched.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
            <Form.Item
                valuePropName="checked"
                wrapperCol={{offset: 8, span: 16}}
                {...formik.getFieldProps('rememberMe')}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </div>
    )
};