let currentSemester = "";
let currentStructure = "";

bgVid.playbackRate = 0.5;

const subjects = {
    sem1: {
        A: [
            { name: "Maths-I", practical: false, credits: 4 },
            { name: "Chemistry", practical: true, credits: 4 },
            { name: "IKS", practical: true, credits: 4 },
            { name: "ETM", practical: true, credits: 4 },
            { name: "EGD", practical: true, credits: 4 },
            { name: "PC", practical: true, credits: 4},
            { name: "Drama/Photography", practical: true, credits: 2}
        ],

        B: [
            { name: "Maths-I", practical: false, credits: 4 },
            { name: "Physics", practical: true, credits: 4 },
            { name: "BEE", practical: true, credits: 4  },
            { name: "BE", practical: true, credits: 4  },
            { name: "PPS", practical: true, credits: 4  },
            { name: "Yoga & Sports", practical: true, credits: 2  }
        ]
    },

    sem2: {
        A: [
            { name: "Maths-II", practical: false, credits: 3 },
            { name: "Chemistry", practical: true, credits: 4 },
            { name: "IKS", practical: true, credits: 4 },
            { name: "ETM", practical: true, credits: 4 },
            { name: "EGD", practical: true, credits: 4 },
            { name: "PC", practical: true, credits: 4},
            { name: "Drama/Photography", practical: true, credits: 2}
        ],

        B: [
            { name: "Maths-II", practical: false, credits: 3 },
            { name: "Physics", practical: true, credits: 4 },
            { name: "BEE", practical: true, credits: 4  },
            { name: "BE", practical: true, credits: 4  },
            { name: "PPS", practical: true, credits: 4  },
            { name: "Yoga & Sports", practical: true, credits: 2  }
        ]
    }
};

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

        row.className =
            "grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/30 rounded-lg  border border-white";

        row.innerHTML = `

            <div class="font-semibold text-[1.3rem] text-gray-700 flex justify-center items-center">
                ${subject.name}
            </div>
            <span class="text-[0.95rem] text-black/60 font-light mb-[-1rem] md:hidden" >Theory</span>
            <select class="theory-grade p-2 border rounded">
                <option value="" disabled selected hidden>Select Grade</option>
                <option value="10">O</option>
                <option value="9">A+</option>
                <option value="8">A</option>
                <option value="7">B+</option>
                <option value="6">B</option>
                <option value="5">C</option>
                <option value="0">F</option>
            </select>

            ${
                subject.practical
                ?
                `
                <span class="text-[0.95rem] text-black/60 font-light mb-[-1rem] md:hidden" >Practiclas</span>
                <select class="practical-grade p-2 border rounded">
                    <option value="" disabled selected hidden>Select Grade</option>
                    <option value="10">O</option>
                    <option value="9">A+</option>
                    <option value="8">A</option>
                    <option value="7">B+</option>
                    <option value="6">B</option>
                    <option value="5">C</option>
                    <option value="0">F</option>
                </select>
                `
                :
                `
                <div class="flex items-center text-gray-400">
                    No Practical
                </div>
                `
            }

            <button class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">
                Remove
            </button>
        `;

        subjectContainer.appendChild(row);
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