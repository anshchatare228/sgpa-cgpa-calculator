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

// Example: Handling M-2 (Maths-II) Logic
function handleSubjectChange(selectedSubject) {
    const pracSection = document.getElementById('practical-wrapper');
    // If Mathematics-II is selected, hide practicals as it has 0 practical credits (L-3, T-0, P-0)
    if (selectedSubject === "Mathematics-II (BSC-104)") {
        pracSection.classList.add('hidden');
    } else {
        pracSection.classList.remove('hidden');
    }
}


const structure = document.getElementById("structureSelect");
const structureA = document.getElementById("structureA");
const structureB = document.getElementById("structureB");
structure.addEventListener("change",(selectedStructure)=>{
    if(selectedStructure === "structureA"){
        structureA.classList.remove("hidden")
        structureB.classList.add("hidden");
    }
    
    else{
        structureB.classList.remove("hidden");
        structureA.classList.add("hidden")
    }
})
