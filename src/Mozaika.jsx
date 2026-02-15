import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { Header } from "./components"
import { Authorization, Registrarion, Profile, Project } from "./pages"
import { useInitAuth } from "./hooks"
import { selectIsAuthInitialized } from "./selectors"
import { register } from "./bff/operations"
import { Main } from "./pages/main/Main"

export default function Mozaika() {
  useInitAuth()
  const isInitialized = useSelector(selectIsAuthInitialized)

  register("user", "user2")

  if (!isInitialized) {
    return null
  }
  return (
    <>
      <Header />

      <AppColumn>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/register" element={<Registrarion />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />

          <Route path="/project" element={<Project />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/project/:id/edit" element={<Project />} />

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

  width: 100%;

  margin: 0 auto;
`
