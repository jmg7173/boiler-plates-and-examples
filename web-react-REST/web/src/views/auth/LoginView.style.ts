import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
  max-width: 400px;
  height: 450px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  padding-left: 8px;
  padding-right: 8px;
  
  > h1 {
    margin-top: 40px;
  }
  > .ant-form {
    text-align: left;
    border-radius: 20px;
    border: 2px outset black;
    margin-top: 30px;
    > .login-form {
      margin: 30px 40px 5px;
      > p.error-msg {
        color: red;
        font-weight: bold;
      }
      > .ant-row {
        margin-bottom: 10px;
      }
      .sign-in-btn {
        color: white;
        height: 35px;
        font-weight: bold;
        text-align: center;
        background: #238636;
        border: transparent;
        border-radius: 10px;
        margin-top: 40px;
        margin-bottom: 5px;
        transition-duration: 0.3s;
      }
      .sign-in-btn:hover {
        background: #3cab51;
      }
    }
  }
`