import { NoteForm } from "@/app/components/NoteForm"

export async function loadNotes() {
  const baseUrl = process.env.VERCEL_URL || 'http://localhost:3000'; // Cambiar esto según el entorno

  // Si estamos en el servidor (Node.js), necesitamos una URL completa
  const url = typeof window === 'undefined' ? `${baseUrl}/api/notes` : '/api/notes';

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error fetching notes: ${res.status} - ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}


async function HomePage() {
  
  const data = await loadNotes();

  return(
  <div className="flex items-center justify-center h-screen">
    <div>
      <NoteForm />
       
      <div>{
        data.map((note : any) => {
          <div key={note.id} className="bg-slate-900 p-4 my-2">
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