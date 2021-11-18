import {Redirect, Route, Switch} from 'react-router-dom';
import Welcome from "./pages/welcome";
import Products from "./pages/Products"
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";

function App() {
	return (
		<div>
			<header>
				<MainHeader/>
			</header>
			<maain>
				<Switch>
					<Route path="/" exact>
						<Redirect to="/welcome"/>
					</Route>
					<Route path="/welcome">
						<Welcome/>
					</Route>
					<Route path="/products" exact>
						<Products/>
					</Route>
					<Route path="/products/:productId">
						<ProductDetail/>
					</Route>
				</Switch>
			</maain>
		</div>
	);
}

export default App;
