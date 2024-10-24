import { NextResponse } from "next/server";

export function ErrorMessage (error: unknown, message: string)
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