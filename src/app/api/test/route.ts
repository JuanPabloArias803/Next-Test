import { NextResponse } from 'next/server';

export async function GET() {
    const endpoint = 'https://jsonplaceholder.typicode.com/users';
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        return NextResponse.json({ message: 'Error' }, { status: response.status });
      }
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error'}, { status: 500 });
    }  
}

export async function POST(req: Request) {
    const body = await req.json();
    const { param1, param2 } = body; // Extrae los parámetros del cuerpo de la solicitud
    const data = { 
      message: `POST received with param1: ${param1} and param2: ${param2}` 
    };
    return NextResponse.json(data, { status: 201 });
  }