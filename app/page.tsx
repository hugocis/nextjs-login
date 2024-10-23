import { LoadNotes } from "@/app/lib/service"
async function HomePage(){

  const data = await LoadNotes();
  return(
    <div>{
      data.map( (note) =>{
        <div key ={note.id}>
        <h1>{note.title} </h1>
        <p>{note.content}</p>
        </div>
      })
    }</div>
  )
}

export default HomePage