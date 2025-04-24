import { FC } from 'react'
import ReactPaginate from 'react-paginate'

interface IPaginateProps {
    page: number
    pageSize: number
    response: any
    setPage: (page: number) => void

}

export const Paginate: FC<IPaginateProps> = ({ page, pageSize, response, setPage }) => {

    const handlePageClick = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected);
    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="Следующая >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(response.totalCount / pageSize)}
            previousLabel="< Предыдущая"
            renderOnZeroPageCount={null}
            forcePage={page}
            containerClassName="flex justify-center gap-2"
            pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
            activeClassName="bg-blue-500 text-white"
            previousClassName="px-3 py-1 border rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            nextClassName="px-3 py-1 border rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabledClassName="opacity-50 cursor-not-allowed"
            breakClassName="px-3 py-1"
        />
    )
}
