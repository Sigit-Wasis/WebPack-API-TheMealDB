document.getElementById('button').addEventListener('click', loadContent, true);
document.getElementById('btn-clear').addEventListener('click', clearResult, true);

function loadContent() {
    var xhr = new XMLHttpRequest();
    // api TheMealDb Random
    var url = "https://www.themealdb.com/api/json/v1/1/random.php";

    xhr.onloadstart = function () {
        document.getElementById("button").innerHTML = "Loading.....";
    }

    xhr.onerror = function () {
        alert("Gagal mengambil data");
    };

    xhr.onloadend = function () {
        if (this.responseText !== "") {

            let mealsList = []
            fetch(url)
                .then(e => e.json())
                .then(e => e.meals)
                .then(meals => {
                    meals.forEach(meal => {
                        mealsList.push(meal)
                        let mealTitle = document.createElement("h4")
                        // mealTitle.innerHTML = meal.strMeal;
                        mealTitle.innerHTML += `
                            <div class="card-body">
                                <div class="row">
                                    <div class="column col-md-12" 
                                        style="
                                            margin-bottom: -45px; 
                                            color: #FF6366;
                                        ">
                                        <center>
                                            <h5>${meal.strMeal}</h5>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        `;

                        let mealThumb = document.createElement("img")
                        mealThumb.setAttribute("src", meal.strMealThumb)
                        mealThumb.setAttribute("width", "400")

                        document.getElementById("hasil").append(mealTitle, mealThumb);
                        document.getElementById("button").innerHTML = "Done";

                        setTimeout(function () {
                            document.getElementById("button").innerHTML = "Load Lagi";
                        }, 3000);
                    })
                })                    
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}

function clearResult() {
    document.getElementById("hasil").innerHTML = "";
}