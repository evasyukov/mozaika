import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import styled from "styled-components"

import { H2, AuthFormError, ButtonBack } from "../../components"
import { registerUser } from "../../slices/auth/authThunk"
import { selectAuthUser } from "../../selectors"
import { ROLES } from "../../constants"

import { StepOne, StepTwo } from "./components"

const schemaStep1 = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .min(4, "Логин должен содержать минимум 4 символа")
    .max(15, "Логин должен содержать максимум 15 символов")
    .matches(/^[a-zA-Z0-9]+$/, "Только буквы и цифры"),

  password: yup
    .string()
    .required("Заполните пароль")
    .min(5, "Пароль должен быть не менее 5 символа"),

  passcheck: yup
    .string()
    .required("Введите пароль повторно")
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
})

const schemaStep2 = yup.object().shape({
  name: yup
    .string()
    .required("Введите имя")
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(15, "Имя должно содержать максимум 15 символов")
    .matches(
      /^[a-zA-Zа-яА-ЯёЁ]+(?:[ -][a-zA-Zа-яА-ЯёЁ]+)*$/,
      "Имя может содержать только буквы, пробелы и дефис",
    ),

  lastName: yup
    .string()
    .required("Введите фамилию")
    .min(2, "Фамилия должна содержать минимум 2 символа")
    .max(15, "Фамилия должна содержать максимум 15 символов")
    .matches(
      /^[a-zA-Zа-яА-ЯёЁ]+(?:[ -][a-zA-Zа-яА-ЯёЁ]+)*$/,
      "Фамилия может содержать только буквы, пробелы и дефис",
    ),

  direction: yup.string().required("Выберите направление"),
})

function RegistrationContainer({ className }) {
  const [step, setStep] = useState(1)
  const [showServerError, setShowServerError] = useState(false)

  const dispatch = useDispatch()
  const { error, roleId } = useSelector(selectAuthUser)

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
      name: "",
      lastName: "",
      direction: "",
    },
    resolver: yupResolver(step === 1 ? schemaStep1 : schemaStep2),
  })

  const handleChange = () => {
    if (showServerError) {
      setShowServerError(false)
    }
  }

  const onSubmit = async () => {
    if (step === 1) {
      const isValid = await trigger(["login", "password", "passcheck"])
      if (!isValid) return

      setStep(2)
      return
    }

    if (step === 2) {
      const data = getValues()

      dispatch(
        registerUser({
          login: data.login,
          password: data.password,
          profile: {
            name: data.name,
            last_name: data.lastName,
            direction: data.direction,
          },
        }),
      )
    }
  }

  const formError = Object.values(errors)[0]?.message
  const errorMessage = formError || error

  if (roleId !== ROLES.GUEST) return <Navigate to="/" />

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-header">
        <H2>Регистрация</H2>
      </div>

      {step === 1 ? (
        <>
          <p className="subtitle">Шаг 1 из 2</p>
          <StepOne register={register} onChange={handleChange} />
        </>
      ) : (
        <>
          <ButtonBack onClick={() => setStep(1)} />

          <p className="subtitle">Шаг 2 из 2</p>
          <StepTwo register={register} onChange={handleChange} />
        </>
      )}

      {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
    </form>
  )
}

export const Registration = styled(RegistrationContainer)`
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

  .subtitle {
    margin: 0;
    font-size: 12px;
    color: #bfbfbf;
    text-align: center;
  }
`
