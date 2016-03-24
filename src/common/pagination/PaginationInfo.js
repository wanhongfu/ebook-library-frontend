import React, { Component, PropTypes } from 'react';

const PaginationInfo = (props) => (
    <span>&nbsp;&nbsp;&nbsp;&nbsp;{props.currnetPage} / {props.totalPageNum}</span>
);

PaginationInfo.propTypes = {
    totalPageNum: PropTypes.number.isRequired,
    currnetPage: PropTypes.number.isRequired,
    totalRecordNum: PropTypes.number.isRequired
}

export default PaginationInfo;