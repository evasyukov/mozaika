import styled from "styled-components"

import { H2 } from "../../../../components"
import {
  ButtonSecondary,
  ButtonDelete,
  SkillsBlock,
} from "../../../../components"

function ProjectContentContainer({ className, project, author, isAuthor }) {
  return (
    <div className={className}>
      <header>
        <div className="title">
          <h1>{project.name}</h1>
          <div className="actions-button">
            {isAuthor && <ButtonSecondary>Редактировать</ButtonSecondary>}
            {isAuthor && <ButtonDelete>Удалить</ButtonDelete>}
          </div>
        </div>

        <p className="subtitle">{project.title}</p>

        <SkillsBlock skills={project.skills} />
      </header>

      <section>
        <H2 textAling="left" margin="0 0 12px 0">
          Описание проекта
        </H2>
        <p>{project.description}</p>
      </section>

      <section>
        <H2 textAling="left" margin="0 0 12px 0">
          Автор проекта
        </H2>
        <div className="author">
          <div className="avatar" />
          <span>
            {author.name} {author.lastName}
          </span>
        </div>
      </section>
    </div>
  )
}

export const ProjectContent = styled(ProjectContentContainer)`
  header {
    margin-bottom: 32px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .actions-button {
    display: flex;
    gap: 8px;
  }

  .subtitle {
    margin: 0 0 16px;
    color: #b0b0b0;
  }

  section {
    margin-bottom: 32px;

    p,
    li {
      color: #cfcfcf;
      line-height: 1.6;
    }

    ul {
      padding-left: 20px;
    }
  }

  .author {
    display: flex;
    align-items: center;
    gap: 12px;

    .avatar {
      width: 48px;
      height: 48px;

      background-color: #2a2f45;
      border-radius: 50%;
    }
  }
`
