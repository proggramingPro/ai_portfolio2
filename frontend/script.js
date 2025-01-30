// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Chatbot - Ask AI
async function askAI() {
    const userMessage = document.getElementById('chatInput').value;
    const chatResponse = document.getElementById('chatResponse');
    
    if (userMessage.trim() === '') {
        chatResponse.textContent = "Please enter a message!";
        return;
    }

    try {
        const response = await fetch('https://ai-portfolio2.onrender.com/api/chat', { // Updated backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        chatResponse.textContent = data.reply;
    } catch (error) {
        console.error('Error:', error);
        chatResponse.textContent = "Error: Unable to get response from AI.";
    }
}

// Voice Chat - Talk to AI
async function startVoiceChat() {
    const voiceResponse = document.getElementById('voiceResponse');
    voiceResponse.textContent = "Starting voice chat...";

    // Implement speech recognition here and send the transcribed text to the backend for AI response
    // For now, simulate a response
    const simulatedResponse = "This is the AI's voice response to your input.";
    voiceResponse.textContent = simulatedResponse;
}

// Generate AI Project Description
async function generateDescription() {
    const projectTitle = document.getElementById('projectTitle').value;
    const projectDescription = document.getElementById('projectDescription');

    if (projectTitle.trim() === '') {
        projectDescription.textContent = "Please enter a project title.";
        return;
    }

    try {
        const response = await fetch('https://ai-portfolio2.onrender.com/api/generate-description', { // Updated backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ projectTitle }),
        });

        const data = await response.json();
        projectDescription.textContent = data.description;
    } catch (error) {
        console.error('Error:', error);
        projectDescription.textContent = "Error: Unable to generate project description.";
    }
}

// Resume Analyzer - Analyze Resume
async function analyzeResume() {
    const resumeUpload = document.getElementById('resumeUpload').files[0];
    const resumeFeedback = document.getElementById('resumeFeedback');

    if (!resumeUpload) {
        resumeFeedback.textContent = "Please upload a resume!";
        return;
    }

    const formData = new FormData();
    formData.append('resume', resumeUpload);

    try {
        const response = await fetch('https://ai-portfolio2.onrender.com/api/analyze-resume', { // Updated backend URL
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        resumeFeedback.textContent = data.feedback;
    } catch (error) {
        console.error('Error:', error);
        resumeFeedback.textContent = "Error: Unable to analyze resume.";
    }
}

// Blog Post Generator - Generate AI Blog
async function generateBlog() {
    const blogTopic = document.getElementById('blogTopic').value;
    const blogContent = document.getElementById('blogContent');

    if (blogTopic.trim() === '') {
        blogContent.textContent = "Please enter a blog topic.";
        return;
    }

    try {
        const response = await fetch('https://ai-portfolio2.onrender.com/api/generate-blog', { // Updated backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: blogTopic }),
        });

        const data = await response.json();
        blogContent.textContent = data.blog;
    } catch (error) {
        console.error('Error:', error);
        blogContent.textContent = "Error: Unable to generate blog post.";
    }
}

// Testimonial Generator - Generate AI Testimonial
async function generateTestimonial() {
    const testimonialText = document.getElementById('testimonialText');

    try {
        const response = await fetch('https://ai-portfolio2.onrender.com/api/generate-testimonial', { // Updated backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        testimonialText.textContent = data.testimonial;
    } catch (error) {
        console.error('Error:', error);
        testimonialText.textContent = "Error: Unable to generate testimonial.";
    }
}

// Visitor Counter - Display Live Visitor Count
async function getVisitorCount() {
    const visitorNumber = document.getElementById('visitorNumber');

    try {
        const response = await fetch('https://ai-portfolio2.onrender.com/api/visitor-count'); // Updated backend URL
        const data = await response.json();
        visitorNumber.textContent = data.count;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Update Visitor Count every 10 seconds
setInterval(getVisitorCount, 10000);
getVisitorCount();  // Initial load
