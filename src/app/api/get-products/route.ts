import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {
    try {
        const { token } = await req.json();
        const endpoint = 'http://192.168.88.39:7000/auth/products';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
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