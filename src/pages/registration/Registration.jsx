import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import styled from "styled-components"

import { H2, Input, AuthFormError, AuthButton } from "../../components"
import { registerUser } from "../../slices/auth/authThunk"
import {
  selectAuthError,
  selectAuthStatus,
  selectUserRole,
} from "../../selectors"
import { ROLE } from "../../constants"

import { StepOne, StepTwo } from "./components"

const authFormSchema = (step) => {
  if (step === 1) {
    return yup.object().shape({
      login: yup
        .string()
        .required("Заполните логин")
        .min(4, "Минимум 4 символа")
        .max(15, "Максимум 15 символов")
        .matches(/^[a-zA-Z0-9]+$/, "Только латиница и цифры"),

      password: yup
        .string()
        .required("Заполните пароль")
        .min(5, "Минимум 5 символов")
        .max(30, "Максимум 30 символов"),

      passcheck: yup
        .string()
        .required("Введите пароль повторно")
        .oneOf([yup.ref("password")], "Пароли не совпадают"),
    })
  }

  if (step === 2) {
    return yup.object().shape({
      name: yup.string().required("Введите имя"),
      lastName: yup.string().required("Введите фамилию"),
      direction: yup.string().required("Выберите направление"),
    })
  }

  return yup.object()
}

function RegistrarionContainer({ className }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
      name: "",
      lastName: "",
      direction: "",
    },
    resolver: yupResolver(yup.lazy(() => authFormSchema(step))),
  })

  const [step, setStep] = useState(1)

  const dispatch = useDispatch()
  const roleId = useSelector(selectUserRole)
  const status = useSelector(selectAuthStatus)
  const serverError = useSelector(selectAuthError)

  function onSubmit({ login, password, name, lastName, direction }) {
    if (step === 1) {
      setStep(2)
    }

    if (step === 2) {
      const registerData = { login, password, name, lastName, direction }

      dispatch(registerUser({ data: registerData }))
    }
  }

  const formError = Object.values(errors)[0]?.message
  const errorMessage = formError || serverError

  if (roleId !== ROLE.GUEST) return <Navigate to="/" />

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-header">
        {step === 2 && (
          <button className="back-button" onClick={() => setStep(1)}>
            ← Назад
          </button>
        )}
        <H2>Регистрация</H2>
      </div>

      {step === 1 ? (
        <>
          <p className="subtitle">Шаг 1 из 2 — данные для входа</p>
          <StepOne register={register} />
        </>
      ) : (
        <>
          <p className="subtitle">Шаг 2 из 2 — информация о пользователе</p>
          <StepTwo register={register} status={status} formError={formError} />
        </>
      )}

      {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
    </form>
  )
}

export const Registrarion = styled(RegistrarionContainer)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 400px;
  padding: 30px;

  background-color: #151821;
  border: 1px solid #1f2330;
  border-radius: 10px;

  margin-top: 70px;

  .form-header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .back-button {
    position: absolute;
    left: 0;

    background: none;
    border: none;
    color: #7c7cff;
    font-size: 14px;
    cursor: pointer;
  }

  .subtitle {
    margin: 0;
    font-size: 12px;
    color: #bfbfbf;
    text-align: center;
  }
`
