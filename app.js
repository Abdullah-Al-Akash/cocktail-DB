const drinksContainer = document.getElementById('drinks-container');
const errorMsg = document.getElementById('error-msg');
// Search Field:
document.getElementById('search-btn').addEventListener('click', function () {
        drinksContainer.textContent = '';
        errorMsg.textContent = '';
        const searchField = document.getElementById('search-field');
        const searchText = searchField.value;

        // Condition For Search Option:
        if (searchText.length == 0) {
                const div = document.createElement('div');
                div.innerHTML = `
                        <h4 class="text-danger text-center">Please write drinks name..</h4>
                `;
                errorMsg.appendChild(div);
        }

        // Fetch URL:
        else if (searchText.length == 1) {
                // Searchwith single word:
                fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`)
                        .then(res => res.json())
                        .then(data => showDrinks(data.drinks));
        }
        else {
                // Load Drinks Item
                fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
                        .then(res => res.json())
                        .then(data => showDrinks(data.drinks));
        }
        searchField.value = '';
})

// Show Drinks Item:
function showDrinks(drinks) {
        // console.log(drinks)
        if (!drinks) {
                const div = document.createElement('div');
                div.innerHTML = `
                        <h4 class="text-danger text-center">There are no drinks...</h4>
                `;
                errorMsg.appendChild(div);
        }

        else {
                drinks?.forEach(drink => {
                        const div = document.createElement('div');
                        div.innerHTML = `
                                <div onclick=singleDrink('${drink.idDrink}') class="col">
                                        <div class="card drinks">
                                                <img src="${drink.strDrinkThumb}" class="img-fluid p-4 rounded-3" alt="...">
                                                <div class="card-body">
                                                        <h5 class="card-title">${drink.strDrink}</h5>
                                                        <p class="card-text"></p>
                                                </div>
                                        </div>
                                </div>
                                `;
                        drinksContainer.appendChild(div);
                })
        }

}
// Load Single Drink By ID:
const singleDrink = (drink) => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`)
                .then(res => res.json())
                .then(data => showSingleDrink(data.drinks[0]))
}

// Show Single Drink Details:
const showSingleDrink = (drink) => {
        console.log(drink);
}
