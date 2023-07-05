// import React from 'react'
// const useState = React.useState
import { useState, useEffect } from "react";
import axios from "axios";

//// App
function App() {
  const [creatureList, setCreatureList] = useState([
    { name: "Unicorn", origin: "Britain" },
    { name: "Sphinx", origin: "Egypt" },
    { name: "Jackalope", origin: "America" },
  ]);

  // state for POST
  const [creatureNameInput, setCreatureNameInput] = useState("");
  const [creatureOriginInput, setCreatureOriginInput] = useState("");

  // function to GET request
  const fetchCreature = () => {
    /* Alternative syntax for axios call: 
    axios.get('/creature')
    .then(...) 
    */
    axios({
      method: "GET",
      url: "/creature",
    })
      .then((response) => {
        // response.data is where the server response data we care about is
        console.log("response is: ", response.data);
        // setCreatureList to response.data
        setCreatureList(response.data);
      })
      .catch((error) => {
        console.log("error with fetchCreature", error);
      });
  };

  // Hook into the React lifecycle and run fetchCreature when this component loads
  // React equivalent to onReady() jQuery
  // the [] is saying this should only run once, when the component loads
  // "when component mount, run useEffect"
  useEffect(() => {
    fetchCreature();
  }, []);

  // handleSubmit  - POST request
  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "POST",
      url: "/creature",
      data: {
        name: creatureNameInput,
        origin: creatureOriginInput,
      },
    })
      .then((response) => {
        fetchCreature();
        // clear inputs
        setCreatureNameInput('')
        setCreatureOriginInput('')
      })
      .catch((error) => {
        console.log("error with handleSubmit", error);
      });
  };

  //// RETURN
  return (
    <div>
      {/* form to take input */}
      <form>
        <div className="input">
          <input
            placeholder="Creature Name"
            value={creatureNameInput}
            onChange={(event) => setCreatureNameInput(event.target.value)}
          />
          <input
            placeholder="Creature Origin"
            value={creatureOriginInput}
            onChange={(event) => setCreatureOriginInput(event.target.value)}
          />
          <div className="button">
            <button onClick={handleSubmit}>Add Creature</button>
          </div>
        </div>
      </form>

      <ul>
        {creatureList.map((creature) => (
          <li key={creature.name}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
    
      </ul>
    </div>
  );
}

export default App;
