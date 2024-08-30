import Link from 'next/link';
import { BiSolidSkipNextCircle, BiSolidSkipPreviousCircle } from 'react-icons/bi';
import styles from '../../../styles/components/productDetail.module.scss';

const PrevNextButtons = ({ data }: any) => {
  return (
    <div className={`py-2`}>
      <button className='btn btn-link text-decoration-none p-0 pe-2' disabled={!data?.previous_item}>
        <Link href={`/product/${data?.category}/${data?.previous_item}`} className={`text-dark text-decoration-none`}>
          <BiSolidSkipPreviousCircle className={`${styles?.prev_next_btns}`} />
          Prev
        </Link>
      </button>
      <button className='btn btn-link text-decoration-none p-0' disabled={!data?.next_item}>
        <Link href={`/product/${data?.category}/${data?.next_item}`} className={`text-dark text-decoration-none`}>
          <BiSolidSkipNextCircle className={`${styles?.prev_next_btns}`} />
          Next
        </Link>
      </button>
    </div>
  );
};

export default PrevNextButtons;
