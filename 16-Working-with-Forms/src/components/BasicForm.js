import useInput from "../hooks/use-input";

const isNotEmpty = value => value.trim() !== ''
const isEmail = value => value.includes('@')

const BasicForm = (props) => {

	// First name
	const {
		value: firstNameValue,
		isValid: firstNameIsValid,
		hasError: firstNameHasError,
		valueChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: resetFirstName

	} = useInput(isNotEmpty)

	// Last name
	const {
		value: lastNameValue,
		isValid: lastNameIsValid,
		hasError: lastNameHasError,
		valueChangeHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: resetLastName
	} = useInput(isNotEmpty)

	//  Email address
	const {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail
	} = useInput(isEmail)

	let formIsValid = false // inizialmente a false
	if (firstNameIsValid && lastNameIsValid && emailIsValid) {  //  se i 3 input sono validi allora swith a true
		formIsValid = true
	}

	const submitHanler = e => {
		e.preventDefault()

		if (!formIsValid) {
			return;
		}
		console.log('submit')
		console.log(firstNameValue, lastNameValue, emailValue)

		// Resetta i campi di testo una volta inviato il form
		resetFirstName()
		resetLastName()
		resetEmail()
	}

	// Stili dinamici per i campi di testo in base alla condizione
	const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control'
	const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control'
	const emailClasses = emailHasError ? 'form-control invalid' : 'form-control'

	return (
		<form onSubmit={submitHanler}>
			<div className='control-group'>
				<div className={firstNameClasses}>
					<label htmlFor='name'>First Name</label>
					<input
						type='text'
						id='name'
						value={firstNameValue}
						onChange={firstNameChangeHandler}
						onBlur={firstNameBlurHandler}
					/>
					{firstNameHasError && <p className='error-text'>Please enter a name</p>}
				</div>
				<div className={lastNameClasses}>
					<label htmlFor='name'>Last Name</label>
					<input
						type='text'
						id='name'
						value={lastNameValue}
						onChange={lastNameChangeHandler}
						onBlur={lastNameBlurHandler}
					/>
					{lastNameHasError && <p className='error-text'>Please enter a last name</p>}
				</div>
			</div>
			<div className={emailClasses}>
				<label htmlFor='name'>E-Mail Address</label>
				<input
					type='text'
					id='name'
					value={emailValue}
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
				/>
			</div>
			{emailHasError && <p className='error-text'>Please enter a valid email address</p>}
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};
export default BasicForm;
