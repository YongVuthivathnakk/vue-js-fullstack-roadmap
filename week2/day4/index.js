// Data
      let notes = [];

      let isEditing = false;
      let editingId = null;

      // Element
      const submitBtn = document.getElementById("submit-btn");
      const noteForm = document.getElementById("note-form");
      const titleInput = document.getElementById("note-title");
      const contentInput = document.getElementById("note-content");
      const titleCounter = document.getElementById("title-counter");
      const contentCounter = document.getElementById("content-counter");

      const totalNotes = document.getElementById("total-notes");
      const notesContainer = document.getElementById("notes-container");
      const emptyNotes = document.getElementById("empty-note");

      const searchInput = document.getElementById("search-input");

      // Load
      function loadNotes() {
        const stored = localStorage.getItem("notes");
        notes = stored ? JSON.parse(stored) : [];
        displayNotes(notes);
      }

      function saveNotes() {
        localStorage.setItem("notes", JSON.stringify(notes));
      }

      // Display
      function displayNotes(filteredNotes = notes) {
        notesContainer.innerHTML = "";

        if (filteredNotes.length === 0) {
          emptyNotes.classList.remove("hidden");
        } else {
          emptyNotes.classList.add("hidden");
        }

        totalNotes.textContent = notes.length;

        filteredNotes.forEach((note) => {
          notesContainer.appendChild(createNoteCard(note));
        });
      }

      function createNoteCard(note) {
        const card = document.createElement("div");
        card.className = `${note.color} p-4 rounded-lg shadow flex flex-col justify-between`;

        // Title
        const title = document.createElement("h3");
        title.textContent = note.title;
        title.className = "font-semibold text-lg truncate";

        // Content preview
        const content = document.createElement("p");
        content.className = "text-sm text-gray-700 mt-2";
        content.textContent =
          note.content.substring(0, 100) +
          (note.content.length > 100 ? "..." : "");

        // Footer
        const footer = document.createElement("div");
        footer.className = "mt-4 flex justify-between items-center";

        const time = document.createElement("small");
        time.className = "text-gray-600";
        time.textContent = formatDate(note.timestamp);

        const actions = document.createElement("div");
        actions.className = "flex gap-2";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "text-red-600 text-sm hover:underline";
        deleteBtn.onclick = () => deleteNote(note.id);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "text-blue-600 text-sm hover:underline";
        editBtn.onclick = () => editNote(note.id);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        footer.appendChild(time);
        footer.appendChild(actions);

        card.appendChild(title);
        card.appendChild(content);
        card.appendChild(footer);

        return card;
      }

      function editNote(id) {
        const note = notes.find((n) => n.id === id);
        if (!note) return;

        // Populate form
        titleInput.value = note.title;
        contentInput.value = note.content;

        // Change form to edit mode
        isEditing = true;
        editingId = id;
        submitBtn.textContent = "Update Note";

        const colorRadio = document.querySelector(
          `input[name="note-color"][value="${note.color}"]`,
        );
        if (colorRadio) colorRadio.checked = true;

        noteForm.scrollIntoView({ behavior: "smooth" });
      }

      function updateNote(id, title, content, color) {
        const note = notes.find((n) => n.id === id);
        if (!note) return;

        note.title = title;
        note.content = content;
        note.color = color;
        note.timestamp = new Date().toISOString();

        saveNotes();
        displayNotes();
      }

      function deleteNote(id) {
        if (!confirm("Delete this note?")) return;
        notes = notes.filter((n) => n.id !== id);
        saveNotes();
        displayNotes();
      }

      // Form Logic
      noteForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        const color = getSelectedColor();

        if (!title || !content) return;

        if (isEditing) {
          updateNote(editingId, title, content, color);
          isEditing = false;
          editingId = null;
          submitBtn.textContent = "Add Note";
        } else {
          notes.unshift({
            id: Date.now(),
            title,
            content,
            color,
            timestamp: new Date().toISOString(),
          });
          saveNotes();
          displayNotes();
        }

        noteForm.reset();
        resetCounters();
      });

      // Color Radio
      function getSelectedColor() {
        return document.querySelector('input[name="note-color"]:checked').value;
      }

      // Counters
      titleInput.addEventListener("input", () => {
        titleCounter.textContent = `${titleInput.value.length} / 50`;
      });

      contentInput.addEventListener("input", () => {
        contentCounter.textContent = `${contentInput.value.length} / 500`;
      });

      function resetCounters() {
        titleCounter.textContent = "0 / 50";
        contentCounter.textContent = "0 / 500";
      }

      // Date Format
      function formatDate(iso) {
        return new Date(iso).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();

        const filteredNotes = notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query),
        );

        displayNotes(filteredNotes);
      });

      // init state
      window.addEventListener("DOMContentLoaded", loadNotes);