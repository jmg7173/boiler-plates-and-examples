import styled from 'styled-components'

export const Logo = styled.div`
  color: black;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`
export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  background: #61dafb;
  .logo {
    padding-left: 10px;
  }
`
export const LeftContainer = styled.div`
  display: flex;
  text-align: center;
  align-content: flex-start;
  margin-right: auto;
  padding-left: 10px;
`
export const CenterContainer = styled.div`
  display: flex;
  text-align: center;
  align-content: center;
`
export const RightContainer = styled.div`
  display: flex;
  float: right;
  align-content: flex-end;
  margin-left: auto;
  padding-right: 10px;
  .user {
    position: relative;
    top: 4px;
    right: 20px;
  }
`
