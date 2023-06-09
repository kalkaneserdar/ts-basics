import { getProducts, Product } from '../lib';

export default async function updateOutput(id: string) {
  const products = await getProducts();
  const output = document.querySelector(`#${id}`);
  const html = layoutProducts(products);

  if (output && html) {
    output.innerHTML = html;
  }
}

function layoutProducts(products: Product[]) {
  const items = products.map((product) => {
    const { id, name, icon } = product;
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

// const productInstance: product = {
//   name: 'some name',
//   age: 45,
//   hobbies: ['some hobby', 'some other hobby']
// }

// type product = string | {
//   name: string,
//   age : number,
//   hobbies?: string[]
// }

// interface productInterface {
//   name: string,
//   age : number,
//   hobbies?: string[]
// }

