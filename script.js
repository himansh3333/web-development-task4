const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
        }
    });

}
// Back to Top Button

const topBtn = document.getElementById("topBtn");

if(topBtn){

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});

}
// Hamburger Menu

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");

if(menuToggle){

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if(navMenu.classList.contains("active")){
        menuToggle.innerHTML="✖";
    }else{
        menuToggle.innerHTML="☰";
    }

});

document.querySelectorAll("nav ul li a").forEach(link=>{

    link.addEventListener("click",()=>{

        navMenu.classList.remove("active");
        menuToggle.innerHTML="☰";

    });

});

}

// Form Validation

const form = document.getElementById("contactForm");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("name").value.trim();
const email=document.getElementById("email").value.trim();
const phone=document.getElementById("phone").value.trim();
const message=document.getElementById("message").value.trim();

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern=/^[0-9]{10}$/;

if(name===""){
alert("Please enter your name.");
return;
}

if(!emailPattern.test(email)){
alert("Please enter a valid email.");
return;
}

if(!phonePattern.test(phone)){
alert("Please enter a valid 10-digit phone number.");
return;
}

if(message.length<10){
alert("Message should be at least 10 characters.");
return;
}

alert("Message Sent Successfully! ✅");

form.reset();

});

}
// Image Slider

const slider = document.getElementById("slider");

const images = [
"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"
];

let currentSlide = 0;

function showSlide(index){
    slider.src = images[index];
}

function nextSlide(){
    currentSlide++;

    if(currentSlide >= images.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

function prevSlide(){
    currentSlide--;

    if(currentSlide < 0){
        currentSlide = images.length - 1;
    }

    showSlide(currentSlide);
}

setInterval(nextSlide,3000);
// Animated Counter

const counters = document.querySelectorAll(".counter");

const startCounters = () => {

    counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");
        let count = 0;

        const updateCounter = () => {

            const increment = Math.ceil(target / 100);

            if (count < target) {
                count += increment;

                if (count > target) {
                    count = target;
                }

                counter.innerText = count;

                setTimeout(updateCounter, 20);

            } else {
                counter.innerText = target;
            }

        };

        updateCounter();

    });

};

const statsSection = document.querySelector(".stats");

const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect();
    }

});

if(statsSection){
    observer.observe(statsSection);
}
// Modal Popup

const modal=document.getElementById("modal");
const openModal=document.getElementById("openModal");
const closeModal=document.getElementById("closeModal");

if(openModal){

openModal.addEventListener("click",()=>{

modal.style.display="flex";

});

closeModal.addEventListener("click",()=>{

modal.style.display="none";

});

window.addEventListener("click",(e)=>{

if(e.target===modal){

modal.style.display="none";

}

});

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

modal.style.display="none";

}

});

}
// Weather App
const cityInput = document.getElementById("cityInput");

if(cityInput){
    const lastCity = localStorage.getItem("lastCity");

    if(lastCity){
        cityInput.value = lastCity;
    }
}
const searchWeather = document.getElementById("searchWeather");

if(searchWeather){

searchWeather.addEventListener("click", getWeather);

}

async function getWeather(){

const city=document.getElementById("cityInput").value.trim();

const result=document.getElementById("weatherResult");

if(city===""){

result.innerHTML="<p>Please enter a city name.</p>";

return;

}

const apiKey="04ade286a0d77521a35748ab2e6f3cbc";

const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try{

const response=await fetch(url);

const data=await response.json();

if(data.cod != 200){
    result.innerHTML = "<p>City not found.</p>";
    return;
}

result.innerHTML = `
<h2>${data.name}</h2>
<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
<p>🌡️ Temperature: ${data.main.temp} °C</p>
<p>💧 Humidity: ${data.main.humidity}%</p>
<p>💨 Wind Speed: ${data.wind.speed} m/s</p>
<p>☁️ ${data.weather[0].description}</p>
`;
localStorage.setItem("lastCity", city);
}
catch(error){

result.innerHTML="<p>Something went wrong.</p>";

}

}
// Todo App

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function createTask(taskText, completed = false) {

    const li = document.createElement("li");

    if (completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
<span>${taskText}</span>

<div>
<button class="completeBtn">✅</button>
<button class="editBtn">✏️</button>
<button class="deleteBtn">🗑️</button>
</div>
`;

    taskList.appendChild(li);

    li.querySelector(".completeBtn").addEventListener("click", () => {

    li.classList.toggle("completed");

    const tasks = getTasks();

    const taskIndex = tasks.findIndex(t => t.text === taskText);

    if(taskIndex !== -1){

        tasks[taskIndex].completed = li.classList.contains("completed");

        saveTasks(tasks);

    }

});

    li.querySelector(".deleteBtn").addEventListener("click", () => {

    const tasks = getTasks();

    const updatedTasks = tasks.filter(t => t.text !== taskText);

    saveTasks(updatedTasks);

    li.remove();

});
li.querySelector(".editBtn").addEventListener("click", () => {

    const span = li.querySelector("span");

    const oldTask = span.innerText;

    const updatedTask = prompt("Edit Task", oldTask);

    if (updatedTask && updatedTask.trim() !== "") {

        span.innerText = updatedTask.trim();

        const tasks = getTasks();

        const taskIndex = tasks.findIndex(t => t.text === oldTask);

        if(taskIndex !== -1){

            tasks[taskIndex].text = updatedTask.trim();

            saveTasks(tasks);

        }

        taskText = updatedTask.trim();

    }

});

}

if (addTask) {

    addTask.addEventListener("click", () => {

        const task = taskInput.value.trim();

        if (task === "") {

            alert("Please enter a task.");

            return;

        }

        createTask(task);

        const tasks = getTasks();

        tasks.push({
            text: task,
            completed: false
        });

        saveTasks(tasks);

        taskInput.value = "";

    });

}
// Load Saved Tasks

window.addEventListener("load", () => {

    const tasks = getTasks();

    tasks.forEach(task => {

        createTask(task.text, task.completed);

    });

});
// Filters

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

function filterTasks(type){

const tasks = document.querySelectorAll("#taskList li");

tasks.forEach(task=>{

if(type==="all"){

task.style.display="flex";

}

else if(type==="active"){

task.style.display = task.classList.contains("completed")
? "none"
: "flex";

}

else if(type==="completed"){

task.style.display = task.classList.contains("completed")
? "flex"
: "none";

}

});

}

if(allBtn){

allBtn.addEventListener("click",()=>filterTasks("all"));

activeBtn.addEventListener("click",()=>filterTasks("active"));

completedBtn.addEventListener("click",()=>filterTasks("completed"));

}
