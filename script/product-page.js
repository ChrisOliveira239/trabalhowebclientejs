import Data from "./data.js";
import Storage from "./storage.js";

const tableDOM = document.querySelector(".table-body");

let cart = [];

class UI {
  static displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
      <tr>
        <td>
          <div class="nome_icone">
            <div class="icone"><img src=${product.itemImg} alt="item-icon"></div>
            <div class="titulo">
              <div class="nome-item">${product.itemNome}</div>
              <div class="categoria-item"><i class="fas fa-search"></i>${product.itemCategoria}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="seller">
            <div class="seller-icon">
              <div class="seller-lvl">Lvl ${product.itemVendedorLvl}</div>
            </div>
            <div class="seller-info">
              <span class="seller-name">${product.itemVendedorNome}</span>
              <span class="seller-total-orders">Total de vendas: ${product.itemVendedorTotalVendas}</span>
              <span class="seller-member-since">Membro desde: ${product.itemVendedorMembroDesde}</span>
              <div class="seller-stars-rate">${product.itemVendedorAvaliacao}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="deliver-time">
            <div class="deliver-icon"><img src="/img/${product.itemTempoEntrega}.png" ></div>
            <div class="deliver-text">${product.itemTempoEntrega}</div>
          </div>
        </td>
        <td>
          <div class="compra">
            <b class="preco">R$ ${product.itemPreco}</b>
            <button class="comprar" type="button" data-id=${product.id}>comprar</button>
          </div>
        </td>
      </tr>
      `;
    });
    tableDOM.innerHTML = result;
  }

  static displayProductAddedAlert() {
    const createAlert = () => {
      const alert = document.createElement("div");
      alert.className = "alert";
      alert.innerHTML = `
        <p>
          Item adicionado ao carrinho
        </p>
        <p class="closeAlert"> x </p>
    `;
      document.body.appendChild(alert);
      Logic.btnFecharAlertLogic();
    };

    const existingAlert = document.querySelector(".alert");

    if (existingAlert === null) {
      createAlert();
      return;
    }

    const body = document.body;
    body.removeChild(existingAlert);
    createAlert();
  }
}

class Logic {
  static btnComprarLogic() {
    const buttons = document.querySelectorAll(".comprar");
    cart = Storage.getCart();
    buttons.forEach((button) => {
      const id = button.dataset.id;
      button.addEventListener("click", (event) => {
        button.disabled = true;
        const cartItem = { ...Storage.getProduct(id) };
        cart = [...cart, cartItem];
        Storage.saveCart(cart);
        UI.displayProductAddedAlert();
      });
      const inCart = cart.find((item) => item.id == id);
      if (inCart) {
        button.disabled = true;
        return;
      }
      button.disabled = false;
    });
  }

  static btnFecharAlertLogic() {
    const buttons = document.querySelectorAll(".closeAlert");
    const body = document.body;
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        body.removeChild(button.parentElement);
      });
    });
  }
}

const init = () => {
  Data.getProducts()
    .then((products) => {
      UI.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      Logic.btnComprarLogic();
    });
};

init();
