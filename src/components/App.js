import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  filterChange = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    })
  }

  fetchPets = () => {
    let endpoint = '/api/pets';
    if (this.state.filters.type != 'all'){
      endpoint += `?type=${this.state.filters.type}`;
    }

    fetch(endpoint)
      .then(res => res.json())
      .then(data => this.setState({pets: data}))
  }

  handleAdopt = (id) => {
    const pets = this.state.pets.map(pet => {
       if (pet.id === id) {
         return {...pet, isAdopted: true}
       } else {
         return pet 
       }
     })
     this.setState({
       pets: pets
     })
   }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.filterChange} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser  pets={this.state.pets} onAdoptPet= {this.handleAdopt} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App