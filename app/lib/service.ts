"use client";
import { NextResponse } from "next/server";
import { env } from "process";


export function ErrorMessage (error: any, message: String)
{
    if (error instanceof Error) 
    {
        return NextResponse.json
        (
            {
                message: message,
            },
            {
                status: 500,
            }
        )
    }
}

export function NotFoundMessage ()
{
    return NextResponse.json({ message: "Note not found in the Database." }, { status: 404 })
}

export async function loadNotes(){
    const res = await fetch('/api/notes');
    const data = await res.json();
    return data;
}