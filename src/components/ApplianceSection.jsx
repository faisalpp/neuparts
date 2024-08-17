import React from 'react';
import SProductCard from '../components/SProductCard';
import { BsArrowRightShort } from 'react-icons/bs';
import Link from 'next/link';

const ApplianceSection = ({ type, title, Style, linktitle }) => {
  const [loading, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await fetch(`/api/front/home?section=${type}`);
    const data = await res.json();
    if (data.success) {
      setData(data.data);
    }
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, ['']);

  return (
    <>
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <Image width={200} height={200} quality={100} className="h-auto w-auto" alt="Loader" src="/loader2.gif" unoptimized />
        </div>
      ) : (
        data.length > 0 && (
          <div className={`flex flex-col items-center bg-b3/10 py-10 lg:py-14 xl:py-28 ${Style}`}>
            <h2 className="mb-4 px-3 text-center text-2xl font-bold md:text-3xl xl:text-4xl">{title}</h2>
            <div className="maincontainer mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:gap-10 2xl:gap-x-10 2xl:gap-y-14">{data && data.length > 0 && data.map((item, index) => <SProductCard key={index} title={item.title} image={item.thumbnail} link={`/products?category=${item.slug}`} />)}</div>
            <div className="mt-16 flex justify-center px-3">
              <Link href="/products" className="flex w-fit items-center rounded-md border border-b3 px-4 py-3 font-semibold text-b3">
                <span className="text-base">{linktitle}</span>
                <BsArrowRightShort className="text-2xl" />
              </Link>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ApplianceSection;
