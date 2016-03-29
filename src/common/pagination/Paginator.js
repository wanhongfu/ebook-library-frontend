import React, { Component, PropTypes } from 'react';

import _ from 'lodash';

import {TableRow, TableRowColumn, FlatButton, TableFooter} from 'material-ui';
import { Colors } from 'material-ui/lib/styles';
import { NavigationChevronLeft, NavigationChevronRight, NavigationMoreHoriz } from 'material-ui/lib/svg-icons';

import PaginationIndicator from './PaginationIndicator';
import PaginationInfo from './PaginationInfo';

class Paginator extends Component {

    static propTypes = {
        simpleNavi: PropTypes.bool,

        currentPage: PropTypes.number.isRequired,
        pageRange: PropTypes.number,
        totalRecNum: PropTypes.number.isRequired,
        pageSize: PropTypes.number,
        onPageChange: PropTypes.func
    }

    static defaultProps = {
        pageSize: 5,
        pageRange: 5,
        simpleNavi: false
    }

    onPageChange = (page) => {
        if (page >= 1 && page <= this.getNumOfPages())
            this.props.onPageChange(page);
    }

    getNumOfPages() {
        const nbPages = Math.ceil(this.props.totalRecNum / this.props.pageSize);
        return nbPages <= 0 ? 1 : nbPages;
    }

    getMinRange() {
        const {pageRange, currentPage} = this.props;
        return (Math.ceil(currentPage / pageRange) - 1) * pageRange + 1;
    }

    getMaxRange() {
        const max = this.getMinRange() + this.props.pageRange - 1;
        return max < this.getNumOfPages() ? max : this.getNumOfPages();
    }

    renderNeighbour({disabled, page, icon}) {
        return (
            <PaginationIndicator
                disabled={disabled}
                onClick={this.onPageChange}
                pageNum={page}
                icon = {icon}
                key = {page}
            />
        );
    }


    renderBreak(page) {
        if (page >= this.getNumOfPages() || page <= 0)
            return null;

        return (
            <PaginationIndicator
                onClick={this.onPageChange}
                pageNum={page}
                key = {page}
                icon={<NavigationMoreHoriz />}
            />
        );
    }

    renderPrevious(){
        return this.renderNeighbour({
            disabled: this.props.currentPage === 1,
            page: this.props.currentPage - 1,
            icon: <NavigationChevronLeft />
        });
    }

    renderPreviousBreak(){
        const result = this.renderBreak(this.getMinRange() - 1);
        if(result) {
            const resultArray = new Array();
            resultArray.push( <PaginationIndicator key={1} label={1} onClick={this.onPageChange} pageNum={1}/>);
            resultArray.push( result );
            return resultArray;
        }
    }

    renderPages(){
        const result = new Array();;
        for(var i=this.getMinRange(); i<this.getMaxRange()+1; i++){
            result.push(this.renderPage(i))
        }
        return result;
    }

    renderPage(page){
        return (
            <PaginationIndicator
                active={this.props.currentPage === page}
                key={page}
                label={String(page)}
                onClick={this.onPageChange}
                pageNum={page}
            />
        );
    }

    renderNextBreak(){
        const result = this.renderBreak(this.getMaxRange() + 1);
        if(result) {
            const resultArray = new Array();
            const np = this.getNumOfPages();
            resultArray.push( result );
            resultArray.push( <PaginationIndicator key={np} label={String(np)} onClick={this.onPageChange} pageNum={np}/>);
            return resultArray;
        }
    }

    renderNext(){
        return this.renderNeighbour({
            disabled: this.props.currentPage === this.getNumOfPages(),
            page: this.props.currentPage + 1,
            icon: <NavigationChevronRight />
        });
    }

    renderPaginationInfo() {
        return (<PaginationInfo totalPageNum={this.getNumOfPages()}
                                currnetPage={this.props.currentPage}
                                totalRecNum={this.props.totalRecNum} />);
    }

    render(){

        if(this.props.simpleNavi) {
            return(
                <div>
                    {this.renderPrevious()}
                    {this.renderNext()}
                </div>
            );
        }

        return(
            <div>
                {this.renderPrevious()}
                {this.renderPreviousBreak()}
                {this.renderPages()}
                {this.renderNextBreak()}
                {this.renderNext()}
                {this.renderPaginationInfo()}
            </div>
        );
    }
}

export default Paginator;