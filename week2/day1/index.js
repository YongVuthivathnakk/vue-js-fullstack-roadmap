  // 1. Select and log all headings (h1, h2, h3)
      console.log("=== 1. All Headings (h1, h2, h3) ===");
      const headings = document.querySelectorAll("h1, h2, h3");
      headings.forEach((h) => console.log(h.textContent));

      // 2. Find all elements with specific classes
      console.log("=== 2. All element based on a specific class ===");
      const highlights = document.querySelectorAll(".highlight");
      highlights.forEach((h) => console.log(h.textContent));
      console.log(`Total Highlights: ${highlights.length}`);

      //  3. Navigate from deepest nested element to root

      console.log("=== 3. Navigate from deepest nested element to root === ");
      let element = document.querySelector(".deepest-item");
      while (element && element !== document.body) {
        console.log(element.tagName);
        console.log(element.textContent);
        element = element.parentElement;
      }

      // 4. Select all list items and log hierarchy level

      console.log("=== 4. Select all list items and log hierarchy level");
      const listItems = document.querySelectorAll("li");

      function getNestingLevel(element) {
        let level = 0;
        let current = element;
        while (current.parentElement) {
          level++;
          current = current.parentElement;
        }
        return level;
      }

      listItems.forEach((li) =>
        console.log(
          `Item: ${li.textContent.trim()} - Level: ${getNestingLevel(li)}`
        )
      );

      //  5. Select within specific sections

      console.log("=== 5. Select whithin specific sections ===");
      const section = document.querySelector("#about");
      const paragraphs = section.querySelectorAll("p");
      paragraphs.forEach((p) => console.log(p.textContent));

      //   6. Get direct children
      console.log("=== 6. Get direct children ===");
      const parent = document.querySelector("#main-menu");
      const children = parent.children;
      Array.from(children).forEach((child) => {
        console.log(`${child.tagName}: ${child.textContent}`);
      });

      //   BONUS

      console.log("=== Bonus ===");
      function getAncestors(element) {
        const ancestors = [];
        let current = element;

        while (current && current !== document.body) {
          ancestors.push({
            tag: current.tagName,
            id: current.id || "",
            classes: current.classList.length
              ? Array.from(current.classList)
              : [],
          });
          current = current.parentElement;
        }

        ancestors.push({ tag: "BODY", id: "", classes: [] });
        return ancestors;
      }

      console.log(getAncestors(document.querySelector(".deepest-item")));