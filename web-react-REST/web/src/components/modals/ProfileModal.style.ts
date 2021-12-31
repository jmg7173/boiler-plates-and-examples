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
  height: 100%;
  font-size: 18px;
  padding-top: 30px;
  .userInfo {
    margin-bottom: 10px;
    .anticon {
      padding-right: 10px;
    }
  }
  .onEditButtonWrapper {
    align-self: flex-end;
    margin-top: auto;
    position: relative;
    width: 100%;
    text-align: end;
    button {
      width: 30%;
      &:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
  button.editProfileButton {
    width: 30%;
    margin-top: auto;
    margin-right: 10px;
    align-self: flex-end;
  }
`