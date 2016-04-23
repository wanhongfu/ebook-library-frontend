import React, { Component, PropTypes } from 'react';
import { ToolbarGroup, ToolbarTitle, Toolbar, IconButton } from 'material-ui';
import { NavigationArrowBack } from 'material-ui/lib/svg-icons';
import Sticky from '../Sticky';

class InnerToolbar extends Component {

    static propTypes = {
        children: React.PropTypes.node,

        showBackButton              : React.PropTypes.bool,
        backButtonTooltipPosition   : React.PropTypes.string,
        backButtonTooltip           : React.PropTypes.string,
        onBackButtonClick           : React.PropTypes.func
    }

    static defaultProps = {
        showBackButton              : false,
        backButtonTooltipPosition   : 'bottom-right',
        onBackButtonClick           : null,
        backButtonTooltip           : '返回'
    }

    getStyles() {
        return {
            toolbar: {
                background: 'rgba(243,243,243,0.90)',
                padding: '0px 24px 0 24px',
                zIndex: 6
            },
            toolbarRight: {
                height: '100%',
                display: 'flex',
                alignItems: 'center'
            }
        };
    }

    renderChildren(children) {
        const styles = this.getStyles();

        return (
            <ToolbarGroup
                float="right"
                style={styles.toolbarRight}>
                {children}
            </ToolbarGroup>
        );
    }

    renderMenu(menu) {
        return (
            <ToolbarGroup>
                {menu}
            </ToolbarGroup>
        );
    }

    renderTitle(title) {
        return;
    }

    renderBackButton() {
        const {backButtonTooltip, backButtonTooltipPosition, onBackButtonClick, title} = this.props;

        return (
            <ToolbarGroup style={{paddingRight: 24}}>
                <IconButton touch={true}
                            style={{marginTop: 4}}
                            tooltipPosition={backButtonTooltipPosition}
                            tooltip={backButtonTooltip}
                            iconStyle={{color: 'rgba(0,0,0,.4)'}}
                            onClick={onBackButtonClick}
                >
                    <NavigationArrowBack />
                </IconButton>

                <ToolbarTitle
                    text={title}
                    style={{paddingRight: 0}} />

            </ToolbarGroup>
        );
    }

    render() {
        const styles = this.getStyles();
        const {children, menu, title, showBackButton } = this.props;

        return (
            <Sticky offsetTop={50} zIndex={12}>
                <Toolbar style={styles.toolbar}>
                    {showBackButton ? this.renderBackButton() : null}
                    {title ? this.renderTitle(title) : null}
                    {menu ? this.renderMenu(menu) : null}
                    {children ? this.renderChildren(children) : null}
                </Toolbar>
            </Sticky>
        );
    }
}

export default InnerToolbar;