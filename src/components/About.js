import React from 'react'
import styled from 'styled-components'
import Title from './Title'
import services from '../constants/services'
const About = () => {
  return (
    <Wrapper className="section">
      <Title title="About Us" />
      <div className="section-center">
        {services.map(({ id, icon, label, text }) => {
          return (
            <article key={id}>
              <span className="icon">{icon}</span>
              <h4>{label}</h4>
              <p>{text}</p>
            </article>
          )
        })}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .section-center {
    margin-top: 4rem;
    display: grid;
    gap: 2rem;
    /* safari workaround */
    grid-gap: 2rem;
    article {
      display: grid;
      justify-items: center;
    }
    .icon {
      font-size: 4rem;
      color: var(--clr-primary-5);
      margin-bottom: 0.5rem;
    }
    h4 {
      text-transform: uppercase;
      font-weight: 500;
    }
    p {
      color: var(--clr-grey-3);
      max-width: 35em;
    }
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`
export default About
