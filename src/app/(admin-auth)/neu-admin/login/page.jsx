import React from 'react';
import LoginForm from '@/components/AdminDashboard/auth/LoginForm'

const Page = () => {

  const secretKey = process.env.NEXT_ENCRYPT_SALT;

  return (
    <>
      <LoginForm SecretKey={secretKey} />
    </>
  );
};

export default Page;
