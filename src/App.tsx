import { ChangeEvent, useEffect, useState } from "react"
import Card from "./components/Card"


let App = () => {
  let [data, changeData] = useState<any>(null)
  

  let handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    try {
      fetch(`https://rickandmortyapi.com/api/character/?name=${event.target.value}`)
      .then(response => response.json())
      .then(response => {
        changeData(response.results)
      })
    } catch (error) {
      console.log(error)
    }
  }

  function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
  
    return function(this: any, ...args: Parameters<T>): void { // Explicitly typing 'this'
      // Clear the previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      // Set a new timeout
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }


  useEffect(() => {
    try {
      fetch(`https://rickandmortyapi.com/api/character/`)
      .then(response => response.json())
      .then(response => {
        changeData(response.results)
      })
    } catch (error) {
      console.log(error)
    }
  }
  ,[])

  // let handleClick = () => {
  //     try {
  //       fetch(`https://rickandmortyapi.com/api/character/?name=${inputText}`)
  //       .then(response => response.json())
  //       .then(response => {
  //         changeData(response.results)
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  // };


  return (
    <>
      {/* <div className="container my-5">
        <input onClick={() => {isVisible ? setVisibility(false) : setVisibility(true)}} type="button" className="btn btn-primary" value={isVisible ? "Hide" : "Show"}/>
        {isVisible && (<div style={{ 
            display:'grid', 
            gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))',
            gap: '1rem',
          }}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>)}
        
      </div> */}
      <div className="container my-3">
        <div className="row">
          <div>
            <input type="text" onChange={debounce(handleChange, 500)} className="form-control" />
          </div>
          {/* <div className="col-2">
            <input type="button" onClick={handleClick} className="btn btn-secondary w-100" value="Search" />
          </div> */}
        </div>
      </div>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns:'repeat(auto-fit, minmax(250px, 300px))',
        gap: '1rem',
        justifyContent: 'center'
      }} >
        {data?.length ? data.map((character: any) => <Card key={character.id} title={character.name} description={`${character.species} & ${character.status}`} url={character.image} />)  : <h1 className="text-center">Cannot find a character with this name.</h1>}
      
      </div>
    </>
  )

}

export default App