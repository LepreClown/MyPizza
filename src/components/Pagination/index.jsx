import styles from './Pagination.module.scss'
import ReactPaginate from "react-paginate";

const Pagination = ({currentPage,onChangePage}) => {
	return (
		<ReactPaginate
			pageCount={3}
			forcePage={currentPage -1}
			pageRangeDisplayed={4}
			className={styles.root}
			breakLabel={'...'}
			previousLabel={'<'}
			nextLabel={'>'}
			onPageChange={(event) => onChangePage(event.selected + 1)}
			renderOnZeroPageCount={null}
		/>
	)
};

export default Pagination;