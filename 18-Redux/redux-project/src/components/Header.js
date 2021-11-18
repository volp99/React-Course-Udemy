import {useDispatch, useSelector} from "react-redux";
import classes from './Header.module.css';
import {authActions} from "../store/authSlice";

const Header = () => {
	const dispatch = useDispatch()

	//  chiamo la funzione per authentication
	const isAuth = useSelector(state => state.auth.isAuthenticated)

	// creo la funzione per il logout e all'interno richiamo la action di logout
	const logoutHandler = () => {
		dispatch(authActions.logout())
	}

	return (
		<header className={classes.header}>
			<h1>Redux Auth</h1>
			{/* Se isAuth è true allora mostra gli elementi*/}
			{isAuth && (
				<nav>
					<ul>
						<li>
							<a href='/'>My Products</a>
						</li>
						<li>
							<a href='/'>My Sales</a>
						</li>
						<li>
							<button onClick={logoutHandler}>Logout</button>
						</li>
					</ul>
				</nav>
			)}
		</header>
	);
};

export default Header;
