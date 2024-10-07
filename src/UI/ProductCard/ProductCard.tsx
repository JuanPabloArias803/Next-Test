import { Button, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

interface CardProps{
    id:number,
    description:string,
    imageUrl:string,
    title:string,
    category:string
}

export const ProductCard:React.FC<CardProps>=({id,description,imageUrl,title,category})=>{
    
    const router=useRouter();
    const locale = useLocale();

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={title}
                subheader={`Category: ${category}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={imageUrl}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {description}
                </Typography>
                <Button variant="outlined" onClick={()=>{router.push(`/${locale}/dashboard/product?productId=${id}`);}}>Ver más</Button>`
            </CardContent>
        </Card>
    );
}


