import {useEffect, useState} from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]); //  array finale che conterrà i dati
	const [isLoading, setIsLoading] = useState(true);   // state che controlla il messaggio di Loading
	const [httpError, setHttpError] = useState();   //  state che controlla eventuali errori

	// GET call
	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				'https://food-order-app-158af-default-rtdb.europe-west1.firebasedatabase.app/Meals.json'
			);

			// Controllo errori di risposta
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			//  Salvo i datri in arrivo in una costante
			const responseData = await response.json();

			//  Creo un array inizialmente vuoto che andrà poi a popolarsi dei dati
			const loadedMeals = [];

			for (const key in responseData) {       // Setto una key
				loadedMeals.push({  //  L'array inizialmente vuoto viene popolato dai dati
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(loadedMeals);  // salvo l'array nel mio state
			setIsLoading(false);    //  Setto a false siccome ha smesso di caricare
		};

		//  Imposto la chiamata per eventuali errori
		fetchMeals().catch((error) => {
			setIsLoading(false);    //  Setto a false siccome è presente un errore
			setHttpError(error.message);    // Salvo il controllo di errori in risposta nello state che verifica gli errori Http
		});
	}, []);

	//  Se sta caricando i dati, allora:
	if (isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	//  Se si verifica un errore, allora:
	if (httpError) {
		return (
			<section className={classes.MealsError}>
				<p>{httpError}</p>
			</section>
		);
	}
	//  Salvo in una costante lo state maeal che conterrà il mio array finale popolato dei dati
	const mealsList = meals.map((meal) => ( //  mapping
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	//  Renderizzo
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;