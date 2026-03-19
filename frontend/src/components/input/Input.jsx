import styled from "styled-components"
import { forwardRef } from "react"

const InputContainer = forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ className, field, width, ...props }, ref) => {
    return (
      <label className={className} ref={ref}>
        <span>{props.title}</span>

        {field !== "textarea" ? (
          <input type={props.type} placeholder={props.placeholder} {...props} />
        ) : (
          <textarea
            type={props.type}
            rows="6"
            placeholder={props.placeholder}
            {...props}
          ></textarea>
        )}
      </label>
    )
  },
)

export const Input = styled(InputContainer)`
  display: flex;
  flex-direction: column;
  gap: 6px;

  span {
    font-size: 16px;
    color: #c0c0c0;
  }

  input,
  textarea {
    background-color: #0f1117;
    border: 1px solid #2a2f45;
    border-radius: 6px;

    color: #e6e6e6;
    padding: 10px 12px;
    font-size: 14px;
  }

  textarea {
    resize: none;
  }

  input::placeholder,
  textarea::placeholder {
    font-size: 14px;
    color: #6d6d6d;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #7c7cff;
  }
`
