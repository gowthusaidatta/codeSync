(async () => {
  // --- IMPORTANT SECURITY WARNING ---
  // Avoid hardcoding your API key. 
  // It's better to ask the user for it and store it in chrome.storage.
  const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your key

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
  const resizeHandle = document.getElementById('resize-handle'); // Get the new handle

  // --- Draggable functionality (remains the same) ---
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
    // Prevent dragging when clicking on content, toggle, or resize handle
    if (e.target.closest('#sidebar-content') || e.target === toggleButton || e.target === resizeHandle) {
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

  // --- Toggle expanded/collapsed state (remains the same) ---
  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('expanded');
    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('expanded')) {
      promptInput.focus();
    }
  });

  // --- NEW Resizing Functionality ---
  let isResizing = false;

  resizeHandle.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Prevent text selection and other default actions
    e.stopPropagation(); // Stop the event from bubbling up to the drag listener
    isResizing = true;
    
    // Remove transitions for smooth resizing
    sidebar.style.transition = 'none';

    document.addEventListener('mousemove', resizeSidebar);
    document.addEventListener('mouseup', stopResizing);
  });

  function resizeSidebar(e) {
    if (!isResizing) return;
    
    // Calculate new dimensions based on mouse position
    const newWidth = e.clientX - sidebar.offsetLeft;
    const newHeight = e.clientY - sidebar.offsetTop;
    
    sidebar.style.width = `${newWidth}px`;
    sidebar.style.height = `${newHeight}px`;
  }

  function stopResizing() {
    isResizing = false;
    document.removeEventListener('mousemove', resizeSidebar);
    document.removeEventListener('mouseup', stopResizing);
    
    // Restore transitions
    sidebar.style.transition = 'all 0.3s ease';
  }

  // --- AI Response Functionality (remains the same) ---
  async function getAiResponse() {
    // ... same code as before ...
  }
  
  // Event listeners (remains the same)
  submitButton.addEventListener("click", getAiResponse);
  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      getAiResponse();
    }
  });

  // Set initial position (remains the same)
  sidebar.style.left = (window.innerWidth - 60) + 'px';
  sidebar.style.top = (window.innerHeight / 2 - 30) + 'px';
})();
