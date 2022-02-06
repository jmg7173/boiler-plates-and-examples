import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
  max-width: 400px;
  height: 600px;
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
    > .signup-form {
      margin: 30px 40px 5px;
      > p.error-msg {
        color: red;
      }
      .sign-up-btn {
        border-radius: 10px;
      }
    }
  }
`
