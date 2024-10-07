import { useAuth } from "@/global-states/auth";
import { Box, Button, TextField } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {

    const router=useRouter();
    const locale = useLocale();
    const { setAuth} = useAuth();
    const translate = useTranslations('LoginForm');
    const [userUsername, setUsername] = useState("");
    const [userPassword, setPassword] = useState("");

    async function loginSubmit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        try {
            if(!userPassword||!userUsername){
                throw "Por favor completa todos los datos";
            }
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userUsername,userPassword }),
            });
            if (!response.ok) {
                throw "Error en la conexión";
            }
            const responseData= await response.json();
            setAuth({isLoggedIn:true,sessionToken:responseData.access_token,username:responseData.user.username,userId:responseData.user._id});
            router.push(`/${locale}/dashboard`);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <Box component="form" id="login-form" sx={{display:'flex',flexDirection:'column',gap:'10px',width:'300px'}} onSubmit={loginSubmit}>
                <TextField required type="text" label={translate("usernameField")}onChange={(e) => setUsername(e.target.value)}/>
                <TextField required type="password" label={translate("passwordField")} onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="outlined" type="submit">{translate("button")}</Button>
            </Box>
        </>
    );
}