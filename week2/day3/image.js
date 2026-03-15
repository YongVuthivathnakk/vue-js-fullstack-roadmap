const images = [
        {
          src: "https://picsum.photos/800/600?random=1",
          caption: "Beautiful nature 1",
          alt: "Image 1",
        },
        {
          src: "https://picsum.photos/800/600?random=2",
          caption: "Beautiful nature 2",
          alt: "Image 2",
        },
        {
          src: "https://picsum.photos/800/600?random=3",
          caption: "Beautiful nature 3",
          alt: "Image 3",
        },
        {
          src: "https://picsum.photos/800/600?random=4",
          caption: "Beautiful nature 4",
          alt: "Image 4",
        },
        {
          src: "https://picsum.photos/800/600?random=5",
          caption: "Beautiful nature 5",
          alt: "Image 5",
        },
        {
          src: "https://picsum.photos/800/600?random=6",
          caption: "Beautiful nature 6",
          alt: "Image 6",
        },
      ];

      let currentIndex = 0;

      const closeBtn = document.getElementById("closeBtn");
      const container = document.getElementById("gallery-grid");
      const modal = document.getElementById("modal");
      const modalImage = document.getElementById("modal-image");
      const modalCaption = document.getElementById("modal-caption");
      const imageCounter = document.getElementById("image-counter");
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");

      function displayImages() {
        container.innerHTML = "";
        images.forEach((image, index) => {
          const card = createImageCard(image, index);
          container.appendChild(card);
        });
      }

      function createImageCard(image, index) {
        const card = document.createElement("img");
        card.src = image.src;
        card.dataset.index = index;
        card.className =
          "w-full h-[250px] object-cover rounded-lg cursor-pointer transition transform hover:scale-105 hover:opacity-90";
        return card;
      }

      function showImage(index) {
        const img = images[index];
        modalImage.src = img.src;
        modalCaption.textContent = img.caption;
        imageCounter.textContent = `${index + 1} of ${images.length}`;
      }

      function openModal(index) {
        currentIndex = index;
        showImage(currentIndex);
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }

      function closeModal() {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
      }

      function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      }

      function nextImage() {
        currentIndex = (currentIndex + 1 + images.length) % images.length;
        showImage(currentIndex);
      }

      //   Event Listener

      container.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
          const index = parseInt(e.target.dataset.index);
          openModal(index);
        }
      });

      //   Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("hidden")) {
          if (e.key === "Escape") closeModal();
          if (e.key === "ArrowLeft") prevImage();
          if (e.key === "ArrowRight") nextImage();
        }
      });

      closeBtn.addEventListener("click", () => closeModal());
      nextBtn.addEventListener("click", nextImage);
      prevBtn.addEventListener("click", prevImage);

      displayImages();