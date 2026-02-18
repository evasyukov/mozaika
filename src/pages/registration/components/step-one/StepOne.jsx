import styled from "styled-components"
import { Input, AuthButton } from "../../../../components"

function StepOneContainer({ register }) {
  return (
    <>
      <Input
        type="text"
        placeholder="username"
        title="Логин"
        {...register("login")}
      />

      <Input
        type="password"
        placeholder="password"
        title="Пароль"
        {...register("password")}
      />

      <Input
        type="password"
        placeholder="password"
        title="Введите пароль повторно"
        {...register("passcheck")}
      />

      <AuthButton type="button">Продолжить</AuthButton>
    </>
  )
}

export const StepOne = styled(StepOneContainer)``
