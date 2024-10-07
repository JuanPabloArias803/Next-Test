import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

interface CardProps{
    description:string,
    imageUrl:string,
    title:string,
    category:string
}

export const ProductCard:React.FC<CardProps>=({description,imageUrl,title,category})=>{
    
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={title}
                subheader={`category: ${category}`}
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
            </CardContent>
        </Card>
    );
}


