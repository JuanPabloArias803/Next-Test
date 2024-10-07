'use client'

import { useAuth } from '@/global-states/auth';
import LoginForm from '@/UI/LoginForm/LoginForm';
import { Box, Button } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {

  const router=useRouter();
  const translate = useTranslations('Home');
  const locale = useLocale();
  const { userAuth} = useAuth();

    useEffect(() => {
        if (userAuth.isLoggedIn) {
            router.push(`/${locale}/dashboard`);
            return;
        }
    }, [userAuth.isLoggedIn]);

  return (
    <div>
      <h1>{translate("title")}</h1>
      <LoginForm/>
      <Box component="span">
                <p>{translate("registerText")}</p>
                <Button variant="outlined" onClick={()=>{router.push(`/${locale}/register`);}}>{translate("registerButton")}</Button>
            </Box>
    </div>
  );
}
