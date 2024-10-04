import { useTranslations } from 'next-intl';

export default function Home() {
  const translate = useTranslations('Home');

  return (
    <div>
      <h1>{translate("title")}</h1>
    </div>
  );
}
