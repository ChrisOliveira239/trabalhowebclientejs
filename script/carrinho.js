import Storage from "./storage.js";
import createAlert from "./alert.js";

const tableDOM = document.querySelector(".table-body");

let cart = [];

let descontoAplicado = [];

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
            <div class="quantity-box" data-id=${product.id}>
                <i class="fas fa-chevron-left decrease"></i>
                <p class="quantity-text">${product.itemAmount}</p>
                <i class="fas fa-chevron-right increase"></i>
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
  static setupApp() {
    descontoAplicado = localStorage.getItem("descontoAplicado");
    cart = Storage.getCart();
    this.btnRemoverTodosLogic();
    this.updateCart(cart);
    this.validateCouponLogic();
  }

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
    this.quantityBtnsLogic();
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
    const discount = Storage.getDiscount();
    cart.map((item) => {
      if (discount) {
        total += (item.itemPreco - item.itemPreco * 0.15) * item.itemAmount;
      } else {
        total += item.itemPreco * item.itemAmount;
      }
    });
    totalDOM.innerHTML = `R$ ${total.toFixed(2)}`;
  }

  static validateCouponLogic() {
    const inputCoupon = document.querySelector(".cupom-input");
    const btnValidate = document.querySelector(".validar-cupom");
    btnValidate.addEventListener("click", (event) => {
      if (inputCoupon.value === "UTFPR") {
        Storage.saveDiscount();
        this.updateTotal();
        createAlert("Desconto de 15% aplicado.");
        return;
      }
      createAlert("Cupom inválido");
    });
  }

  static increaseAmount(item) {
    item.itemAmount++;
    return item;
  }
  static decreaseAmount(item) {
    if (item.itemAmount > 1) {
      item.itemAmount--;
      return item;
    }
  }

  static quantityBtnsLogic() {
    const decreaseButtons = document.querySelectorAll(".decrease");
    const increaseButtons = document.querySelectorAll(".increase");

    decreaseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        let item = cart.find(
          (item) => item.id == button.parentElement.dataset.id
        );
        this.decreaseAmount(item);
        Storage.saveCart(cart);
        this.updateTotal();
        this.updateQuantitySpinner(item);
      });
    });

    increaseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        let item = cart.find(
          (item) => item.id == button.parentElement.dataset.id
        );
        this.increaseAmount(item);
        Storage.saveCart(cart);
        this.updateTotal();
        this.updateQuantitySpinner(item);
      });
    });
  }

  static updateQuantitySpinner(item) {
    const quantityBox = document.querySelector(`[data-id="${item.id}"]`);
    const quantityText = quantityBox.querySelector(".quantity-text");
    quantityText.innerHTML = item.itemAmount;
  }
}

const init = () => {
  Logic.setupApp();
};

init();
