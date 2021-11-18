import React, {useContext, useState} from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);    // state per il checkout
	const [isSubmitting, setIsSubmitting] = useState(false);    //  state per inviare i dati
	const [didSubmit, setDidSubmit] = useState(false);  // state che verifica se i dati sono stati inviati
	const cartCtx = useContext(CartContext);    //  useContext

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;   //  set il total amount a due cifre dopo la virgola
	const hasItems = cartCtx.items.length > 0;  // dall'array items, perndi gli elementi maggiori di zero

	//  funzione che rimuove un elemento dal carrello per ogni elemento
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	//  funzione che aggiunge un elemento al carrello per ogni elemento
	const cartItemAddHandler = (item) => {
		cartCtx.addItem(item);
	};

	// funzione per l'ordine eseguito
	const orderHandler = () => {
		setIsCheckout(true);
	};

	// POST call
	const submitOrderHandler = async (userData) => {    //  passo userData come parametro
		setIsSubmitting(true);  //  state per inviare i dati a true
		await fetch('https://food-order-app-158af-default-rtdb.europe-west1.firebasedatabase.app/Order.json', {
			method: 'POST', //  metodo POST
			body: JSON.stringify({  //  converto l'oggetto JS in una stringa JSON
				user: userData, //  i miei dati
				orderedItems: cartCtx.items,    // gli elementi messi nel carrello
			}),
		});
		setIsSubmitting(false); //  state per inviare i dati a false
		setDidSubmit(true); // state che verifica che i dati siano stati inviati a true
		cartCtx.clearCart() // setta nuovamente il carrello a zero
	};

	// Funzione che contiene gli elementi nel carrello
	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (  //  mapping
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	//  Funzione per la modale
	const modalActions = (
		<div className={classes.actions}>
			{/* Pulsante chiusura modale */}
			<button className={classes['button--alt']} onClick={props.onClose}>Close</button>
			{/* Condizione che se nel carrello sono presente elementi, allora mostra pulsante per ordinare */}
			{hasItems && (<button className={classes.button} onClick={orderHandler}>Order</button>)}
		</div>
	);

	// Funzione per il contenuto della modale
	const cartModalContent = (
		<React.Fragment>
			{cartItems} {/* passo gli elementi presenti nel carrello */}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span> {/* mostro il total amount */}
			</div>
			{/* condizione che se non ho fatto il checkout, quando clicco su 'Order', allora mostrami il componente di Checkout*/}
			{isCheckout && (<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>)}
			{/* condizione che se sto facendo il checkout, mi mostra i pulsati Close e Order*/}
			{!isCheckout && modalActions}
		</React.Fragment>
	);

	// Funzione che mostra questo messaggio dopo aver compilato tutti i campi e cliccato su Order
	const isSubmittingModalContent = <p>Sending order data...</p>;

	// Funzione che mostra questo messaggio quando l'ordine è stato inviato correttamente
	const didSubmitModalContent = (
		<React.Fragment>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{/* condizione che mostra il contenuto per la modale*/}
			{!isSubmitting && !didSubmit && cartModalContent}
			{/* condizione che mostra il messaggio di invio dati*/}
			{isSubmitting && isSubmittingModalContent}
			{/* condizione che mostra il messaggio di invio dati riuscito correttamente */}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;