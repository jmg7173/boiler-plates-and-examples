import React from 'react'
import { Container } from './LoginView.style'
import { Button, Checkbox, Form, Input } from 'antd'

const LoginView: React.FC = () => {
  return (
    <Container>
      <h1>Sign in to Boilerplate</h1>
      <Form
        initialValues={{ remember: true }}
        onFinish={(e) => {
          const { username, password } = e
          // FIXME: temporal code until add fetch uri
          console.log(username, password)
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
