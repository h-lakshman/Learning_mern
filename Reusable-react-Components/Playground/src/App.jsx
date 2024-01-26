import { useState } from 'react'
import ProfileCard from './components/ProfileCard'
function App() {

  return (
    <>
      <ProfileCard
        name={"Lakshman"}
        age={21}
        location={"Trivandrum"}
        followers={"1k"}
        likes={"1k"}
        photos={"1k"} />
    </>
  )
}

export default App
