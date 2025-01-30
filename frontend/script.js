const backendUrl = "https://ai-portfolio2.onrender.com";

async function askAI() { /* Chatbot Functionality */ }
async function generateDescription() { /* AI Project Description */ }
async function analyzeResume() { /* Resume Analysis */ }
async function generateBlog() { /* AI Blog Generator */ }
async function generateTestimonial() { /* AI Testimonials */ }
async function updateVisitorCount() { 
    const response = await fetch(`${backendUrl}/api/visitor-count`);
    const data = await response.json();
    document.getElementById("visitorNumber").innerText = data.count;
}
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
setInterval(updateVisitorCount, 5000);
