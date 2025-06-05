import Image from 'next/image';
import Link from 'next/link';
import { Accordion, Offcanvas } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import logo from '../../public/assets/images/logo.png';
import styles from '../../styles/components/navbar.module.scss';

const MobSideNavbar = ({ isLoading, show, handleClose, navbarData, setIsSidebarOpen, searchTerm, setSearchTerm, handleSearch }: any) => {
  const handleDataRendering = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (navbarData?.length > 0) {
      const categoriesData = navbarData[0]?.values;
      return (
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <div className={''}>
              <Link href="/" legacyBehavior>
                <a>
                  <Image src={logo} alt="logo" width={50} />
                </a>
              </Link>
            </div>{' '}
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className={`d-block ${styles.search_bar}`}>
              <div className="search-input position-relative ">
                <input
                  type="text"
                  className={`form-control ${styles.search_bar_input}`}
                  name="search"
                  id="search"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={(e: any) => setSearchTerm(e.target.value)}
                  required
                />
                <FaSearch className={styles.search_icon} onClick={handleSearch} />
              </div>
            </div>
            <div className="nav-sidebar ">
              <Accordion>
                {categoriesData?.length > 0 &&
                  categoriesData?.map((itemL1: any, indexL1: number) => (
                    <Accordion.Item eventKey={`${indexL1}`} className="border-0" key={indexL1}>
                      <Accordion.Header className="fs-16 ">
                        <div>
                          <b>{itemL1?.label}</b>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className='p-0'>
                        {itemL1?.values?.length > 0 &&
                          itemL1?.values !== null &&
                          itemL1?.values.map((itemL2: any, indexL2: number) => {
                            return (
                              <div className="nav-sidebar2" key={indexL2}>
                                <Accordion>
                                  <Accordion.Item eventKey={`${indexL2}`} className="border-0">
                                    <Accordion.Header>
                                      <Link
                                        href={{
                                          pathname: `${itemL2?.url}`,
                                          query: { page: '1', sort_by: 'latest', currency: 'INR' },
                                        }}
                                        className="px-3 text-decoration-none text-dark"
                                        onClick={() => setIsSidebarOpen(false)}
                                      >
                                        {itemL2?.label}
                                      </Link>
                                    </Accordion.Header>
                                    <Accordion.Body className='p-0'>
                                      {itemL2?.values?.length > 0 &&
                                        itemL2?.values?.map((itemL3: any, indexL3: number) => (
                                          <Link
                                            key={indexL3}
                                            href={{
                                              pathname: `${itemL3?.url}`,
                                              query: { page: '1', sort_by: 'latest', currency: 'INR' },
                                            }}
                                            className="text-decoration-none text-dark"
                                            onClick={() => setIsSidebarOpen(false)}
                                          >
                                            <p className="px-5 py-3 m-0 ">{itemL3?.label}</p>
                                          </Link>
                                        ))}
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </div>
                            );
                          })}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
              </Accordion>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      );
    }
    return <div>No data found</div>;
  };

  return <>{handleDataRendering()}</>;
};

export default MobSideNavbar;
