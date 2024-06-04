import { useState } from 'react'
import './App.css'

const unarchivedURL = "https://www.nytimes.com/interactive/2014/upshot/dialect-quiz-map.html";

function App() {
  const [link, setLink] = useState('')
  const [input, setInput] = useState('');

  return (
    <>
      <div>
        <h1>Input the link to your saved answers.</h1>
        <p>This comes from the link at the end of the quiz in <br/>
        "Sorry, an error has occurred. Keep this link to save your answers and view your map later."</p>
        <input 
          type="text" 
          placeholder="Link to saved answers" 
          value={input}
          onChange={ (e) => {
            const inputtedLink = e.target.value;
            setInput(inputtedLink);
            console.log(inputtedLink);

            if (!URL.canParse(inputtedLink)) {
              setLink('');
              return;
            }

            const url = new URL(inputtedLink);
            const params = url.searchParams.get("r");

            if (!params) return;

            const newUrl = new URL(unarchivedURL);
            newUrl.searchParams.set("r", params);
            setLink(newUrl.toString());
            console.log(newUrl.toString());
          }
          } />
          <br/>
          <div className="new-links" style={{
            opacity: link ? 1 : 0
          }}>
            <a href={link} target="_blank" rel="noreferrer">{link}</a>
            <p>Click the link to find your map. Right click on the map (above the paywall) and click copy to paste into the discussion.</p>
          </div>
       </div> 
    </>
  )
}

export default App
