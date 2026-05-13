let currentSemester = "";
let currentStructure = "";

let lastSGPA = null;
let lastTotalCredits = 0;

bgVid.playbackRate = 0.5;

const subjects = {
    sem1: {
        A: [
            { name: "Maths-I",theory: true, practical: false, credits: 4 },
            { name: "Physics",theory: true, practical: true, credits: 4 },
            { name: "BEE",theory: true, practical: true, credits: 4  },
            { name: "BE",theory: true, practical: true, credits: 3  },
            { name: "PPS",theory: true, practical: true, credits: 4  },
            { name: "Yoga & Sports", theory: false, practical: true, credits: 2  },
            { name: "Explo Engg.", theory: false, practical: true, credits: 2  }
        ],
        
        B: [
            { name: "Maths-I",theory: true, practical: false, credits: 4 },
            { name: "Chemistry",theory: true, practical: true, credits: 4 },
            { name: "ETM", theory: true, practical: true, credits: 4 },
            { name: "EGD",theory: true, practical: true, credits: 4 },
            { name: "PC", theory: true, practical: true, credits: 3},
            { name: "IKS", theory: false, practical: true, credits: 2 },
            { name: "Drama/Photography", theory: false, practical: true, credits: 2}
        ]
    },
    
    sem2: {
        A: [
            { name: "Maths-II",theory: true, practical: false, credits: 4 },
            { name: "Physics",theory: true, practical: true, credits: 4 },
            { name: "BEE",theory: true, practical: true, credits: 4  },
            { name: "BE",theory: true, practical: true, credits: 3  },
            { name: "PPS",theory: true, practical: true, credits: 4  },
            { name: "Yoga & Sports", theory: false, practical: true, credits: 2  },
            { name: "Explo Engg.", theory: false, practical: true, credits: 2  } 
        ],
        
        B: [
            { name: "Maths-II",theory: true, practical: false, credits: 4 },
            { name: "Chemistry",theory: true, practical: true, credits: 4 },
            { name: "ETM", theory: true, practical: true, credits: 4 },
            { name: "EGD",theory: true, practical: true, credits: 4 },
            { name: "PC", theory: true, practical: true, credits: 4},
            { name: "IKS", theory: false, practical: true, credits: 4 },
            { name: "Drama/Photography", theory: false, practical: true, credits: 2}
        
        ]
    }
};

const flipper = document.getElementById('main-flipper');

function goToStructure() {
    flipper.style.transform = "rotateY(180deg)";
}

function goBack() {
    flipper.style.transform = "rotateY(0deg)";
}

function selectSemester(sem) {
    currentSemester = sem;
    goToStructure();
}

function structSelected(structure) {

    currentStructure = structure;

    document.getElementById("selectorPage").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");

    const subjectContainer = document.getElementById("subjectRows");

    subjectContainer.innerHTML = "";

    const selectedSubjects =
        subjects[currentSemester][currentStructure];

        selectedSubjects.forEach(subject => {

        const row = document.createElement("div");
        row.dataset.credits = subject.credits;

        row.className =
            "grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/30 rounded-lg  border border-white";

        row.innerHTML = `

            <div class="font-semibold text-[1.3rem] text-gray-700 flex justify-center items-center">
                ${subject.name}
            </div>

            ${
                subject.theory
                ?
                `
                <span class="text-[0.95rem] text-black/60 font-light mb-[-1rem] md:hidden" >Theory</span>
                <select class="theory-grade p-2 border rounded">
                    <option value="" disabled selected hidden>Select Grade</option>
                    <option value="9">A+</option>
                    <option value="8">A</option>
                    <option value="7">B+</option>
                    <option value="6">B</option>
                    <option value="5">C+</option>
                    <option value="4">C</option>
                    <option value="3">D</option>
                    <option value="0">F</option>
                </select>
                `
                :
                `
                <div class="flex items-center text-gray-400 ml-10">
                    No Theory
                </div>
                `

            }

            ${
                subject.practical
                ?
                `
                <span class="text-[0.95rem] text-black/60 font-light mb-[-1rem] md:hidden" >practicals</span>
                <select class="practical-grade p-2 border rounded">
                    <option value="" disabled selected hidden>Select Grade</option>
                    <option value="9">A+</option>
                    <option value="8">A</option>
                    <option value="7">B+</option>
                    <option value="6">B</option>
                    <option value="5">C+</option>
                    <option value="4">C</option>
                    <option value="3">D</option>
                    <option value="0">F</option>
                </select>
                `
                :
                `
                <div class="flex items-center text-gray-400 ml-10">
                    No Practical
                </div>
                `
            }

            

            <button class="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600">
                Remove
            </button>
        `;

        subjectContainer.appendChild(row);

        // Wire up Remove button to clear selects in this row
        const removeBtn = row.querySelector('button');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                const theorySelect = row.querySelector('.theory-grade');
                const practicalSelect = row.querySelector('.practical-grade');

                if (theorySelect) theorySelect.selectedIndex = 0;
                if (practicalSelect) practicalSelect.selectedIndex = 0;
            });
        }
    });

    // SHOW/HIDE CGPA SECTION

    const cgpaSection = document.getElementById("cgpa-section");

    if(currentSemester === "sem1") {
        cgpaSection.classList.add("hidden");
    }
    else {
        cgpaSection.classList.remove("hidden");
    }
}


//SGPA calculation logic
document.getElementById("calc-sgpa")
.addEventListener("click", () => {

    const rows = document.querySelectorAll("#subjectRows > div");

    let totalCreditPoints = 0;
    let totalCredits = 0;

    rows.forEach(row => {

        const credits = Number(row.dataset.credits);

        const theorySelect =
            row.querySelector(".theory-grade");

        const practicalSelect =
            row.querySelector(".practical-grade");

        let totalGradePoints = 0;
        let gradeCount = 0;


        // THEORY
        if(theorySelect) {

            const theoryGrade =
                Number(theorySelect.value);

            totalGradePoints += theoryGrade;
            gradeCount++;
        }


        // PRACTICAL
        if(practicalSelect) {

            const practicalGrade =
                Number(practicalSelect.value);

            totalGradePoints += practicalGrade;
            gradeCount++;
        }


        // FINAL SUBJECT GRADE
        const subjectGrade =
        totalGradePoints / gradeCount;

        // CREDIT WEIGHTED POINTS

        totalCreditPoints +=
        subjectGrade * credits;

        totalCredits += credits;
    });

    const numericSgpa = (totalCreditPoints / totalCredits) + 0.6;
    const sgpa = numericSgpa.toFixed(2);

    lastSGPA = Number(numericSgpa.toFixed(2));
    lastTotalCredits = totalCredits;

    document.getElementById("sgpa-result").classList.remove("hidden");
    document.getElementById("sgpa-value").innerText = sgpa;
});


// CGPA calculation logic — simple average of previous and current SGPA
document.getElementById("calc-cgpa")
.addEventListener("click", () => {
    const prevSgpaInput = document.getElementById("prev-sgpa");

    const prevSgpa = prevSgpaInput ? parseFloat(prevSgpaInput.value) : NaN;

    // Get current SGPA (prefer lastSGPA if available)
    let currentSgpa = lastSGPA;
    if (currentSgpa === null) {
        const displayed = document.getElementById("sgpa-value").innerText;
        currentSgpa = displayed ? parseFloat(displayed) : NaN;
    }

    if (isNaN(prevSgpa)) {
        alert("Please enter a valid previous SGPA/CGPA.");
        return;
    }

    if (isNaN(currentSgpa)) {
        alert("Please calculate current SGPA first.");
        return;
    }

    const average = ((prevSgpa + currentSgpa) / 2).toFixed(2);

    document.getElementById("cgpa-result").classList.remove("hidden");
    document.getElementById("cgpa-value").innerText = average;
});
