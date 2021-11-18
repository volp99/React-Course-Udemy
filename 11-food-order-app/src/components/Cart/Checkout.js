import {useRef, useState} from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === ''; // funzione che verifica che l'input sia vuoto
const isFiveChars = (value) => value.trim().length === 5;   //  funzione che verifica che il postal code sia lungo 5

const Checkout = (props) => {
	//  state iniziale per la validazione a true
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});

	// useRef
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault(); //  annulla l'evento se è annullabile

		//  associo a delle costanti il valore per ogni dato utilizzando le precedenti ref
		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		//  verifica che i campi di input non siano vuoti
		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		//  verifica che il campo postalcoode sia delle lunghezza massima impostata
		const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

		//  associo allo state gli oggetti con il controllo effettuato precedentemente
		setFormInputsValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postalCode: enteredPostalCodeIsValid,
		});

		//  creao una costante globale che richiama tutte le costanti valide per ogni valore
		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredCityIsValid &&
			enteredPostalCodeIsValid;

		//  condizione che se il form non è valido, allora termina l'esecuzione
		if (!formIsValid) {
			return;
		}

		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			city: enteredCity,
			postalCode: enteredPostalCode,
		});
	};

	//  per ogni campo di input, associa una condizione che si verifica in base se il campo è nullo o meno
	const nameControlClasses = `${classes.control} ${
		formInputsValidity.name ? '' : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		formInputsValidity.street ? '' : classes.invalid
	}`;
	const postalCodeControlClasses = `${classes.control} ${
		formInputsValidity.postalCode ? '' : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		formInputsValidity.city ? '' : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>   {/* richiamo la funzione principale*/}
			<div className={nameControlClasses}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameInputRef}/>
				{!formInputsValidity.name &&
				<p>Please enter a valid name!</p>} {/* per ogni inoput, se non è valido mostra messagio di errore*/}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef}/>
				{!formInputsValidity.street && <p>Please enter a valid street!</p>}
			</div>
			<div className={postalCodeControlClasses}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalCodeInputRef}/>
				{!formInputsValidity.postalCode && (
					<p>Please enter a valid postal code (5 characters long)!</p>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityInputRef}/>
				{!formInputsValidity.city && <p>Please enter a valid city!</p>}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;