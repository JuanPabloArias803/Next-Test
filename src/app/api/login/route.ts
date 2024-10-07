import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {
    try {
        const { userUsername,userPassword } = await req.json();
        const endpoint = 'http://192.168.88.39:7000/auth/login';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ username:userUsername,password:userPassword }),
        };
        const response: Response = await fetch(endpoint,options);
        if (!response.ok) {
            throw `Error en el servidor: (${response.status})`;
        }
        const responseData = await response.json();
        return NextResponse.json(responseData, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}