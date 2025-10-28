import React from 'react'
import ReactPaginate from 'react-paginate'
import paginationStyle from '../../styles/components/pagination.module.scss';

function Pagination({totalCount, handlePageClick, pageOffset, isNextButtonDisabled}: any) {
  return (
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        pageCount={totalCount / 12}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={`${paginationStyle.paginationBttns}`}
        previousLinkClassName={pageOffset === 0 ? paginationStyle.paginationDisabled : paginationStyle.previousBttn}
        disabledClassName={paginationStyle.paginationDisabled}
        nextLinkClassName={isNextButtonDisabled ? paginationStyle.paginationDisabled : `${paginationStyle.nextBttn}`}
        activeClassName={`${paginationStyle.paginationActive}`}
        forcePage={pageOffset}
      />
  )
}

export default Pagination