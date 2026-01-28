import styled from "styled-components"

import { H2 } from "../../../../components"
import { Skill } from "./components/Skill"

function SkillsBlockContainer({ className }) {
  const skills = [
    { name: "JavaScript" },
    { name: "React" },
    { name: "TypeScript" },
    { name: "HTML" },
    { name: "CSS" },
    { name: "Git" },
  ]

  

  return (
    <div className={className}>
      <H2 textAling="left" margin="0 0 16px">
        Навыки
      </H2>

      <div className="skills">
        {skills.map((skill) => (
          <Skill skillName={skill.name} key={skill.name} />
        ))}
      </div>
    </div>
  )
}

export const SkillsBlock = styled(SkillsBlockContainer)`
  margin-bottom: 16px;

  h3 {
    margin-bottom: 16px;
  }

  & .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  & .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  & .skill {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    background: #1f2330;
    border: 1px solid #2a2f45;
  }

  & .skill.primary {
    background: rgba(124, 124, 255, 0.15);
    border-color: #7c7cff;
    color: #dedeff;
  }
`
