import React, { useState } from 'react'
import { Container } from './App.styles'
import { GlobalStyle } from './GlobalStyles'

function App () {
  const [resultado, changeResultado] = useState('')

  const num = React.createRef()

  const getResultado = async () => {
    changeResultado('Calculando...')

    const result = await fetch('http://localhost:3333/api/calculate',
      {
        method: 'POST',
        body: JSON.stringify({ numero: num.current.value }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

    changeResultado('')

    if (!result.ok) {
      return alert((await result.json()).message ?? 'Algo deu errado, tente novamente!')
    }

    changeResultado((await result.json()).result)
  }

  return (
    <>
      <Container>
        <Container>
          <h1 className='container-item'>Por favor, digite um número para calcularmos seu menor múltiplo duodígito:</h1>
          <input ref={ num } type='number' placeholder='número' className='container-item form-field'/>
          <button className='container-item form-field' onClick={ getResultado }>Calcular</button>
          <br/>
          <h1 className='container-item'>Resultado: { resultado }</h1>
          <br/>
        </Container>
      </Container>
      <GlobalStyle />
    </>
  )
}

export default App
