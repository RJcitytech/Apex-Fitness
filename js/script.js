(function() {
    window.addEventListener("DOMContentLoaded", function() {
        setupWodGenerator();
        setupBmiCalculator();
        setupSlideshow();
        setupThemeToggle();
        setupFormValidation();
    });

    function setupFormValidation() {
        var form = document.getElementById("regForm");
        var errorBox = document.getElementById("errorBox");
        var successBox = document.getElementById("successBox");

        if (form) {
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                errorBox.style.display = "none";
                errorBox.innerHTML = "";
                
                var fields = [
                    { id: "fullName", name: "Full Name" },
                    { id: "email", name: "Email Address" },
                    { id: "phone", name: "Phone Number" },
                    { id: "age", name: "Age" },
                    { id: "memberType", name: "Membership Type" },
                    { id: "timePreference", name: "Preferred Workout Time" },
                    { id: "experience", name: "Experience Level" }
                ];

                var errors = [];
                fields.forEach(function(field) {
                    var input = document.getElementById(field.id);
                    if (!input.value || input.value.trim() === "") {
                        errors.push(field.name + " is required.");
                    }
                });

                if (errors.length > 0) {
                    errorBox.style.display = "block";
                    var ul = document.createElement("ul");
                    errors.forEach(function(err) {
                        var li = document.createElement("li");
                        li.textContent = err;
                        ul.appendChild(li);
                    });
                    errorBox.appendChild(ul);
                } else {
                    successBox.style.display = "block";
                    successBox.textContent = "Application submitted successfully!";
                    form.reset();
                }
            });
        }
    }

    // Existing functions (setupThemeToggle, setupWodGenerator, etc.) remain unchanged
    function setupThemeToggle() {
        var btn = document.getElementById("themeToggle");
        if (btn) {
            btn.addEventListener("click", function() {
                document.body.classList.toggle("dark-mode");
            });
        }
    }

    function setupWodGenerator() {
        var btn = document.getElementById("wodBtn");
        var movements = ["Burpees", "Pullups", "Box Jumps", "Kettlebell Swings", "Pushups", "Air Squats"];
        var reps = ["10", "20", "30", "50"];
        var types = ["AMRAP in 10 mins:", "5 Rounds for time:"];

        if (btn) btn.addEventListener("click", function() {
            var randomType = types[Math.floor(Math.random() * types.length)];
            var randomRep = reps[Math.floor(Math.random() * reps.length)];
            var randomMove = movements[Math.floor(Math.random() * movements.length)];
            document.getElementById("wodOutput").textContent = randomType + " " + randomRep + " " + randomMove;
        });
    }

    function setupBmiCalculator() {
        var btn = document.getElementById("bmiBtn");
        if (btn) {
            btn.addEventListener("click", function() {
                var heightCm = parseFloat(document.getElementById("heightInput").value);
                var weightLbs = parseFloat(document.getElementById("weightInput").value);
                
                if (weightLbs < 55 || weightLbs > 1000) {
                    alert("Please enter a weight between 55 lbs and 1000 lbs.");
                    return;
                }

                if (heightCm > 0 && weightLbs > 0) {
                    var heightM = heightCm / 100;
                    var weightKg = weightLbs * 0.453592;
                    var bmi = (weightKg / (heightM * heightM)).toFixed(1);
                    document.getElementById("bmiOutput").textContent = "Your BMI is: " + bmi;
                } else {
                    alert("Please enter valid height and weight.");
                }
            });
        }
    }

    function setupSlideshow() {
        var slides = document.querySelectorAll('.slide-img');
        if (slides.length === 0) return;
        var index = 0;
        slides.forEach(s => s.style.opacity = 0);
        slides[0].style.opacity = 1;
        setInterval(function() {
            slides[index].style.opacity = 0;
            index = (index + 1) % slides.length;
            slides[index].style.opacity = 1;
        }, 3000);
    }
})();