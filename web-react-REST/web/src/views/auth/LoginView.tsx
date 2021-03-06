import React, { useEffect, useState } from 'react'
import { Container } from './LoginView.style'
import { Button, Checkbox, Form, Input } from 'antd'
import { login } from '../../utils/fetch/fetchAPI'
import { useRecoilState } from 'recoil'
import { meState } from '../../stores/me'
import { useNavigate } from 'react-router-dom'

const LoginView: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [me, setMe] = useRecoilState(meState)
  const navigate = useNavigate()
  useEffect(() => {
    if (me){
      navigate('/')
    }
  })
  return (
    <Container>
      <h1>Sign in to Boilerplate</h1>
      <Form
        initialValues={{ remember: true }}
        onFinish={async (event) => {
          const { username, password } = event
          try {
            await login({
              username,
              password,
            }, setMe)
            history.back()
          } catch (e: ResponseType | any) {
            if (e.status !== 400){
              setErrorMessage(`Unknown error occurred: ${ e.status }`)
              return
            }
            const errorResponse = await e.json()
            setErrorMessage(errorResponse.message)
          }
        }}
      >
        <div className='login-form'>
          {!!errorMessage && (
            <p className='error-msg'>{errorMessage}</p>
          )}
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
