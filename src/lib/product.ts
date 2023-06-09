import { Product } from './interfaces';

// This will act as the foundation for other Product type classes (FoodProduct, SportingProduct)
abstract class ProductBase implements Product {
  constructor(public id: number, public name: string, public icon: string) {}
  // above is the same as:
  // public id: number;
  // public name: string;
  // public icon: string;
  // constructor(id: number, name: string, icon: string) {
  //   this.id = id;
  //   this.name = name;
  //   this.icon = icon;
  // }
  // the short version is called auto implemented properties
  validate(): boolean {
    throw new Error('Not implemented');
  }
}

export class FoodProduct extends ProductBase {
  override validate(): boolean {
    // override is optional here since the base class is abstract
    return !!this.id && !!this.name && !!this.icon;
  }
}

class GenericClass<T> {
  constructor(public value: T) {}
  // a getItem method that gets either a string or number and then returns the type which is generic
  getItem<T>(id: T): T {
    return id;
  }
}