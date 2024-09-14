import React from 'react';
import Form from '@/components/Login/Form';

const Page = () => {

  const secretKey = process.env.NEXT_ENCRYPT_SALT;

  return (
    <>
      <Form SecretKey={secretKey} />
    </>
  );
};

export default Page;
