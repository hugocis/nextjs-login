// import { LoadNotes }   from "@/app/lib/service"
"use client"
import { NoteForm } from "@/app/components/NoteForm"
import { Note } from "@prisma/client";

async function LoadNotes(){
  const res = await fetch("/api/notes");
  const data = await res.json();
  return data;
}

async function HomePage() {
  const data = await LoadNotes();

  return(
  <div className="flex items-center justify-center h-screen">
    <div>
      <NoteForm />
       
      <div>{
        data.map((note : Note) => {
          <div key={note.id} className="bg-slate-400 p-4 my-2">
            <h1>{note.title} </h1>
            <p>{note.content}</p>
          </div>
        })
      }</div>
    </div>
  </div>
  )
}

export default HomePage