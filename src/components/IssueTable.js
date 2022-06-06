import React from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IssueTable = ({ columns, data, handleClick }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const buttonStyle = {
    borderLeft: "1px solid #956A4C",
    borderRight: "1px solid #956A4C",
    height: "2rem"
  };
  const chevronStyle = { paddingLeft: ".5rem", fontSize: "1rem" };

  return (
    <>
      <table
        {...getTableProps()}
        border={1}
        style={{
          borderCollapse: "collapse",
          width: "100%",
          border: "1px solid #956A4C"
        }}
      >
        <thead>
          <tr>
            <th
              colSpan={100}
              style={{
                textAlign: "left",
                padding: 10,
                background: "#adc5d6"
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map((group) => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: "solid 3px #956A4C",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    cursor: "default"
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon
                          style={chevronStyle}
                          icon={faChevronUp}
                        />
                      ) : (
                        <FontAwesomeIcon
                          style={chevronStyle}
                          icon={faChevronDown}
                        />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ color: "black" }}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="table-items"
                      {...cell.getCellProps()}
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                        border: "solid 1px #956A4C",
                        borderBottom: "solid 3px #956A4C",
                        background:
                          row.original.status === "closed"
                            ? "lightgray"
                            : row.original.priority === "high"
                            ? "#ff9898"
                            : row.original.priority === "normal"
                            ? "#FFEFD5"
                            : "#b4dcff"
                      }}
                      id={row.original.id}
                      onClick={handleClick}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="pagination">
        <button
          style={{ ...buttonStyle, width: "2rem" }}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          style={buttonStyle}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          style={buttonStyle}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          style={buttonStyle}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            style={{
              ...buttonStyle,
              maxWidth: "50px",
              borderLeft: "1px solid #956A4C",
              borderRight: "1px solid #956A4C",
              height: "2rem"
            }}
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </span>{" "}
        <select
          style={{ ...buttonStyle }}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[2, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default IssueTable;
