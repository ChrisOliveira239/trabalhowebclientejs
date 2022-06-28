export default function createModal(id) {
  const existingAlert = document.querySelector(".alert");

  const alert = document.createElement("div");
  alert.className = "modal";
  alert.innerHTML = `
    <img src="/img/item${id}.png">
    <p class="closeAlert"> x </p>
  `;

  if (existingAlert === null) {
    document.body.appendChild(alert);
    fecharAlertLogic();
    return;
  }

  const body = document.body;
  body.removeChild(existingAlert);
  document.body.appendChild(alert);
  fecharAlertLogic();
}

const fecharAlertLogic = () => {
  const buttons = document.querySelectorAll(".closeAlert");
  const body = document.body;
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      body.removeChild(button.parentElement);
    });
  });
};
