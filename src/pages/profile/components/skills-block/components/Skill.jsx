import { useState } from "react"
import styled from "styled-components"

function SkillContainer({ className, skillName }) {
  const [isPrimary, setIsPrimary] = useState(false)

  return (
    <div className={className} onClick={() => setIsPrimary(!isPrimary)}>
      <span className={"skill" + " " + (isPrimary ? "primary" : "")}>
        {skillName}
      </span>
    </div>
  )
}

export const Skill = styled(SkillContainer)`
  user-select: none;
  
  .skill {
    background: #1f2330;

    border: 1px solid #2a2f45;
    border-radius: 20px;

    padding: 6px 14px;
    font-size: 13px;

    cursor: pointer;
  }

  .skill.primary {
    background: rgba(124, 124, 255, 0.15);
    border-color: #7c7cff;
  }
`
