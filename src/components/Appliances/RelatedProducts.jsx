import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

const RelatedProducts = ({ title, buttonlink }) => {
  return (
    <div className="flex items-center justify-between gap-1">
      <h3 className="text-2xl font-bold text-b18 lg:mt-10 lg:text-base lg:font-semibold maxlg:w-full maxlg:text-center">{title}</h3>
      <Link href={buttonlink ? buttonlink : '/'} className="flex items-center gap-1 whitespace-nowrap rounded-lg border border-b3 px-3 py-2 text-sm font-medium text-b3 duration-300 hover:gap-2 3xl:text-base maxlg:hidden">
        <span>View More</span>
        <AiOutlineArrowRight className="text-base" />
      </Link>
    </div>
  );
};

export default RelatedProducts;
