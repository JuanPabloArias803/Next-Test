'use client'

import { useAuth } from '@/global-states/auth';
import RegisterForm from '@/UI/RegisterForm/RegisterForm';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Register() {

    const router=useRouter();
    const translate = useTranslations('RegisterView');
    const locale = useLocale();
    const { userAuth } = useAuth();

    useEffect(() => {
        if (userAuth.isLoggedIn) {
            router.push(`/${locale}/dashboard`);
        }
    }, [userAuth.isLoggedIn]);

    return (
        <div>
        <h1>{translate("title")}</h1>
        <RegisterForm/>
        </div>
    );
}
