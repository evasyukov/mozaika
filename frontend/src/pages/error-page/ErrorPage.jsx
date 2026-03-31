import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { H2, ButtonBack, ButtonPrimary, AuthFormError } from "../../components"

function ErrorPageContainer({ className, error, description }) {
  const message =
    typeof error === "string"
      ? error
      : error?.message || "Произошла неизвестная ошибка"

  const navigate = useNavigate()

  return (
    <div className={className}>
      <H2>Ошибка</H2>

      <AuthFormError>{message}</AuthFormError>

      <div className="error-description">{description}</div>

      <div className="error-actions">
        <ButtonBack onClick={() => navigate(-1)}>Назад</ButtonBack>

        <ButtonPrimary onClick={() => navigate("/")}>На главную</ButtonPrimary>
      </div>
    </div>
  )
}

export const ErrorPage = styled(ErrorPageContainer)`
  max-width: 800px;
  margin: 80px auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .error-title {
    font-size: 28px;
    font-weight: 600;
  }

  .error-block {
    background: rgba(255, 80, 80, 0.08);
    border: 1px solid rgba(255, 80, 80, 0.35);
    color: #ff7a7a;

    padding: 16px 18px;
    border-radius: 8px;

    font-size: 14px;
    line-height: 1.5;
  }

  .error-description {
    font-size: 13px;
    color: #9a9a9a;
  }

  .error-actions {
    display: flex;
    gap: 12px;
  }

  .primary {
    background: linear-gradient(135deg, #7c7cff, #5f5fff);
    color: #0f1115;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  .secondary {
    background: #1f2330;
    color: #e6e6e6;
    border: 1px solid #2a2f45;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
  }
`
