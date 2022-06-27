const tableDOM = document.querySelector(".table-body");

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
  static displayProductsTable(products) {
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
            <button class="comprar">comprar</button>
          </div>
        </td>
      </tr>
      `;
    });
    tableDOM.innerHTML = result;
  }
}
const init = () => {
  Data.getProducts().then((products) => {
    UI.displayProductsTable(products);
  });
};

init();
