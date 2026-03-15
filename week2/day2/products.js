const products = [
        {
          id: 1,
          name: "Laptop",
          price: 999,
          image: "https://placehold.co/600x400",
        },
        {
          id: 2,
          name: "Phone",
          price: 699,
          image: "https://placehold.co/600x400",
        },
        {
          id: 3,
          name: "Tablet",
          price: 499,
          image: "https://placehold.co/600x400",
        },
        {
          id: 4,
          name: "Watch",
          price: 299,
          image: "https://placehold.co/600x400",
        },
        {
          id: 5,
          name: "Headphones",
          price: 199,
          image: "https://placehold.co/600x400",
        },
      ];

      const container = document.getElementById("products-container");
      const productCount = document.getElementById("product-count");

      //   Displaying Product
      function displayProducts() {
        container.innerHTML = "";
        products.forEach((product) => {
          const card = createProductCard(product);
          container.appendChild(card);
        });
      }

      function createProductCard(product) {
        const card = document.createElement("div");
        card.className =
          "product-card bg-white rounded-xl shadow-md p-4 text-center hover:shadow-xl hover:-translate-y-1 transition transform";
        card.dataset.id = product.id;

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.className = "w-full h-40 object-cover rounded-lg mb-4";

        const name = document.createElement("h3");
        name.textContent = product.name;
        name.className = "text-lg font-semibold text-gray-800";

        const price = document.createElement("p");
        price.textContent = `$${product.price}`;
        price.className = "text-blue-600 font-bold my-2";

        const viewBtn = document.createElement("button");
        viewBtn.textContent = "View Details";
        viewBtn.className =
          "bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition text-sm";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className =
          "bg-red-500 ml-5 text-white px-3 py-1 rounded-md hover:bg-red-600 transition text-sm";

        removeBtn.addEventListener("click", () => {
          card.remove();
          updateCounter();
        });

        const btnGroup = document.createElement("div");
        btnGroup.className = "flex justify-center gap-3 mt-4";
        btnGroup.appendChild(viewBtn);
        btnGroup.appendChild(removeBtn);

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(viewBtn);
        card.appendChild(removeBtn);

        return card;
      }

      function updateCounter() {
        const count = document.querySelectorAll("[data-id]").length;
        productCount.textContent = `Total Product: ${count}`;
      }

      function addProduct() {
        const name = prompt("Enter product name: ");
        // Value check
        if (!name) {
          alert("⚠️ Please enter the product name!");
          return;
        }

        const price = prompt("Enter product price:");

        if (!price) {
          alert("⚠️ Please enter the product price!");
          return;
        }

        if (isNaN(price)) {
          alert("⚠️ Price must be a valid number!");
          return;
        }

        const newProduct = {
          id: Date.now(),
          name: name,
          price: Number(price),
          image: "https://placehold.co/600x400",
        };

        products.push(newProduct);
        const card = createProductCard(newProduct);
        container.appendChild(card);
        updateCounter();
      }

      displayProducts();
      updateCounter();