import React, {useContext, useRef} from 'react';
import {TodosContext} from "../store/todos-context";
import classes from "./NewTodo.module.css";


//In Reacr.FC definisco una funzione che non ritorna nulla ma che prende un parametro di tipo stringa
const NewTodo: React.FC = () => {

    const todoCtx = useContext(TodosContext);
    const todoTextInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        /*
        ? -> TS proverà ad accedere al valore, ma se non riuscirà allora sarà null
        *         const enteredText = todoTextInputRef.current?.value;
        */

        /*
        ! -> Lo metterò quando sarò 100% sicuro che la connessione sarà stabile e che il valore
        non è null.
         */
        const enteredText = todoTextInputRef.current!.value;
        if (enteredText.trim().length === 0) {
            return;
        }
        todoCtx.addTodo(enteredText)
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text">Todo Text</label>
            <input type="text" id="text" ref={todoTextInputRef}/>
            <button>Add Todo</button>
        </form>
    );
};

export default NewTodo;
