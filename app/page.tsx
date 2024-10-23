import { LoadNotes } from "@/app/lib/service"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
async function HomePage(){

  const data = await LoadNotes();
  return(
    <div>{
      data.map( (note: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) =>{
        <div key ={note.id}>
        <h1>{note.title} </h1>
        <p>{note.content}</p>
        </div>
      })
    }</div>
  )
}

export default HomePage