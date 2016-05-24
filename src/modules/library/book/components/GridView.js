import React, { Component, PropTypes } from 'react';

import { GridList, GridTile, IconButton, MenuItem, IconMenu } from 'material-ui';
import { NavigationMoreVert, ActionDelete, ImageEdit, FileFileUpload } from 'material-ui/lib/svg-icons';

import Common from '../../../../common';
import config from '../../../../config';

class GridView extends Component {

    static propTypes = {
        isAuthenticated         : PropTypes.bool.isRequired,
        currentUser             : PropTypes.string,
        books                   : PropTypes.array,
        onViewBookDetail        : PropTypes.func,
        onViewBookDetailPopup   : PropTypes.func,
        onEditBook              : PropTypes.func,
        onDeleteBook            : PropTypes.func,
        onUploadBookIcon        : PropTypes.func,
        fetching                : PropTypes.bool,

        onPageChanged   : PropTypes.func,
        currentPage     : PropTypes.number,
        totalRecNum     : PropTypes.number,
        pageSize        : PropTypes.number,
    }

    handlePageClick = (page) => {
        const {onPageChanged} = this.props;
        if(onPageChanged) {
            onPageChanged(page);
        }
    }

    renderIconMenu(book) {
        const disabled = !this.props.isAuthenticated;
        return (
            <IconMenu
                iconButtonElement={<IconButton><NavigationMoreVert color="white"/></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                <MenuItem
                    primaryText="详细信息(Popup)"
                    onClick={this.props.onViewBookDetailPopup.bind(this, book)}
                />
                <MenuItem
                    primaryText="修改"
                    disabled={ disabled }
                    onClick={disabled ? null : this.props.onEditBook.bind(this, book)}
                    rightIcon={<ImageEdit />}
                />
                <MenuItem
                    primaryText="删除"
                    disabled={ disabled }
                    onClick={disabled ? null : this.props.onDeleteBook.bind(this, book)}
                    rightIcon={<ActionDelete />}
                />
                <MenuItem
                    primaryText="上传封面"
                    disabled={ disabled }
                    onClick={disabled ? null : this.props.onUploadBookIcon.bind(this, book)}
                    rightIcon={<FileFileUpload />}
                />
            </IconMenu>
        );
    }

    renderContent() {
        const styles = {
            gridList: {
                margin: 20,
            }
        };
        const tag = new Date().getMilliseconds();
        return (
            <div>
                <div>
                    <GridList
                        cellHeight={200}
                        style={styles.gridList}
                        cols={5}
                    >
                        {this.props.books.map(book => (
                            <GridTile
                                key         =   {book.id}
                                title       =   {book.title}
                                subtitle    =   {<span>{book.owner.name} 发布于 <b>{book.onboardDate}</b></span>}
                                actionIcon  =   { this.renderIconMenu(book)}
                            >
                                <img width="200" height="300" src={`${config.baseUrl}/api/books/${book.id}/icon?_${tag}`}/>
                            </GridTile>
                        ))}
                    </GridList>
                </div>
                <div style={{textAlign: 'right', marginRight: `30px`}}>
                    <Common.Paginator
                        pageSize      =   {this.props.pageSize}
                        currentPage   =   {this.props.currentPage}
                        totalRecNum   =   {this.props.totalRecNum}
                        onPageChange  =   {this.handlePageClick}
                    />
                </div>
            </div>
        );
    }

    render() {
        return this.props.fetching ? <Common.Loading /> : this.renderContent();
    }

}

export default GridView;