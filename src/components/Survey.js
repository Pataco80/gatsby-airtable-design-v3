import React, { useEffect, useState } from 'react'
import Title from './Title'
import styled from 'styled-components'
import base from './Airtable'
import { FaVoteYea } from 'react-icons/fa'

const Survey = ({ title }) => {
  // cràer les états lors de la prise de données
  // Données Airtable sont transmise par son tableau qui sera vide avant la réception des données
  const [items, setItems] = useState([])
  // Prise en compte de l'état des données au chargements de la page. Lors du chargement, c'est onLoad alors départ a "true"
  const [loading, setLoading] = useState(true)

  const getDataSurvey = async () => {
    const records = await base('survey')
      .select({})
      .firstPage()
      .catch(err => console.log(err))

    const newItems = records.map(record => {
      const { id, fields } = record
      return { id, fields }
    })
    setLoading(false)
    setItems(newItems)
  }

  const updateSurvey = async id => {
    setLoading(true)
    const tempItems = [...items].map(item => {
      if (item.id === id) {
        let { id, fields } = item
        fields = { ...fields, votes: fields.votes + 1 }
        return { id, fields }
      } else {
        return item
      }
    })
    const records = await base('survey')
      .update(tempItems)
      .catch(err => console.log(err))
    const newItems = records.map(record => {
      const { id, fields } = record
      return { id, fields }
    })
    setLoading(false)
    setItems(newItems)
  }

  useEffect(() => {
    getDataSurvey()
  }, [])
  return (
    <Wrapper className="section">
      <div className="container">
        <Title title={title || 'Survey'} />
        <h3>most important room in the house?</h3>
        <ul>
          {items.map(item => {
            const { id, fields } = item
            return (
              <li key={id}>
                <div className="key">
                  {fields.name.toUpperCase().substring(0, 2)}
                </div>
                <div>
                  <h4>{fields.name}</h4>
                  <p>{fields.votes}</p>
                </div>
                <button
                  disabled={loading ? true : false}
                  onClick={() => updateSurvey(id)}
                >
                  <FaVoteYea />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container {
    width: 90vw;
    max-width: var(--max-width);

    margin: 0 auto;
    h3 {
      text-align: center;
      color: var(--clr-grey-5);
      margin-bottom: 4rem;
    }
    ul {
      margin-top: 2rem;
      display: grid;
      gap: 2rem;
      grid-gap: 2rem;
      @media (min-width: 992px) {
        & {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media (min-width: 1200px) {
        & {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
    }
    li {
      background: var(--clr-grey-10);
      border-radius: var(--radius);
      padding: 0.75rem 1rem;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 0 3rem;
      grid-gap: 0 3rem;
      align-items: center;
      .key {
        color: var(--clr-white);
        font-size: 1.5rem;
        background: var(--clr-primary-7);
        padding: 0.5rem 1rem;
        border-radius: var(--radius);
      }
      p {
        margin-bottom: 0;
        color: var(--clr-grey-5);
        letter-spacing: var(--spacing);
      }
      h4 {
        margin-bottom: 0;
      }
      button {
        background: transparent;
        border-color: transparent;
        font-size: 2rem;
        cursor: pointer;
        color: var(--clr-black);
      }
      button:disabled {
        color: var(--clr-grey-6);
        cursor: not-allowed;
      }
    }
  }
`
export default Survey
