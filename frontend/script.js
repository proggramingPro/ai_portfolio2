const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatContainer = document.getElementById('chatContainer');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userMessage = chatInput.value;
    chatInput.value = '';  // Clear input field

    // Display user's message in the chat container
    chatContainer.innerHTML += `<div class="user-message">${userMessage}</div>`;

    // Send message to the server
    try {
        const response = await fetch('http://localhost:5000/api/chat', { // Use your deployed backend URL here if online
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        const botReply = data.reply;

        // Display bot's reply in the chat container
        chatContainer.innerHTML += `<div class="bot-reply">${botReply}</div>`;
    } catch (error) {
        console.error('Error:', error);
        chatContainer.innerHTML += `<div class="error">There was an error processing your request. Please try again later.</div>`;
    }
});
