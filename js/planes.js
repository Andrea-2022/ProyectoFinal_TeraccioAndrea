async function obtenerPlanes() {
  try {
    const response = await fetch("json/planes.json");
    const data = await response.json();
    return data.planes;
  } catch (error) {
    console.error("Error al obtener los planes:", error);
    return [];
  }
}

async function agregarAlCarrito(nombre, precio) {
  try {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let id = carrito.length + 1;
    let producto = { id, nombre, precio };
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${nombre} agregado al carrito`);
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
  } finally {
    console.log("Operación de agregar al carrito finalizada.");
  }
}

async function mostrarPlanes() {
  const sectionPlanes = document.querySelector("#planes");

  try {
    const planes = await obtenerPlanes();

    planes.forEach(async (plan) => {
      try {
        const { producto, precio } = plan;

        const section = document.createElement("section");
        section.className = producto.toLowerCase().replace(" ", "-");

        const div = document.createElement("div");

        const h2 = document.createElement("h2");
        h2.textContent = producto;

        const p2 = document.createElement("p");
        p2.textContent = `Precio $${precio}`;

        const button = document.createElement("button");
        button.textContent = "Agregar al carrito";
        button.onclick = async () => await agregarAlCarrito(producto, precio);

        div.appendChild(h2);
        div.appendChild(p2);
        div.appendChild(button);

        section.appendChild(div);

        sectionPlanes.appendChild(section);
      } catch (error) {
        console.error("Error al mostrar planes:", error);
      } finally {
        console.log("Operación de mostrar planes finalizada.");
      }
    });
  } catch (error) {
    console.error("Error al obtener los planes:", error);
  }
}

mostrarPlanes();
