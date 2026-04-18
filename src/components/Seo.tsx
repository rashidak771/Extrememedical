import { Helmet } from "react-helmet-async";
import { company } from "@/data/site";

const siteUrl = "https://extrememedical.qa";
const defaultImage = `${siteUrl}/og-image.svg`;

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

const toAbsoluteUrl = (value?: string) => {
  if (!value) return siteUrl;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
};

export const Seo = ({ title, description, path = "/", image = defaultImage, noIndex = false }: SeoProps) => {
  const canonical = toAbsoluteUrl(path);
  const socialImage = toAbsoluteUrl(image);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
    </Helmet>
  );
};
