'use client'

import { useAuth } from '@/global-states/auth';
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {

    const router=useRouter();
    const { userAuth, resetAuth} = useAuth();
    const translate = useTranslations('DashboardView');

    useEffect(() => {
        if (!userAuth.isLoggedIn) {
            router.push("/");
        }
    }, [userAuth.isLoggedIn]);

    return (
        <div>
            <h1>{translate("title")}</h1>
            <Button onClick={()=>{resetAuth()}}>cerrar sesion</Button>
        </div>
    );
}