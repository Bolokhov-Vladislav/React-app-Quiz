import React, {Component} from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'


const links = [
	{to: '/', lable: 'Список', exact: true},
	{to: '/auth', lable: 'Авторизация', exact: false},
	{to: '/quiz-creator', lable: 'Создать тест', exact: false}
]
class Drawer extends Component {

	_renderLinks() {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink to={link.to} exact={link.exact} activeClassName={classes.active} onClick={this.props.onClose}>
						{link.lable}
					</NavLink>
				</li>
			)
		})
	}
	
	render() {
		const cls = [classes.Drawer]

		if(!this.props.isOpen){
			cls.push(classes.close)
		}
		return (
			<>
				<nav className={cls.join(' ')}>
					<ul>
						{this._renderLinks()}
					</ul>
				</nav>
				{this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
			</>
		)
	}
}

export default Drawer