import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import noImage from '../../public/assets/images/no_image.png';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import styles from '../../styles/components/catalog.module.scss';
import { callGetAPI } from '../../utils/http-methods';
import ErrorStyles from '../../styles/components/errorboundary.module.scss';
import image from '../../public/assets/images/api_error_img.webp';
import { AddReference } from '../../store/slices/reference-tracking-slices/reference-tracking-slice';

function CatalogListingMaster() {
  const dispatch = useDispatch();
  const router = useRouter();
  const TokenFromStore: any = useSelector(get_access_token);
  const isCatalogUser = localStorage.getItem('isCatalogUser');
  const [catalogList, setCatalogList] = useState([]);
  const getCatalogListValues = async () => {
    const params = {
      fields: ['name', 'slug', 'image'],
    };
    const queryString: any = Object.entries(params)
      .map(([key, value]: any) => {
        const encodedValue: any = Array.isArray(value) ? JSON.stringify(value) : encodeURIComponent(value);
        return `${key}=${encodedValue}`;
      })
      .join('&');
    const url = `${CONSTANTS.API_BASE_URL}/api/resource/Catalog?${queryString}`;
    const fetchCatalogList = await callGetAPI(url, TokenFromStore.token);
    return fetchCatalogList;
  };
  const fetchCatalogListValues = async () => {
    const values = await getCatalogListValues();
    setCatalogList(values?.data?.data);
  };
  const handleClickCatalogName = async (slug: string) => {
    dispatch(
      AddReference({
        reference_page: 'Catalog',
        reference_id: slug,
      })
    );
  };
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  useEffect(() => {
    fetchCatalogListValues();
    router.push({
      query: { page: 1 },
    });
  }, []);
  const handleDataRendering = () => {
    if (isCatalogUser !== 'true') {
      return (
        <div className="d-flex justify-content-center">
          <div className={`${ErrorStyles.error_content}`}>
            <div className="p-3" style={{ fontSize: '40px' }}>
              <Image src={image} width={250} height={250} alt="Error Image" />
            </div>
            <h4 data-text="Access Denied!">Access Denied!</h4>
            <p className="text-secondary">
              You do not have permission to view this page.
              <br />
              Please check your credentials and try again.
            </p>
            <button className="btn btn-primary border-0" style={{ backgroundColor: '#ff3b3b' }} onClick={() => router.push('/')}>
              Home Page
            </button>
          </div>
        </div>
      );
    } else
      return (
        <div className="container mb-5">
          <div className="mt-5 text-center fw-bold">
            <h1>Catalog List</h1>
          </div>
          <div className="row mt-2">
            {catalogList?.length > 0 &&
              catalogList?.map((catalog: any, index: any) => (
                <div className="col-lg-3 col-md-4 col-6 position-relative mt-3">
                  {catalog?.image !== '' && catalog?.image !== null ? (
                    <div className={styles.catalog_img}>
                      <Image
                        src={catalog?.image}
                        alt="catalog-image"
                        className="img-fluid w-100 h-100 rounded"
                        width={100}
                        height={100}
                        loader={imageLoader}
                      />
                    </div>
                  ) : (
                    <div className={styles.catalog_img}>
                      <Image src={noImage} alt="catalog-image" className=" w-100 h-100 rounded" width={100} height={100} />
                    </div>
                  )}
                  <div className="d-flex justify-content-center">
                    <Link
                      href={{ pathname: `/catalog/${catalog?.slug}`, query: { page: 1 } }}
                      className={`${styles.catalog_list_btn}`}
                      onClick={() => handleClickCatalogName(catalog?.slug)}
                    >
                      <span>{catalog?.name}</span>
                      <span className="ps-2">
                        <FaArrowRightLong />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
  };
  return <>{handleDataRendering()}</>;
}
export default CatalogListingMaster;
