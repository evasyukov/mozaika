import { Routes, Route } from "react-router-dom"
import styled from "styled-components"

import { Header } from "./components"

export default function Mozaika() {
  return (
    <AppColumn>
      <Header />

      <Routes>
        <Route path="/" element={<div>Главная страница</div>} />
        <Route path="/authorization" element={<div>Авторизация</div>} />
        <Route path="/register" element={<div> Регистрация </div>} />
        <Route path="/profile" element={<div>Профиль</div>} />
        <Route path="*" element={<div>Ошибка</div>} />
      </Routes>
    </AppColumn>
  )
}

const AppColumn = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;

  // min-height: 100%;

  // margin: 0 auto;
`
