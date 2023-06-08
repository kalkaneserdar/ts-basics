// string, number, boolean, array, undefined, null, any

let firstName: string | null;
firstName = 'Dan';

let age: number;
age = 45;

let hasPurchased = true;

let productNames: string[] = [];
productNames.push('Basketball');

let petCount: number[] = [];
petCount.push(5);

console.log(firstName, age, hasPurchased, productNames, petCount);

let productType = 'sports'; // homeGoods, grocery ("magic string")
if (productType === 'sports') {
  console.log('Found sports product type.');
}

// Using Enums
enum ProductType {
  Sports,
  HomeGoods,
  Groceries,
}
let pt = ProductType.Sports;
if (pt === ProductType.Sports) {
  console.log('Found sports product type.');
}

// Using Enums with default values
enum familyMember {
  Mother,
  Father,
  Son,
  Daughter,
  Cat,
  "Dog"
}

// using enums with string values
enum familyMember2 {
  Mother = "Mother",
  Father = "Father",
  Son = "Son",
  Daughter = "Daughter",
  Cat = "Cat",
  Dog = "Dog"
}

type person = { 
  name: string,
  age: number,
  familyMember: familyMember2,
  hobbies?: string[],
}

export class testClass implements testInterface {
  public name: string
  private _age: number = 0; // either have to be initialized or have to be assigned a value in the constructor

  constructor(name: string, age?: number) {
    this.name = name;
    if ( age ) this._age = age;
  }
}

export interface testInterface {
  name: string;
}

const person1: person = {
  name: 'some name',
  age: 45,
  familyMember: familyMember2.Mother,
  hobbies: ['yarning', 'puzzle']
}

const person2: person = {
  name: 'another name',
  age: 45,
  familyMember: familyMember2.Father
}

const person3: person = {
  // create a random string with 10 characters to be assigned to the name property of person3 object instance
  name: createRandomName(5),
  age: 45,
  familyMember: familyMember2.Daughter
}

const familyMembers: person[] = [ person1 , person2 ]

let member1 = familyMember.Mother
let member2 = familyMember2.Father
console.log(member1, member2)
console.log(familyMember[0], familyMember[1])
console.log(person1.familyMember)
console.log(person2.familyMember)
console.log(`newly created family member: ${JSON.stringify(createFamilyMember(person3))}`)
console.log(familyMembers)


function createFamilyMember (person: person): person {
  const createdPerson = {
    name: person.name,
    age: person.age,
    familyMember: person.familyMember,
  }
  familyMembers.push(createdPerson)
  return createdPerson;
}

function createRandomName (random: number = 10): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}