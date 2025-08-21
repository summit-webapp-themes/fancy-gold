import Link from 'next/link';
import { BiSolidSkipNextCircle, BiSolidSkipPreviousCircle } from 'react-icons/bi';
import styles from '../../../styles/components/productDetail.module.scss';
import { useRouter } from 'next/router';

const PrevNextButtons = ({ data }: any) => {
  const { query } = useRouter();

  const requestParams = {
    item: query?.productId,
    slug: query?.productId,
    filter: query?.filter,
    page: query?.page,
    offset: query?.offset,
    sort_by: query?.sort_by,
    currency: 'INR',
  };

  // Convert object to query string
const queryString = new URLSearchParams(
  Object.fromEntries(
    Object.entries(requestParams)
      .filter(([key, v]) => v !== undefined && v !== null && key !== 'item' && key !== 'slug')
      .map(([key, v]) => [key, Array.isArray(v) ? v.join(',') : String(v)])
  )
).toString();

console.log(queryString," Query String");


  return (
    <div className="py-2">
      <button
        className="btn btn-link text-decoration-none p-0 pe-2"
        disabled={!data?.previous_item}
      >
        <Link
          href={`/product/${data?.category}/${data?.previous_item}?${queryString}`}
          className="text-dark text-decoration-none"
        >
          <BiSolidSkipPreviousCircle className={styles?.prev_next_btns} />
          Prev
        </Link>
      </button>
      <button
        className="btn btn-link text-decoration-none p-0"
        disabled={!data?.next_item}
      >
        <Link
          href={`/product/${data?.category}/${data?.next_item}?${queryString}`}
          className="text-dark text-decoration-none"
        >
          <BiSolidSkipNextCircle className={styles?.prev_next_btns} />
          Next
        </Link>
      </button>
    </div>
  );
};

export default PrevNextButtons;
