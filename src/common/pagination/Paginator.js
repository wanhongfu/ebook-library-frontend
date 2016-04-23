import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import { NavigationChevronLeft, NavigationChevronRight, NavigationMoreHoriz } from 'material-ui/lib/svg-icons';

import PaginationIndicator from './PaginationIndicator';
import PaginationInfo from './PaginationInfo';

class Paginator extends Component {

    static propTypes = {
        simpleNavi  : PropTypes.bool,

        currentPage : PropTypes.number.isRequired,
        pageRange   : PropTypes.number,
        totalRecNum : PropTypes.number.isRequired,
        pageSize    : PropTypes.number,
        onPageChange: PropTypes.func
    }

    static defaultProps = {
        pageSize    : 5,
        pageRange   : 5,
        simpleNavi  : false
    }

    onPageChange = (page) => {
        if (page >= 1 && page <= this._getNumOfPages())
            this.props.onPageChange(page);
    }

    _getNumOfPages() {
        const { totalRecNum, pageSize } = this.props;
        const nbPages = Math.ceil(totalRecNum / pageSize);
        return nbPages <= 0 ? 1 : nbPages;
    }

    _getMinRange() {
        const { pageRange, currentPage } = this.props;
        const nbPages = this._getNumOfPages();
        if(nbPages <= pageRange) return 1;
        if(nbPages-currentPage < pageRange) {
            return nbPages - pageRange;
        }
        return (Math.ceil(currentPage / pageRange) - 1) * pageRange + 1;
    }

    _getMaxRange() {
        const max = this._getMinRange() + this.props.pageRange - 1;
        return max <= this._getNumOfPages() ? max : this._getNumOfPages();
    }

    _renderNeighbour({disabled, page, icon, key=null}) {
        if(key === null) key = page;
        return (
            <PaginationIndicator
                disabled    = {disabled}
                onClick     = {this.onPageChange}
                pageNum     = {page}
                icon        = {icon}
                key         = {key}
            />
        );
    }
    
    _renderBreak(page) {
        if (_.isNaN(page) || page >= this._getNumOfPages() || page <= 0)
            return null;
        return (
            <PaginationIndicator
                onClick = {this.onPageChange}
                pageNum = {page}
                key     = {page}
                icon    = {<NavigationMoreHoriz />}
            />
        );
    }

    _renderPage(page){
        if(_.isNaN(page)) return;
        return (
            <PaginationIndicator
                active  = {this.props.currentPage == page}
                key     = {page}
                label   = {String(page)}
                onClick = {this.onPageChange}
                pageNum = {page}
            />
        );
    }

    renderPrevious(){
        const { currentPage } = this.props;
        return this._renderNeighbour({
            disabled : currentPage == 1,
            page     : currentPage - 1,
            icon     : <NavigationChevronLeft />,
            key      : "_pg-pre-0101"
        });
    }

    renderPreviousBreak(){
        const resultArray = new Array(),
              { currentPage, pageRange } = this.props,
              minRange = this._getMinRange();
        let breakPage = minRange - 1;

        resultArray.push(this._renderPage(1));

        const shouldRenderBreak = this._getNumOfPages() > pageRange
                            && currentPage == minRange
                            && currentPage != 1
                            && currentPage - 1 != 1;
        if(shouldRenderBreak) {
            breakPage -= 1;
        }

        const prevBreak = this._renderBreak(breakPage);
        if(prevBreak && prevBreak !== null) {
            resultArray.push(prevBreak);
        }

        if(shouldRenderBreak) {
            resultArray.push(this._renderPage(currentPage-1));
        }

        return resultArray;
    }

    renderPages(){
        const result = new Array();
        const totalPageNum = this._getNumOfPages();
        for(var i=this._getMinRange(); i<this._getMaxRange()+1; i++){
            if(i === 1 || i == totalPageNum) continue;
            result.push(this._renderPage(i))
        }
        return result;
    }

    renderNextBreak(){
        const resultArray = new Array(),
              np = this._getNumOfPages(),
              maxRange = this._getMaxRange(),
              { currentPage, pageRange } = this.props;

        const shouldRenderBreak = np > pageRange
                            && currentPage == maxRange
                            && currentPage + 1 != np;
        let breakPage = maxRange+1;
        if(shouldRenderBreak) {
            resultArray.push(this._renderPage(currentPage+1));
            breakPage += 1;
        }
        const nextBreak = this._renderBreak(breakPage);
        if(nextBreak && nextBreak !== null) {
            resultArray.push(nextBreak);
        }
        resultArray.push(this._renderPage(np));
        return resultArray;
    }

    renderNext(){
        const { currentPage } = this.props;
        return this._renderNeighbour({
            disabled : currentPage == this._getNumOfPages(),
            page     : currentPage + 1,
            icon     : <NavigationChevronRight />,
            key      : "_pg-next-0202"
        });
    }

    renderPaginationInfo() {
        return (
            <PaginationInfo
                totalPageNum = {this._getNumOfPages()}
                currnetPage  = {this.props.currentPage}
                totalRecNum  = {this.props.totalRecNum}
            />
        );
    }

    render(){

        if(this.props.totalRecNum === 0) return null;
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