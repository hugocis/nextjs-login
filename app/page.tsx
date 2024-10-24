// import { loadNotes }   from "@/app/lib/service"
import { NoteForm } from "@/app/components/NoteForm"

// async function loadNotes(){
//   const res = await fetch('http://localhost:3000/api/notes');
//   const data = await res.json();
//   return data;
// }



async function HomePage() {
  
  //const data = await loadNotes();

  return(
  <div className="flex items-center justify-center h-screen">
    <div>
      <NoteForm />
       
      {/* <div>{
        data.map((note : any) => {
          <div key={note.id} className="bg-slate-900 p-4 my-2">
            <h1>{note.title} </h1>
            <p>{note.content}</p>
          </div>
        })
      }</div> */}
    </div>
  </div>
  )
}

export default HomePage