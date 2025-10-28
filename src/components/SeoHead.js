import Head from "next/head";

const SeoHead = ({ 
  title,  description,  canonicalUrl,  ogImage = '/images/default-og.png', structuredData }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    {structuredData && (
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    )}
  </Head>
);

export default SeoHead;