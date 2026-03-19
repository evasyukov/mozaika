import styled from "styled-components"
import { Input, AuthButton } from "../../../../components"

function StepTwoContainer({ className, register, status, formError }) {
  return (
    <div className={className}>
      <Input type="text" placeholder="Имя" title="Имя" {...register("name")} />

      <Input
        type="text"
        placeholder="Фамилия"
        title="Фамилия"
        {...register("lastName")}
      />

      <div className="auth-field">
        <label htmlFor="direction">Направление</label>

        <select {...register("direction")}>
          <option value="" defaultValue="" disabled>
            Выберите направление
          </option>
          <option value="Frontend разработчик">Frontend</option>
          <option value="Backend разработчик">Backend</option>
          <option value="Fullstack разработчик">Fullstack</option>
        </select>
      </div>

      <AuthButton formError={formError} status={status}>
        {status === "loading" ? "Загрузка..." : "Завершить регистрацию"}
      </AuthButton>
    </div>
  )
}

export const StepTwo = styled(StepTwoContainer)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .auth-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  select {
    background-color: #0f1117;
    border: 1px solid #2a2f45;
    border-radius: 6px;

    color: #e6e6e6;
    padding: 10px 12px;
    font-size: 14px;

    appearance: none;
    cursor: pointer;

    option:active {
      cursor: pointer;
      background-color: #0f1117;
    }
  }

  select:focus {
    outline: none;
    border-color: #7c7cff;
  }
`
