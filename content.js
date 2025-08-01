(async () => {
  // --- IMPORTANT SECURITY WARNING ---
  // Avoid hardcoding your API key. 
  // It's better to ask the user for it and store it in chrome.storage.
  const API_KEY = "AIzaSyBhTqU-yf6DkARqgKV4bogZ7tTBEWU7LvM"; // Replace with your key

  // Fetch and inject the sidebar HTML
  const sidebarHtmlUrl = chrome.runtime.getURL('pandu-ai-sidebar.html');
  const response = await fetch(sidebarHtmlUrl);
  const sidebarHtml = await response.text();
  document.body.insertAdjacentHTML('beforeend', sidebarHtml);

  // Get elements from the injected HTML
  const sidebar = document.getElementById('ai-sidebar');
  const toggleButton = document.getElementById('sidebar-toggle');
  const submitButton = document.getElementById('submit-button');
  const promptInput = document.getElementById('prompt-input');
  const responseContainer = document.getElementById('response-container');
  const statusMessage = document.getElementById('status-message');

  // Draggable functionality
  let isDragging = false;
  let offsetX, offsetY;

  const move = (e) => {
    if (!isDragging) return;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    sidebar.style.left = `${x}px`;
    sidebar.style.top = `${y}px`;
    sidebar.style.right = 'auto';
    sidebar.style.transform = 'none';
  };

  sidebar.addEventListener('mousedown', (e) => {
    if (e.target.closest('#sidebar-content') || e.target === toggleButton) {
      return;
    }
    isDragging = true;
    offsetX = e.clientX - sidebar.offsetLeft;
    offsetY = e.clientY - sidebar.offsetTop;
    sidebar.style.cursor = 'grabbing';
    sidebar.style.transition = 'none';
    document.addEventListener('mousemove', move);
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      sidebar.style.cursor = 'grab';
      sidebar.style.transition = 'all 0.3s ease';
      document.removeEventListener('mousemove', move);
    }
  });

  // Toggle expanded/collapsed state
  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('expanded');
    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('expanded')) {
      promptInput.focus();
    }
  });

  // AI Response Functionality
  async function getAiResponse() {
    const prompt = promptInput.value.trim();
    if (!prompt) {
      alert("Please enter a question first.");
      return;
    }
    if (API_KEY === "YOUR_GEMINI_API_KEY") {
        alert("Please replace 'YOUR_GEMINI_API_KEY' in the content.js file.");
        return;
    }

    submitButton.disabled = true;
    statusMessage.textContent = "Generating response...";
    responseContainer.textContent = "";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const requestBody = { contents: [{ parts: [{ text: prompt }] }] };

    try {
      const apiResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(`API Error: ${errorData.error.message}`);
      }

      const data = await apiResponse.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found.";
      responseContainer.innerHTML = aiText; // Gemini API provides formatted text

    } catch (error) {
      console.error("Error:", error);
      responseContainer.textContent = `Error: ${error.message}`;
    } finally {
      submitButton.disabled = false;
      statusMessage.textContent = "";
    }
  }

  submitButton.addEventListener("click", getAiResponse);
  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      getAiResponse();
    }
  });

  // Set initial position
  sidebar.style.left = (window.innerWidth - 60) + 'px';
  sidebar.style.top = (window.innerHeight / 2 - 30) + 'px';
})();
