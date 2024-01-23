import { useState } from 'react'
export function CreateTodo() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return <div>
    <input type="text" placeholder="title" onChange={function(e) {
      value = e.target.value
      setTitle(value)
    }}></input>
    <br></br> <br></br>
    <input type="text" placeholder="description" onChange={function(e) {
      value = e.target.value
      setDescription(value)
    }}></input>
    <br></br> <br></br>
    <button onClick={() => {
      fetch("http://localhost:3000/todo"), {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description
        }),
        headers: {
          "Content-type": "application/json"
        }
      }
        .then(async function(res) {
          const json = await res.json();
          alert("Todo added")
        })
    }}>Add Todo</button>
  </div >
}
