// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives
let age: number;
age = 12

let userName: string;
userName = 'Stefano'

let isInstructor: boolean;
isInstructor = false

// More complex types
let hobbies: string[]; // array di stringe in hobbies. Stessa cosa per number, bool
hobbies = ['Sport', 'Cooking']

// Type Aliases
type Person = { name: string, age: number }

let person: Person;

person = {
    name: 'Stefano',
    age: 22,
}

// ERRORE -> type di tipo bool non assegnato
//person = {isEmployee: true}

// Creo un array con all'interno questi oggetti
let people: Person[];

// Type interface
let course: string | number = 'React - The complete guide'
course = 123445;

// Functions & types
function add(a: number, b: number) {
    return a + b
}

function print(value: any) {
    console.log(value)
}

// Generics
function insertAtBeginning<T>(array: T[], value: T) {
    const newArray = [value, ...array]
    return newArray;
}

const demoArray = [1, 2, 3]
const updatedArray = insertAtBeginning(demoArray, -1) // [-1, 1, 2, 3]
const sringArray = insertAtBeginning(['a', 'b'], 'd')

//updatedArray[0].split('') --> Errore