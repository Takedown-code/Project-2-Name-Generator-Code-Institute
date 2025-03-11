document.addEventListener("DOMContentLoaded", () => {
    const nameType = document.getElementById("name-type");
    const generateBtn = document.getElementById("generate-btn");
    const saveBtn = document.getElementById("save-btn");
    const nameResult = document.getElementById("name-result");
    const savedNamesList = document.getElementById("saved-names");
    const nameChartCanvas = document.getElementById("nameChart");
    
    let savedNames = [];
    let nameChart = null; // Store Chart.js instance
    
    let trendingNames = {
        "James": 30000000,
        "Mary": 38000000,
        "John": 45000000,
        "Patricia": 32000000,
        "Robert": 25000000,
        "Jennifer": 23000000,
        "Michael": 39000000,
        "Linda": 28000000,
        "William": 27000000,
        "Elizabeth": 22000000
    };
    
    function generateName() {
        const namesByType = {
            fantasy: ["Eloria", "Zyphos", "Draven", "Seraphis", "Vexis", "Mythran", "Aerion", "Sylvara", "Vaelith", "Zephyrus", "Ash", "Thorne", "Eldrin", "Solara", "Kaelith"],
            baby: ["Aria", "Noah", "Liam", "Sophia", "Ella", "Emma", "Olivia", "Mason", "Lucas", "Ethan"].concat(Object.keys(trendingNames)),
            "sci-fi": ["Xyron", "Tiberius", "Nova", "Zephyr", "Orion", "Quasar", "Lyra", "Zenthos", "Aether", "Neon", "Vortex", "Xenon", "Zypher", "Omicron", "Hyperion"],
            mystical: ["Liora", "Azrael", "Celestia", "Rune", "Mythos", "Seraphina", "Nyx", "Eldrin", "Thalora", "Draven", "Talon", "Mystara", "Zephara", "Sable", "Orin"]
        };
        
        const selectedType = nameType.value;
        const nameList = namesByType[selectedType];
        const randomName = nameList[Math.floor(Math.random() * nameList.length)];
        nameResult.textContent = randomName;
        nameResult.style.display = "block";
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
        
        // Destroy existing chart instance before creating a new one
        if (nameChart) {
            nameChart.destroy();
        }
        
        nameChart = new Chart(ctx, {
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