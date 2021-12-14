import React from 'react'
import { Container } from './LoginView.style'
import { Button, Checkbox, Form, Input } from 'antd'

const LoginView: React.FC = () => {
  return (
    <Container>
      <h1>Sign in to Boilerplate</h1>
      <Form
        initialValues={{ remember: true }}
        onFinish={async (e) => {
          const { username, password } = e
          // FIXME: temporal code until add fetch uri
          const resp = await fetch('http://localhost:8000/v1/api/auth/login', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
            }),
          }).then((response) => {
            return response.json().then((data) => {
              return data
            })
          })
          console.log(resp)
        }}
      >
        <div className='login-form'>
        Username
        <Form.Item
          name='username'
        >
          <Input
            name='Username'
            placeholder='Username'
          />
        </Form.Item>
        Password
        <Form.Item
          name='password'
        >
          <Input.Password
            name='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item
          name='remember'
          style={{ textAlign: 'right' }}
          valuePropName='checked'
        >
          <Checkbox>
            Remember me
          </Checkbox>
        </Form.Item>
        <Form.Item
          style={{ textAlign: 'center' }}
        >
          <Button
            type='primary'
            htmlType='submit'
            className='sign-in-btn'
            block
          >
            Sign in
          </Button>
        </Form.Item>
        </div>
      </Form>
    </Container>
  )
}

export default LoginView
