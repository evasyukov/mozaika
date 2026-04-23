import styled from "styled-components"
import { Input, AuthButton } from "../../../../components"

function StepOneContainer({ register, onChange }) {
  return (
    <>
      <Input
        type="text"
        placeholder="username"
        title="Логин"
        {...register("login", { onChange })}
      />

      <Input
        type="password"
        placeholder="password"
        title="Пароль"
        {...register("password", { onChange })}
      />

      <Input
        type="password"
        placeholder="password"
        title="Введите пароль повторно"
        {...register("passcheck", { onChange })}
      />

      <AuthButton>Продолжить</AuthButton>
    </>
  )
}

export const StepOne = styled(StepOneContainer)``
