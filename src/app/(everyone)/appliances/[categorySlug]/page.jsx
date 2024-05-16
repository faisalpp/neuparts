import React from 'react';
import Appliances from './Appliances';

const page = ({ params }) => {
  const { categorySlug } = params;

  return <Appliances categorySlug={categorySlug} />;
};

export default page;
