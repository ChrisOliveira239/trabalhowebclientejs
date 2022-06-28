import Storage from "./storage.js";

const tableDOM = document.querySelector(".table-body");

let cart = [];

class UI {
  static displayCartItems(products) {
    let result = "";
    if (products.length > 0) {
      products.forEach((product) => {
        result += `
        <tr>
          <td>
            <div class="produto-info">
              <img src=${product.itemImg}>
              <div class="produto-info-category">
                <p class="produto-nome">${product.itemNome}</p>
                <div class="produto-categoria">
                  <i class="fas fa-search "></i>
                  <p>${product.itemCategoria}</p>
                </div>
              </div>
            </div>
          </td>

          <td>
            <h2>R$ ${product.itemPreco}</h2>
          </td>

          <td>
            <i class="fas fa-trash excluirProduto" data-id=${product.id}></i>
          </td>
        </tr>
      `;
      });
      tableDOM.innerHTML = result;
      return;
    }
    result = `
      <div style="width:100%; height: 175px; color: white; display: flex; justify-content: center; align-items: center">Nao há produtos no carrinho.</div>
    `;
    tableDOM.innerHTML = result;
  }
}

class Logic {
  static btnRemoverProdutoLogic() {
    const buttons = document.querySelectorAll(".excluirProduto");
    buttons.forEach((button) => {
      const id = button.dataset.id;
      button.addEventListener("click", (event) => {
        this.removeItem(id);
      });
    });
  }

  static btnRemoverTodosLogic() {
    const buttonRemoveAll = document.querySelector(".remove-all");
    buttonRemoveAll.addEventListener("click", (event) => this.clearCart());
  }

  static updateCart(cart) {
    Storage.saveCart(cart);
    UI.displayCartItems(cart);
    this.btnRemoverProdutoLogic();
    this.updateTotal();
  }

  static clearCart() {
    const cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));
    console.log("hello");
  }

  static removeItem(id) {
    cart = cart.filter((item) => item.id != id);
    this.updateCart(cart);
  }

  static updateTotal() {
    let total = 0;
    const totalDOM = document.querySelector(".total");
    cart.map((item) => {
      total += item.itemPreco;
    });
    totalDOM.innerHTML = `R$ ${total}`;
  }
}

const init = () => {
  cart = Storage.getCart();
  Logic.btnRemoverTodosLogic();
  Logic.updateCart(cart);
};

init();
