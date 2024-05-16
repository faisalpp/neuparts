import React from 'react';
import AppliancesTipsDetail from './AppliancesTipsDetail';

const Page = async ({ params }) => {
  const { slug } = params;
  return <AppliancesTipsDetail slug={slug} />;
};

export default Page;
