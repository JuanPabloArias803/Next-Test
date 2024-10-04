import { useTranslations } from 'next-intl';

export default function Login() {
    const translate = useTranslations('Login');

    return (
        <div>
            <h1>{translate("title")}</h1>
        </div>
    );
}
