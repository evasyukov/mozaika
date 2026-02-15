import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

import { ButtonPrimary } from "../button-primary/ButtonPrimary"
import { SkillsBlock } from "../skills-block/SkillsBlock"
import { H2 } from "../H2/H2"

function ProjectContainer({
  className,
  id,
  name,
  title,
  skills,
  authorName,
  createdAt,
  isFooter = false,
}) {
  const navigate = useNavigate()

  return (
    <div className={className}>
      <Link to={`/project/${id}`}>
        <H2 textAling="left">{name}</H2>
      </Link>

      <p>{title}</p>

      <SkillsBlock skills={skills} />

      {isFooter ? (
        <div className="project-footer">
          <div className="project-info">
            <span className="author">Автор: {authorName}</span>
            <span className="author">Опубликовано: {createdAt}</span>
          </div>
          <ButtonPrimary onClick={() => navigate(`/project/${id}`)}>
            Подробнее
          </ButtonPrimary>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export const ProjectCard = styled(ProjectContainer)`
  display: flex;
  flex-direction: column;
  gap: 14px;

  width: 800px;

  background-color: #151821;
  border: 1px solid #1f2330;
  border-radius: 10px;

  padding: 20px;

  h2:hover {
    color: #5b45c8;
  }

  p {
    font-size: 14px;
    color: #b5b5b5;
  }

  .project-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .project-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .author {
    font-size: 12px;
    color: #9a9a9a;
  }
`
