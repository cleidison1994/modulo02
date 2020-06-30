import React, {useEffect, useState} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);


    useEffect(() => {
      api.get('repositories').then(response =>{
         setRepository(response.data);
      });
    }, []); 


  async function handleAddRepository() {

    const response = await api.post('/repositories',{ title:`Projeto ${Date.now()}`});
    const repository = response.data;
    setRepository([...repositories, repository]);

    
  }

  async function handleRemoveRepository(id) {
     const response = await api.delete(`/repositories/${id}`);

     const addRepositories = repositories.filter(
      repository => repository.id !== id
    )

    setRepository(addRepositories);

  }    

  return (
    <div>
      <ul data-testid="repository-list">
      { repositories.map(repository => (
         <li key={repository.id}>
         {repository.title}
       <button onClick={() => handleRemoveRepository(repository.id)}>
         Remover
       </button>
     </li>
      ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
