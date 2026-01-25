import { Routes, Route } from "react-router-dom"
import styled from "styled-components"

import { Header } from "./components"
import { Authorization, Registrarion } from "./pages"

export default function Mozaika() {
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
