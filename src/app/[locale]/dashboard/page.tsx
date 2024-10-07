'use client'

import { useAuth } from '@/global-states/auth';
import { Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {

    const router=useRouter();
    const { userAuth, resetAuth} = useAuth();
    const translate = useTranslations('DashboardView');
    const [data, setData] = useState("");

    useEffect(() => {
        if (!userAuth.isLoggedIn) {
            router.push('/');
        }
        const getProducts =async ()=>{
            try {
                const response = await fetch('/api/get-products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token:userAuth.sessionToken }),
                });
                if (!response.ok) {
                    throw "Error en la conexión";
                }
                const responseData= await response.json();
                setData(responseData)
            } catch (error) {
                alert(error);
            }
        }
        getProducts();
    }, [userAuth.isLoggedIn]);

    return (
        <div>
            <h1>{translate("title")}</h1>
            <Button onClick={()=>{resetAuth()}}>cerrar sesion</Button>
            <Typography>
                {JSON.stringify(data)}
            </Typography>
        </div>
    );
}