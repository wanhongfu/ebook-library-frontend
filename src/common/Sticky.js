import React, {Component, PropTypes} from 'react';
import util from 'dom-find';

class Sticky extends Component {

    static propTypes = {
        offsetTop: React.PropTypes.number,
        zIndex: React.PropTypes.number,
        className: React.PropTypes.string
    }

    state = {
        fix: false,
        width: null
    }

    static defaultProps = {
        offsetTop: 0,
        className: '',
        zIndex: 9999
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
        window.addEventListener('resize', this.handleResize);

        this.checkWidth();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.checkWidth();
        this.checkPositions();
    }

    onScroll() {
        this.checkWidth();
        this.checkPositions();
    }

    checkPositions() {
        var pos = util.findPosRelativeToViewport(ReactDOM.findDOMNode(this));

        if (pos[1]<=this.props.offsetTop){
            this.setState({fix: true});
        } else {
            this.setState({fix: false});
        }
    }

    checkWidth() {
        var width = null;
        if (this.refs.duplicate) {
            width = this.refs.duplicate.getBoundingClientRect().width;
        } else {
            width = this.refs.original.getBoundingClientRect().width;
        }
        if (this.state.width !== width) {
            this.setState({
                width: width
            });
        }
    }

    render() {

        if (this.state.fix) {
            const divStyle = {
                display     : 'block',
                position    : 'fixed',
                width       : this.state.width ? (this.state.width + 'px') : null,
                top         : this.props.offsetTop
            };
            return <div style={{zIndex : this.props.zIndex, position:'relative', width:'100%'}}>
                <div ref='duplicate' key='duplicate' style={{visibility:'hidden'}}>
                    {this.props.children}
                </div>
                <div ref='original' key='original' className={this.props.className} style={divStyle}>
                    {this.props.children}
                </div>
            </div>;
        } else {
            const divStyle = {
                display  : 'block',
                position : 'relative'
            };
            return <div style={{zIndex : this.props.zIndex, position:'relative', width:'100%'}}>
                <div ref='original' key='original' style={divStyle}>
                    {this.props.children}
                </div>
            </div>;
        }
    }
}

export default Sticky;