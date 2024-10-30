import classes from './Card.module.css'

let Card = (props:any) => {
  return (
    <div className="card">
      <img src={props.url ?? "https://placehold.co/600x400"} className={"card-img-top"} alt="" />
      <div className="card-body">
        <h5 className="card-title">{props.title ?? "Unknown"}</h5>
        <p className="card-text">{props.description ?? "Description"}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  )
}

export default Card