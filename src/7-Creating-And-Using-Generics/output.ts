import { productsURL, FoodProduct, customersURL, someObjectsURL } from '../lib';

const prefix = '🐉 ';

interface HasId {
  id: number;
}

class GenericModel<T extends HasId> {
  public items: T[] | undefined;
  constructor(public url: string) {}

  async getItems(): Promise<T[]> {
    this.items = await getList<T>(this.url);
    return this.items;
  }

  getItemById(id: number): T | undefined {
    return this.items ? this.items.find((p) => (id === p.id)) : undefined;
  }
}

const foodModel = new GenericModel<FoodProduct>(productsURL);

export default async function updateOutput(id: string = 'output') {
  // const products = await getProducts();
  // const products = await getList<FoodProduct>(productsURL);
  const products = await foodModel.getItems();
  modelFunction();

  const output = document.querySelector(`#${id}`);
  const html = layoutProducts(products);

  if (output && html) {
    output.innerHTML = html;
  }
}

function layoutProducts(products: FoodProduct[]): string {
  const items = products.map(({ id, name, icon }) => {
    const productHtml = `
    <span class="card-id">#${id}</span>
      <i class="card-icon ${icon} fa-lg"></i>
    <span class="card-name">${name}</span>
    `;
    const cardHtml = `
    <li>
        <div class="card">
            <div class="card-content">
                <div class="content">
                ${productHtml}
                </div>
            </div>
        </div>
    </li>
    `;
    return cardHtml;
  });
  let productsHtml = `<ul>${items.join('')}</ul>`;
  return productsHtml;
}

async function getProducts(): Promise<FoodProduct[]> {
  const response: Response = await fetch(productsURL);
  const products: FoodProduct[] = await response.json();
  return products;
}

async function getList<T>(url: string): Promise<T[]> {
  const response: Response = await fetch(url);
  const items: T[] = await response.json();
  return items;
}

/************************************************
 * Learning sample code.
 ***********************************************/

runTheLearningSamples();

async function runTheLearningSamples() {
  // Reusable code with generics
  function whatIsIt_number(arg: number): number {
    return arg;
  }

  console.log(`${prefix} Generics Overview`);
  console.log(whatIsIt_number(11));

  function whatIsIt_string(arg: string): string {
    return arg;
  }
  console.log(whatIsIt_string('john'));

  function whatIsIt_any(arg: any): any {
    return arg;
  }
  console.log(whatIsIt_any(11));
  console.log(whatIsIt_any('john'));

  function whatIsIt_typed<T>(arg: T): T {
    return arg;
  }

  let n: number = whatIsIt_typed<number>(11);
  let s: string = whatIsIt_typed<string>('john');
  let b: boolean = whatIsIt_typed<boolean>(true);
  console.log(n, s, b);

  // generics on functions

  // ~ examine getProducts() and how it returns a Promise<FoodProduct[]>
  // ~ examine getList() and how it returns a Promise<T[]>

  interface Customer {
    id: number;
    name: string;
  }

  async function getData() {
    console.log(`${prefix} Generic Functions`);

    const products = await getList<FoodProduct>(productsURL);
    console.table(products);

    const customers = await getList<Customer>(customersURL);
    console.table(customers);
  }
  await getData();

  // generic interface

  interface Model<T> {
    items: T[] | undefined;
    getItems: () => Promise<T[]>;
    getItemById: (id: number) => T | undefined;
  }  

  class FoodModel implements Model<FoodProduct> {
    public items: FoodProduct[] | undefined;

    async getItems(): Promise<FoodProduct[]> {
      this.items = await getList<FoodProduct>(productsURL);
      return this.items;
    }

    getItemById(id: number): FoodProduct | undefined {
      return this.items ? this.items.find((item) => (id === item.id)) : undefined;
    }
  }

  const foodModel: FoodModel = new FoodModel();
  await foodModel.getItems();
  console.log(`${prefix} Generic Interface`);
  console.table(foodModel.items);

  // generic classes

  // see GenericModel<T>

  const genericFoodModel = new GenericModel<FoodProduct>(productsURL);
  const genericCustomerModel = new GenericModel<Customer>(customersURL);
  await genericFoodModel.getItems();
  await genericCustomerModel.getItems();
  console.log(`${prefix} Generic Class`);
  console.table(genericFoodModel.items);
  console.table(genericCustomerModel.items);

  // generic constraints

  // see GenericModel and how it extends the T ==> class GenericModel<T extends HasId> {}

  // Built-in Constraints

  // ReadOnly<T> constraint
  const model: FoodModel = new FoodModel();
  await model.getItems();
  const foodItem: Readonly<FoodProduct | undefined> = model.getItemById(10);
  if (foodItem) {
    // foodItem.name = 'some name';
    // foodItem.icon = 'some icon';
  }

  // Partial<T> constraint
  const pear = { name: 'pear' };
  // const pearFood: FoodProduct = pear;
  const pearFood: Partial<FoodProduct> = pear;
}

// ******************************************************
// Generics own tryouts
// ******************************************************
// some applications of generics that we use all the time, for example while defining an array with primitives
const stringArray: Array<string> = [];
let numberArray: Array<number>;
// also another example is Promise
const numberPromise: Promise<number> = new Promise((resolve, reject) => {
  resolve(1)
})
let stringPromise: Promise<string>
// let numberArray2: number[]; is the other way of declaring the same type of array without using generics

// generic functions are defined slightly differently
function genericFunction<T>(arg: T): T {
  return arg;
}

genericFunction<number>(1)
genericFunction<string>('name')
genericFunction<boolean>(true)

async function genericFunction2<T>(url: string): Promise<T[]> {
  const response: Response = await fetch(url);
  const items: T[] = await response.json();
  return items;
}

type someType = {
  id: number;
  label: string;
  desc: string;
}

type someType2 = {
  id: number;
  label: string;
  desc: string;
  icon?: string;
}

const someObject: someType = {
  id: 1,
  label: 'some label',
  desc: 'some desc'
}

// genericFunction2<someType>('http://localhost:8080/someUrl')
// genericFunction2<someType2>('http://localhost:8080/someUrl2')

interface IModel<T> {
  items: T[] | undefined;
  getItems: () => Promise<T[]> // returns a promise because it has to await for the genericFunction2 to return the items
  getItemById: (id: number) => T | undefined // not async because it is not awaiting for anything
}

  // this type will not be possible to be implemented by the class itemModel because it does not have the id property
  type someType3withoutId = {
    label: string;
    desc: string;
  }

class itemModel<T extends HasId> implements IModel <T> {
  // q: is implements IModel <T> necessary??
  // a: yes, because we are using the interface IModel<T> to define the class itemModel<T extends HasId>
  // q: but it works without it too
  // a: yes, but it is not necessary, it is just a good practice to use it

  public items: T[] | undefined;
  constructor(public url: string) { }
  async getItems(): Promise<T[]> {
    return this.items = await genericFunction2(this.url) //genericFunciton is an async function, hence returns promise of its return type
  }
  getItemById(id: number): T | undefined {
    return this.items ? this.items.find((item) => (id === item.id)) : undefined;
  }
}

async function modelFunction() {
  // what we are doing here is that we are defining the type of T in itemModel<T extends HasId> as someType
  // so that we can use the type someType in the rest of the class
  const itemModel1 = new itemModel<someType>(someObjectsURL)
    // here the itemModel1 is filled with the items of type someType returning from the genericFunction2 which makes a fetch call from the url
  const itemsList = await itemModel1.getItems()
  const oneItem: Readonly<someType | undefined> = itemModel1.getItemById(100)
  console.log(`******************************************************`)
  console.log(`Generics own tryouts`)

  if (oneItem) {
      console.log(oneItem)
      console.table(itemsList)
  }
  const partialItem: Partial<someType> = { id:1 }
  console.log(partialItem)
  console.log(`******************************************************`)
}