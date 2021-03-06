import React, { Component } from 'react'
import classes from './Layout.module.scss'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'

class Layout extends Component {
    state = {
        menu: false
    }

    _toggleMenu = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    _menuClose = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return(
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this._menuClose}
                />
                <MenuToggle
                    onToggle={this._toggleMenu}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout