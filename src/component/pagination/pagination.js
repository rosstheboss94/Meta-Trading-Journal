import React, { Fragment, useState } from "react";
import { Pagination } from "react-bootstrap";

const Paginat = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  
console.log(props.itemsList);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const currentItems = props.itemsList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.itemsList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const setPage = (number) => {
    setCurrentPage(number);
  };

  return (
    <Fragment>
      {/*currentItems*/}
      <Pagination className="justify-content-center">
        {pageNumbers.map((number) => (
          <Pagination.Item
            onClick={() => {
              setPage(number);
            }}
          >
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </Fragment>
  );
};

export default Paginat;
