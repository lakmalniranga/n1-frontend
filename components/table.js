import Image from "next/image";
import Router from "next/router";
import { useTable, usePagination } from "react-table";

export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  function onRawClick(data) {
    Router.push(`/block/${data.original.hash}`);
  }

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-max w-full table-auto">
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr
              key={i}
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
            >
              {headerGroup.headers.map((column, k) => (
                <th
                  key={k}
                  {...column.getHeaderProps()}
                  className="py-3 px-6 text-center"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="text-gray-600 text-sm font-light"
        >
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                key={i}
                {...row.getRowProps()}
                onClick={() => onRawClick(row)}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                {row.cells.map((cell, k) => {
                  return (
                    <td
                      key={i}
                      {...cell.getCellProps()}
                      className="py-3 px-6 text-center whitespace-nowrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination flex items-center py-3 px-5 mt-5">
        <div className="flex-1">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="text-sm bg-gray-200 hover:bg-gray-400 py-1 px-4 rounded-l"
          >
            <Image
              src="/icons/chevrons-left.svg"
              height={18}
              width={18}
              alt="chevrons-left"
            />
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="text-sm bg-gray-200 hover:bg-gray-400 py-1 px-4"
          >
            <Image
              src="/icons/chevron-left.svg"
              height={18}
              width={18}
              alt="chevron-left"
            />
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="text-sm bg-gray-200 hover:bg-gray-400 py-1 px-4"
          >
            <Image
              src="/icons/chevron-right.svg"
              height={18}
              width={18}
              fill={"text-gray-800"}
              alt="chevron-right"
            />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="text-sm bg-gray-200 hover:bg-gray-400 py-1 px-4 rounded-r"
          >
            <Image
              src="/icons/chevrons-right.svg"
              height={18}
              width={18}
              alt="chevrons-right"
            />
          </button>
        </div>
        <div className="flex flex-1 justify-center text-sm font-light text-gray-700 leading-normal">
          Showing page {pageIndex + 1} of {pageOptions.length}
        </div>
        <div className="flex flex-1 justify-end text-sm font-light">
          <select
            className="text-sm bg-gray-200 hover:bg-gray-400 py-1 px-4 rounded text-gray-700"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
