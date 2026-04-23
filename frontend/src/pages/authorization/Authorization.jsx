import { useState, useEffect } from "react"
import { Link, Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import styled from "styled-components"

import { H2, Input, AuthFormError, AuthButton } from "../../components"
import { authorizeUser } from "../../slices/auth/authThunk"
import { clearAuthError } from "../../slices/auth/authSlice"
import { selectAuthUser } from "../../selectors"
import { ROLES } from "../../constants"

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .min(4, "Неверно заполнен логин. Минимум 4 символа")
    .max(15, "Неверно заполнен логин. Максимум 15 символов")
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
})

function AuthorizationContainer({ className }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  })

  const [showServerError, setShowServerError] = useState(false)

  const dispatch = useDispatch()
  const { error, roleId, status } = useSelector(selectAuthUser)

  function onSubmit({ login, password }) {
    setShowServerError(true)
    dispatch(authorizeUser({ login, password }))
  }

  const handleChange = () => {
    if (showServerError) {
      setShowServerError(false)
      dispatch(clearAuthError())
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clearAuthError())
    }
  }, [dispatch])

  const formError = errors?.login?.message || errors?.password?.message

  const errorMessage = formError || (showServerError ? error : null)

  if (roleId !== ROLES.GUEST) return <Navigate to="/" />

  return (
    <div className={className}>
      <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
        <H2>Вход в аккаунт</H2>

        <Input
          type="text"
          placeholder="username"
          title="Логин"
          {...register("login", {
            onChange: handleChange,
          })}
        />

        <Input
          type="password"
          placeholder="password"
          title="Пароль"
          {...register("password", {
            onChange: handleChange,
          })}
        />

        <AuthButton formError={formError} status={status}>
          {status === "loading" ? "Загрузка..." : "Авторизоваться"}
        </AuthButton>

        <Link
          to="/register"
          className="link"
          onClick={() => dispatch(clearAuthError())}
        >
          Зарегистрироваться
        </Link>
        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
      </form>
    </div>
  )
}

export const Authorization = styled(AuthorizationContainer)`
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

  .link {
    padding: 5px 10px;
    margin: 0 auto;

    text-align: center;
    color: #7c7cff;
    text-decoration: none;
    font-size: 16px;

    &:hover {
      text-decoration: underline;
    }
  }
`
