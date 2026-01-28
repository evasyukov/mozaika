import { Link } from "react-router-dom"
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

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .min(4, "Неверно заполнен логин. Минимум 4 символа")
    .max(15, "Неверный заполнен логин. Максимум 15 символов")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Логин может содержать только буквы латинского алфавита и цифры",
    ),
  password: yup
    .string()
    .required("Заполните пароль")
    .matches(
      /^[\w#%]+$/,
      "Для пароля допускаются следующие символы: A-Z, a-z, 0-9",
    )
    .min(5, "Пароль должен быть не менее 5 символов")
    .max(30, "Неверный заполнен пароль. Максимум 30 символов"),
  passcheck: yup
    .string()
    .required("Введите пароль повторно")
    .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
})

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
    },
    resolver: yupResolver(authFormSchema),
  })

  const dispatch = useDispatch()
  const roleId = useSelector(selectUserRole)
  const status = useSelector(selectAuthStatus)
  const serverError = useSelector(selectAuthError)

  function onSubmit({ login, password }) {
    dispatch(registerUser({ login, password }))
  }

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passcheck?.message

  const errorMessage = formError || serverError

  if (roleId !== ROLE.GUEST) return <Navigate to="/" />

  return (
    <div className={className}>
      <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
        <H2>Вход в аккаунт</H2>

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

        <AuthButton formError={formError} status={status}>
          {status === "loading" ? "Загрузка..." : "Зарегистрироваться"}
        </AuthButton>

        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
      </form>
    </div>
  )
}

export const Registrarion = styled(RegistrarionContainer)`
  margin-top: 70px;

  .auth-card {
    display: flex;
    flex-direction: column;
    gap: 20px;

    width: 400px;
    padding: 30px;

    background-color: #151821;
    border: 1px solid #1f2330;
    border-radius: 10px;
  }

  .auth-submit {
    background-color: #7c7cff;
    border: none;
    border-radius: 6px;

    color: #0f1117;
    font-size: 16px;
    font-weight: 600;

    padding: 10px;
    cursor: pointer;
  }

  .auth-submit:hover {
    background-color: #8b8bff;
  }
`
