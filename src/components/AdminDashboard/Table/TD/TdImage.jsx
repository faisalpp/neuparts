'use client';

import React from 'react';
import Image from 'next/image';

const TdImage = ({ src, css }) => {
  return (
    <td className="px-5 py-5">
      <img src={`${src ? src : '/logo-example.webp'}`} className={css} />
    </td>
  );
};

export default TdImage;
