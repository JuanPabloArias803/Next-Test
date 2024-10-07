import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";

export default function RegisterForm() {

    const router=useRouter();
    const translate = useTranslations('RegisterForm');
    const [userEmail, setEmail] = useState("");
    const [userUsername, setUsername] = useState("");
    const [userName, setName] = useState("");
    const [userPhone, setPhone] = useState("");
    const [userPassword, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    async function registerSubmit(event:React.FormEvent<HTMLFormElement>){
      event.preventDefault();
      try {
        if(!userEmail||!userPassword||!confirmPassword||!userUsername||!userName||!userPhone){
          throw "Por favor completa todos los datos";
        }
        if(userPassword!==confirmPassword){
          throw "Las contraseñas no coinciden";
        }
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail, userUsername,userPassword,userName,userPhone }),
        });
        if (!response.ok) {
            throw "Error en la conexión";
        }
        alert('Usuario creado exitosamente');
        router.push("/");
      } catch (error) {
        alert(error);
      }
    }

    return (
        <>
            <Box component="form" id="register-form" sx={{display:'flex',flexDirection:'column',gap:'10px'}} onSubmit={registerSubmit}>
                <TextField required type="email" label={translate("emailField")} onChange={(e) => setEmail(e.target.value)}/>
                <TextField required type="text" label={translate("nameField")} onChange={(e) => setName(e.target.value)}/>
                <TextField required type="text" label={translate("usernameField")} onChange={(e) => setUsername(e.target.value)}/>
                <TextField required type="number" label={translate("phoneField")} onChange={(e) => setPhone(e.target.value)}/>
                <TextField required type="password" label={translate("passwordField")} onChange={(e) => setPassword(e.target.value)}/>
                <TextField required type="password" label={translate("confirmPasswordField")} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <Button variant="outlined" type="submit">{translate("button")}</Button>
            </Box>
        </>
    );
}