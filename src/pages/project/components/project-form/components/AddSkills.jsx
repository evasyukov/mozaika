import { useState } from "react"
import styled from "styled-components"

function AddSkillsContainer({ className, skills, onAdd, onRemove }) {
  const [inputValue, setInputValue] = useState("")

  function handleAdd() {
    if (inputValue && !skills.includes(inputValue)) {
      onAdd(inputValue)
      setInputValue("")
    }
  }

  function onSkillChange({ target }) {
    setInputValue(target.value)
  }

  return (
    <div className={className}>
      <label>Технологии и навыки</label>

      <div className="skills-input">
        <div className="skills-list">
          {skills.map((skill) => (
            <span
              key={skill}
              className="skill-tag"
              onClick={() => onRemove(skill)}
              title="Нажмите для удаления"
            >
              {skill} ×
            </span>
          ))}
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={onSkillChange}
          placeholder="Введите навык"
        />

        <button
          type="button"
          onClick={handleAdd}
          className="add-skill-button"
        >
          Добавить
        </button>
      </div>
    </div>
  )
}

export const AddSkills = styled(AddSkillsContainer)`
  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    margin: 16px 0;
  }

  .skill-tag {
    background-color: #1f2330;
    border: 1px solid #2a2f45;
    border-radius: 12px;

    padding: 4px 10px;
    cursor: pointer;
    font-size: 13px;
  }

  .skills-input input {
    background-color: #151821;
    color: #fff;

    border: 1px solid #2a2f45;
    border-radius: 6px;

    padding: 6px 8px;
    margin-right: 8px;
  }

  .add-skill-button {
    background-color: #1f2330;
    color: #fff;
    
    border: 1px solid #2a2f45;
    border-radius: 6px;

    padding: 6px 12px;
    cursor: pointer;
  }

  .add-skill-button:hover {
    background-color: #262b3d;
  }
`
