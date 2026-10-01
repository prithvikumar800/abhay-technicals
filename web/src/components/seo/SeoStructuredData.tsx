import React from 'react';
import { StorefrontProduct } from '../../types';

interface OrgSchemaProps {
  type: 'organization';
}

interface ProductSchemaProps {
  type: 'product';
  product: StorefrontProduct;
}

interface BreadcrumbSchemaProps {
  type: 'breadcrumbs';
  items: { name: string; url: string }[];
}

type StructuredDataProps = OrgSchemaProps | ProductSchemaProps | BreadcrumbSchemaProps;

export function SeoStructuredData(props: StructuredDataProps) {
  let schemaData: any = null;

  if (props.type === 'organization') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Abhay Technicals',
      description: 'Mobile spare parts, batteries, charging flex boards, OCA glass, and repair tools supplier in India.',
      url: 'https://abhaytechnicals.com',
      telephone: '+91 73950 96715',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      },
    };
  } else if (props.type === 'product') {
    const { product } = props;
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      sku: product.sku,
      brand: {
        '@type': 'Brand',
        name: product.brand?.name || 'Abhay Technicals Compatible',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: product.salePrice ?? product.retailPrice,
        availability:
          product.stockQty > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: `https://abhaytechnicals.com/products/${product.slug}`,
      },
    };
  } else if (props.type === 'breadcrumbs') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: props.items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: `https://abhaytechnicals.com${item.url}`,
      })),
    };
  }

  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
