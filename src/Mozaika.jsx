import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { Header } from "./components"
import { Authorization, Registrarion } from "./pages"
import { useInitAuth } from "./hooks"
import { selectIsAuthInitialized } from "./selectors"

export default function Mozaika() {
  useInitAuth()
  const isInitialized = useSelector(selectIsAuthInitialized)

  if (!isInitialized) {
    return null
  }
  return (
    <>
      <Header />

      <AppColumn>
        <Routes>
          <Route path="/" element={<div>Главная страница</div>} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/register" element={<Registrarion />} />
          <Route path="/profile" element={<div>Профиль</div>} />
          <Route path="*" element={<div>Ошибка</div>} />
        </Routes>
      </AppColumn>
    </>
  )
}

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;
`
