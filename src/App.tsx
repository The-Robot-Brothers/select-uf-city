import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'

type UfProps = {
  id: number
  sigla: string
  nome: string
}

type CityProps = {
  id: number
  nome: string
}

function App() {
  const [ufs, setUfs] = useState<UfProps[]>([])
  const [ufSelected, setUfSelected] = useState('0')
  const [cities, setCities] = useState<CityProps[]>([])
  const [citySelected, setCitySelected] = useState('0')

  useEffect(() => {
    async function handleSearchUfs() {
      await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then(response => setUfs(response.data))
    }

    handleSearchUfs()
  }, [])

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value
    setUfSelected(uf)
  }

  useEffect(() => {
    async function handleSearchCity() {
      await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected}/municipios`).then(response => setCities(response.data))
    }

    handleSearchCity()
  }, [ufSelected])

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value
    setCitySelected(city)
  }

  return (
    <>
     <h1>Seletor de UF e cidade</h1> 
     <div className="container">
       <select name="uf" id="uf" onChange={handleSelectedUf} >
         <option value="0">Selecione a UF</option>
        {ufs.map(uf => (
          <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
        ))}
        </select>

       <select name="city" id="city"  onChange={handleSelectedCity} >
         <option value="0">Selecione a cidade</option>
        {cities.map(city => (
          <option key={city.nome} value={city.nome}>{city.nome}</option>
        ))}
       </select>
     </div>
    </>
  )
}

export default App
