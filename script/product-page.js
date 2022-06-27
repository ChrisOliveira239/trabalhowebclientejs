const tableDOM = document.querySelector(".table-body");

let cart = [];

class Data {
  static async getProducts() {
    try {
      const result = await (await fetch("/data/products.json")).json();
      const products = result.items;
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
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
              <div class="categoria-item">&#x1f50d;&#xFE0E; ${product.itemCategoria}</div>
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
    const alert = document.createElement("div");
    alert.className = "alert";
    alert.innerHTML = `
      <div class="alert-container">
        <p>
          Item adicionado ao carrinho
        </p>
        <p class="closeAlert"> x </p>
      </div>
    `;
    document.body.appendChild(alert);
  }
}

class Logic {
  static btnComprarLogic() {
    const buttons = [...document.querySelectorAll(".comprar")];
    buttons.forEach((button) => {
      const id = button.dataset.id;
      button.addEventListener("click", (event) => {
        button.disabled = true;
        const cartItem = { ...Storage.getProduct(id) };
        cart = [...cart, cartItem];
        Storage.saveCart(cart);
        UI.displayProductAddedAlert();
      });
    });
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id == id);
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

const init = () => {
  Data.getProducts()
    .then((products) => {
      UI.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => Logic.btnComprarLogic());
};

init();
