import React, { useState } from 'react'
import styled from 'styled-components'

const SearchButtons = ({ projects, setProjects, setBackAllProjects }) => {
  const [index, setIndex] = useState(0)
  const categoryList = [
    'All',
    ...new Set(
      projects.map(project => {
        const category = project.data.categories
        return category
      })
    ),
  ]
  console.log(categoryList)

  const selectCategory = (category, categoryIndex) => {
    setIndex(categoryIndex)
  }
  return (
    <Wrapper>
      {categoryList.map((category, categoryIndex) => {
        return (
          <button
            Key={categoryIndex}
            className={index === categoryIndex ? 'active' : null}
            onClick={() => selectCategory(category, categoryIndex)}
          >
            {category}
          </button>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  margin-bottom: 0;
  justify-content: center;
  flex-wrap: wrap;
  button {
    margin: 0.5rem;
    text-transform: capitalize;
    background: transparent;
    border: transparent;
    color: var(--clr-grey-6);
    letter-spacing: var(--spacing);
    font-size: 1rem;
    padding: 0.25rem;
    cursor: pointer;
    outline: none;
    transition: var(--transition);
  }
  button:hover,
  button.active {
    box-shadow: 0px 1.5px 0 var(--clr-grey-6);
  }
`
export default SearchButtons
