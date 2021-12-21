import React from 'react'
import { Container } from './NotFoundView.style'
import { useNavigate } from 'react-router-dom'

const NotFoundView: React.FC = () => {
  const navigate = useNavigate();
  const onGoBackClick = () => {
    navigate(-1)
  }
  return (
    <Container>
      <h1>
        No such page!
      </h1>
      <a onClick={onGoBackClick}>Go back</a>
    </Container>
  )
}

export default NotFoundView
