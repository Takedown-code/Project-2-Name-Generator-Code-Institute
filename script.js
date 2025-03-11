document.addEventListener("DOMContentLoaded", () => {
    const nameType = document.getElementById("name-type");
    const generateBtn = document.getElementById("generate-btn");
    const saveBtn = document.getElementById("save-btn");
    const nameResult = document.getElementById("name-result");
    const savedNamesList = document.getElementById("saved-names");
    const nameChartCanvas = document.getElementById("nameChart");
    
    let savedNames = [];
    let trendingNames = {
        "James": 30_000_000,
        "Mary": 38_000_000,
        "John": 45_000_000,
        "Patricia": 32_000_000,
        "Robert": 25_000_000,
        "Jennifer": 23_000_000,
        "Michael": 39_000_000,
        "Linda": 28_000_000,
        "William": 27_000_000,
        "Elizabeth": 22_000_000
    };
    
    function generateName() {
        const namesByType = {
            fantasy: ["Eloria", "Zyphos", "Draven", "Seraphis", "Vexis", "Mythran", "Aerion", "Sylvara", "Vaelith", "Zephyrus", "Ash", "Thorne", "Eldrin", "Solara", "Kaelith"],
            baby: ["Aria", "Noah", "Liam", "Sophia", "Ella", "Emma", "Olivia", "Mason", "Lucas", "Ethan"].concat(Object.keys(trendingNames)),
            "sci-fi": ["Xyron", "Tiberius", "Nova", "Zephyr", "Orion", "Quasar", "Lyra", "Zenthos", "Aether", "Neon", "Vortex", "Xenon", "Zypher", "Omicron", "Hyperion"],
            mystical: ["Liora", "Azrael", "Celestia", "Rune", "Mythos", "Seraphina", "Nyx", "Eldrin", "Thalora", "Draven", "Talon", "Mystara", "Zephara", "Sable", "Orin" ]
        };
        
        const selectedType = nameType.value;
        const nameList = namesByType[selectedType];
        const randomName = nameList[Math.floor(Math.random() * nameList.length)];
        nameResult.textContent = randomName;
        nameResult.style.display = "block";
        
        // Update trending names count
        if (trendingNames[randomName]) {
            trendingNames[randomName] += 1;
        } else {
            trendingNames[randomName] = 1;
        }
        updateChart();
    }
    
    function saveName() {
        if (nameResult.textContent) {
            savedNames.push(nameResult.textContent);
            const listItem = document.createElement("li");
            listItem.textContent = nameResult.textContent;
            savedNamesList.appendChild(listItem);
        }
    }
    
    function updateChart() {
        const ctx = nameChartCanvas.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: Object.keys(trendingNames),
                datasets: [{
                    label: "Popularity",
                    data: Object.values(trendingNames),
                    backgroundColor: "rgba(54, 162, 235, 0.6)"
                }]
            }
        });
    }
    
    generateBtn.addEventListener("click", generateName);
    saveBtn.addEventListener("click", saveName);
    updateChart();
});