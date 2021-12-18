import React, { useState } from 'react'
import { Container } from './SignUpView.style'
import { Button, Form, Input } from 'antd'
import { fetchAPI } from '../../utils/fetch/fetchAPI'

const SignUpView: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  return (
    <Container>
      <h1>Welcome to Boilerplate!</h1>
      <Form
        onFinish={async (event) => {
          const { username, email, password } = event
          try {
            const uri = '/auth/signup'
            await fetchAPI(uri, 'post', {
              username,
              email,
              password,
            })
            history.back()
          } catch (e: ResponseType | any) {
            if (e.status !== 400){
              setErrorMessage(`Unknown error occurred: ${ e.status }`)
              return
            }
            const errorResponse = await e.json()
            const {
              username: errorUsername,
              email: errorEmail,
              password: errorPassword,
            } = errorResponse.validation
            setErrorMessage([errorUsername, errorEmail, errorPassword].join('\n'))
          }
        }}
      >
        <div className='signup-form'>
          {!!errorMessage && (
            <p className='error-msg'>
              {errorMessage.split('\n').map((message: string) => {
                return (<>{ message }<br/></>)
              })}
            </p>
          )}
          Username
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Username field is required!' }]}
          >
            <Input
              name='Username'
              placeholder='Username'
            />
          </Form.Item>
          Email
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Email field is required!' },
              {
                message: 'Invalid email format!',
                type: 'email',
              },
            ]}
          >
            <Input
              name='email'
              placeholder='test@test.com'
            />
          </Form.Item>
          Password
          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Password field is required!' },
              {
                message: 'Need more than 8 characters, ' +
                  'mixed with upper, lower, numbers, specials(!@#$%^&*)!',
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,100}$/,
              },
            ]}
          >
            <Input.Password
              name='password'
              placeholder='Password'
            />
          </Form.Item>
          Check password
          <Form.Item
            name='checkPassword'
            dependencies={['password']}
            rules={[
              { required: true, message: 'Check your password!' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Password and password checking are different!')
                },
              }),
            ]}
          >
            <Input.Password
              placeholder='Check password'
            />
          </Form.Item>
          <Form.Item
            style={{ textAlign: 'center' }}
          >
            <Button
              type='primary'
              htmlType='submit'
              className='sign-up-btn'
              block
            >
              Sign Up
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Container>
  )
}

export default SignUpView