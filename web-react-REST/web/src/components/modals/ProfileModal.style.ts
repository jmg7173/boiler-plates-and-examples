import styled from 'styled-components'

export const ProfileImgContainer = styled.div`
  .profileUploadButton {
    position: absolute;
    left: 170px;
    top: 170px;
    > button:nth-child(1) {
      padding: 0
    }
    > button:nth-child(2) {
      border-radius: 50% !important;
    }
  }
`
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  div {
    font-size: 15px;
    padding-bottom: 10px;
  }
  button {
    width: 30%;
    margin-top: 20px;
    margin-right: 10px;
    align-self: flex-end;
  }
`