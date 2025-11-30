import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title = "Free PDF Converter - Convert, Merge, Compress PDF Online",
    description = "Free online PDF converter with 30+ tools. Convert PDF to Word, Excel, JPG. Merge, compress, edit PDFs. Fast, secure, no signup required. Try now!",
    keywords = "pdf converter, pdf to word, merge pdf, compress pdf, convert pdf to jpg, online pdf tools, free pdf converter, pdf editor",
    image = "/og-image.png",
    url = "https://asad1254-whats.hf.space",
    type = "website",
    author = "FileConverter Team",
    structuredData = null
}) => {
    const siteTitle = "FileConverter - All-in-One PDF Tools";
    const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="author" content={author} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            
            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
            <meta name="twitter:creator" content="@fileconverter" />

            {/* Additional SEO Tags */}
            <meta name="theme-color" content="#FF6B6B" />
            <meta name="msapplication-TileColor" content="#FF6B6B" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
