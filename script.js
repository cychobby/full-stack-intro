const projects = [
    {
        "title": "Text Dungeon Game",
        "description": "OOP & DS project Implement by C++",
        "date": "2024/4",
        "url": " "
    },
    {
        "title": "Inventory Database Management",
        "description": "Intro-to-Database final project",
        "date": "2024/12",
        "url": "https://github.com/cychobby/NYCU-Intro-to-Database.git"
    },
    {
        "title": "Cryptography Engineering",
        "description": "Cryptography-Engineering final project",
        "date": "2025/5",
        "url": "https://github.com/cychobby/Cryptography-Engineering-Project-GamePlus-2.git"
    },
    {
        "title": "Affordance in robotics",
        "description": "Computer Science and Engineering Projects",
        "date": "2025/9",
        "url": " "
    }
]
// project-list innerHTML
const projectsList = document.querySelector(".project-list");
function renderProjects(list) {
    projectsList.innerHTML = list
        .map(p => {
            return `
            <div class="project" data-url="${p.url}" target="_blank">
                <div class="content">
                    <h3>${p.title}</h3>
                    <p>${p.description.replace(/\n/g, "<br>")}</p>
                    <p class="meta">Created on ${p.date}</p>
                </div>
            </div>
            `;
        })
        .join("");
}
renderProjects(projects);  // first time load all projects

const projectItems = document.querySelectorAll(".project"); // 選取所有 project 卡片
projectItems.forEach(item => {
    item.addEventListener("click", function() {
        const url = this.getAttribute("data-url"); // 在 HTML 加入的連結
        if (url) {
            window.open(url, "_blank"); // 在新分頁開啟
        }
    });
});

// 打字機效果
const typewriterElement = document.querySelector(".typewriter");
const texts = ["CS junior", "LLM user", "Freshman of Full stack development"];
let textIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    const typingSpeed = 100; 
    const deletingSpeed = 50; 
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 500;
    
    if (!isDeleting) {
    // typing phase
    let charIndex = 0;
    typewriterElement.textContent = '';
    
    const typingInterval = setInterval(() => {
        typewriterElement.textContent += currentText[charIndex];
        charIndex++;
        
        if (charIndex === currentText.length) { // finished typing
        clearInterval(typingInterval);
        // pause after typing, then start deleting
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, pauseAfterTyping);
        }
    }, typingSpeed);
    
    } else {
    // deleting phase
    let charIndex = currentText.length;
    
    const deletingInterval = setInterval(() => {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
        clearInterval(deletingInterval);
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        
        setTimeout(() => {
            typeWriter();
        }, pauseAfterDeleting);
        }
    }, deletingSpeed);
    }
}
typeWriter();  // Start the typewriter effect

// Search project
const searchInput = document.getElementById("project-search-input");
const searchBtn = document.getElementById("project-search-btn");

function searchProject() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm)
    );
    renderProjects(filteredProjects);
}

searchBtn.addEventListener("click", searchProject);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchProject();
    }
});