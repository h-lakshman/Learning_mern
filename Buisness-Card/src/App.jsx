import { useState } from 'react'
import { BuisnessCard } from './components/BuisnessCard'
function App() {

  return (
    <div>
      <BuisnessCard
        name="Lakshman"
        description="Learning mern rn"
        interests={["Coding", "Football", "Motorcylcle riding"]}
        twitter="www.twitter.com"
        otherSocialMedia={{ label: "Instagram", url: "www.instagram.com" }}
      />
    </div >
  )
}

export default App
