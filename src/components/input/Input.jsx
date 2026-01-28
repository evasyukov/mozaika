import styled from "styled-components"
import { forwardRef } from "react"

// eslint-disable-next-line no-unused-vars
const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
  return (
    <label className={className} ref={ref}>
      <span>{props.title}</span>
      <input type={props.type} placeholder={props.placeholder} {...props} />
    </label>
  )
})

export const Input = styled(InputContainer)`
  display: flex;
  flex-direction: column;
  gap: 6px;

  span {
    font-size: 16px;
    color: #c0c0c0;
  }

  input {
    background-color: #0f1117;
    border: 1px solid #2a2f45;
    border-radius: 6px;

    color: #e6e6e6;
    padding: 10px 12px;
    font-size: 14px;
  }

  input::placeholder {
    color: #6d6d6d;
  }

  input:focus {
    outline: none;
    border-color: #7c7cff;
  }
`
