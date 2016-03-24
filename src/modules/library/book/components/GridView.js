import React, { Component, PropTypes } from 'react';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/lib/icon-button';

class GridView extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        currentUser: PropTypes.string,
        books: PropTypes.array,
        onViewBookDetail: PropTypes.func,
        onViewBookDetailPopup: PropTypes.func
    }

    render() {

        const styles = {
            gridList: {
                margin: 20,
            }
        };

        return (
            <div>

                <GridList
                    cellHeight={200}
                    style={styles.gridList}
                    cols={5}
                >
                    {this.props.books.map(book => (
                        <GridTile
                            key={book.id}
                            title={book.title}
                            subtitle={<span>{book.owner.name} 发布于 <b>{book.onboardDate}</b></span>}
                            actionIcon={<IconButton><MoreVertIcon color="white"/></IconButton>}
                        >
                            <img width="220" height="220" src="http://img10.360buyimg.com/n7/jfs/t973/37/548349349/435306/2701a302/552f692dN2353ab9c.jpg"/>
                        </GridTile>
                    ))}
                </GridList>

            </div>
        );
    }

}

export default GridView;