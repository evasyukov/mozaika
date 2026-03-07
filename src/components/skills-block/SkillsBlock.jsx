import styled from "styled-components"

function SkillsBlockContainer({ className, skills = [], onRemove }) {
  /* TODO: доделать функционал по подсветке определенного навыка */

  return (
    <div className={className}>
      {skills.map((skill) => (
        <span key={skill} className="skill">
          {skill}
          {onRemove && (
            <button type="button" className="delete" onClick={() => onRemove(skill)}>
              ×
            </button>
          )}
        </span>
      ))}
    </div>
  )
}

export const SkillsBlock = styled(SkillsBlockContainer)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .skill {
    display: flex;
    gap: 8px;

    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    background-color: #1f2330;
    border: 1px solid #2a2f45;
  }

  .skill.primary {
    background-color: rgba(124, 124, 255, 0.15);
    border-color: #7c7cff;
    color: #dedeff;
  }

  .delete {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
`
