'use client'

import { IProduct } from "@/app/interfaces/product";
import { useAuth } from "@/global-states/auth";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




export default function ProductView() {

    const { userAuth } = useAuth();
    const router=useRouter();
    const [data, setData] = useState<IProduct>();
    

    useEffect(() => {
        if (!userAuth.isLoggedIn) {
            router.push('/');
            return;
        }
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('productId');
        const getProduct =async()=>{
            try {
                const response = await fetch('/api/get-single-product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token:userAuth.sessionToken, productId }),
                });
                if (!response.ok) {
                    throw "Error en la conexión";
                }
                const responseData= await response.json();
                setData(responseData);
            } catch (error) {
                alert(error);
            }
        }
        getProduct();
    }, [userAuth.isLoggedIn]);

    return (
        <Box component='div' sx={{display:'flex',justifyContent:'center',padding:'20px'}}>
            <Box component='div' sx={{width:'50%',display:'flex',flexDirection:'column',gap:'10px',alignItems:'center'}}>
                <Typography variant="h3">{data?.title}</Typography>
                <Box component="img" src={data?.image} sx={{width:'200px'}}></Box>
                <p>{data?.description}</p>
                <p>{`Rating: ${data?.rating.rate}`}</p>
            </Box>
        </Box>
        
    );
}
