'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const TdImage = ({ src, css }) => {

 const [thumbnail,setThumbnail] = useState(src ? src : '/no-image.webp')

  return (
    <td className="px-5 py-5">
      <Image height={100} width={100} onErrorCapture={()=>setThumbnail('/no-image.webp')} src={thumbnail} className={css} />
    </td>
  );
};

export default TdImage;
