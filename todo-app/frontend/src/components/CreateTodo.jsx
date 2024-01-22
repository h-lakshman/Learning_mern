import { useState } from "react";

export function CreateTodo() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return <div>
    <input type="text" placeholder="title" onChange={(e) => {
      const value = e.target.value;
      console.log(value)
      setTitle(value)
    }}></input>
    <br></br> <br></br>
    <input type="text" placeholder="description" onChange={(e) => {
      const value = e.target.value;
      console.log(value)
      setDescription(value)
    }}></input>
    <br></br> <br></br>
    <button onClick={() => {
      fetch("http:/localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description
        }),
        headers: {
          "contentType": "application.json"
        }
      })
        .then(async function(res) {
          console.log(res.json)
          const json = await res.json();
          alert("Todo added")
        })
    }}>Add Todo</button>
  </div >
}
