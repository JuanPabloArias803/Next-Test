import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {
    try {
        const { userEmail, userUsername,userPassword,userName,userPhone } = await req.json();
        const endpoint = 'https://api-coders-advanced-route-production.up.railway.app/auth/signup';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ email:userEmail, username:userUsername,password:userPassword,name:userName,phone:userPhone }),
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