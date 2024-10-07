'use client'

import { IProduct } from '@/app/interfaces/product';
import { useAuth } from '@/global-states/auth';
import { ProductCard } from '@/UI/ProductCard/ProductCard';
import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {

    const router=useRouter();
    const { userAuth, resetAuth} = useAuth();
    const translate = useTranslations('DashboardView');
    const [data, setData] = useState<IProduct[]>([]);

    useEffect(() => {
        if (!userAuth.isLoggedIn) {
            router.push('/');
            return;
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
                console.log(responseData)
                setData(responseData)
            } catch (error) {
                alert(error);
            }
        }
        getProducts();
    }, [userAuth.isLoggedIn]);

    return (
        <Box component='div' sx={{display:'flex',flexDirection:'column',gap:'10px',alignItems:'center'}}>
            <h1>{translate("title")}</h1>
            <Button variant='outlined' onClick={()=>{resetAuth()}}>{translate("logoutButton")}</Button>
            <Box component="span" sx={{display:"flex",gap:"10px", flexWrap:"wrap", justifyContent:"center"}}>
            {data.map((item:IProduct)=>{
                return (
                <ProductCard key={item.id} id={item.id} description={item.description} category={item.category} title={item.title} imageUrl={item.image}></ProductCard>
                );
            })}
            </Box>
        </Box>
    );
}

