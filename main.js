// Hard-coded credit data based on your image
const curriculum = {
    "Semester-I": {
        "Physics (BSC-101)": 4,
        "Mathematics-I (BSC-103)": 4,
        "Biology for Engineers (BSC-105)": 2,
        "Basic Electrical Engineering (ESC-101)": 4,
        "Programming for Problem Solving (ESC-103)": 4,
        "Engineering Exploration (VSEC-101)": 2,
        "Yoga and Sports (CC-101)": 2,
        "totalCredits": 22
    },
    "Semester-II": {
        "Chemistry (BSC-102)": 4,
        "Mathematics-II (BSC-104)": 3,
        "Engineering Graphics and Design (ESC-102)": 4,
        "Professional Communication (AES-102)": 3,
        "Programme Core Course (PCC-XX-102)": 4,
        "Introduction to Indian Knowledge System (IKS-102)": 2,
        "Photography/Dramatics (CC-102)": 2,
        "totalCredits": 22
    }
};


const sem1 = document.getElementById("sem1");
const sem2 = document.getElementById("sem2");
const structA = document.getElementById("structA");
const structB = document.getElementById("structB");
const selectorPage = document.getElementById("selectorPage");
const mainPage = document.getElementById("mainPage");

function structSelected(selected){
    selectorPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
    
    if(selected === "structA"){
        renderStructA();
    }

    else{
        // structB();
    }
    
}



// SGPA Calculation Function
function calculateSGPA(semesterKey, studentGrades) {
    let totalPoints = 0;
    const semData = curriculum[semesterKey];
    
    studentGrades.forEach(subject => {
        const credits = semData[subject.name];
        // Formula: Credit * GradePoint
        totalPoints += (credits * subject.gradePoint);
    });
    
    return (totalPoints / semData.totalCredits).toFixed(2);
}

const subjectRows = document.getElementById("subjectRows");
function renderStructA(){
    subjectRows.innerHTML = `
    <select id='structureA' class='p-2 border rounded focus:ring-2 focus:ring-indigo-400 outline-none'>
    <option value="" disabled selected hidden>Select Subject</option>
    <option value="maths-2">M-1/M-2</option>
    <option value="be">Chemistry</option>
    <option value="bee">IKS</option>
    <option value="physics">EGD</option>
    <option value="pps">Drama</option>
    <option value="exploration">ETM</option>
    </select>
    
    <p class="md:hidden pt-1 mb-[-1rem]">Theory</p>
    
    <select class="theory-grade p-2 border rounded focus:ring-2 focus:ring-indigo-400">
        <option value="" disabled selected hidden>Select Grade</option>
        <option value="10">A+</option>
        <option value="9">A</option>
        <option value="8">B+</option>
        <option value="7">A</option>
        <option value="6">C+</option>
        <option value="5">C</option>
        <option value="4">D</option>
        <option value="3">F</option>
    </select>
        
    <p id="practical-wrapper" class="md:hidden pt-1 mb-[-1rem]">practical</p>

    <select class="practical-grade p-2 border rounded focus:ring-2 focus:ring-indigo-400">
        <option value="" disabled selected hidden>Select Grade</option>
        <option value="10">A+</option>
        <option value="9">A</option>
        <option value="8">B+</option>
        <option value="7">A</option>
        <option value="6">C+</option>
        <option value="5">C</option>
        <option value="4">D</option>
        <option value="3">F</option>
    </select>
        
    <button id="removeBtn" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition mt-5 md:mt-0">Remove</button>
    `
}
    