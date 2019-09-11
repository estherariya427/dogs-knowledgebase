var foodRepository = (function () {
  var repository = [];
  var apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  function loadList() {
    return $.ajax(apiUrl, { dataType: 'json'}).done(function (responseJSON) {
      console.log("success");
      var data = Object.keys(responseJSON.meals);
      for (var i = 0; i < data.length; i++) {
        var obj = responseJSON.meals[i];
        var food = {
          name: obj.strMeal
        }
        add(food);
        console.log(food);
      }
    }).catch(function (e) {
      console.log(e);
    });
  }

  function add(food) {
    //check if the parameter is an Object
    if(typeof food === typeof {}) {
      repository.push(food);
    }
    else {
     return document.write('<p> "' + food + '" is a wrong input type! </p>');
   }
  }

  // function that returns the entire food repository
  function getAll() {
    console.log(repository);
    return respository;
  }

  function addListItem(food) {
    console.log("in addListItem");
    // create list element
    var newListItem = document.createElement('li');
    newListItem.classList.add('food-item');
    newListItem.innerText = '';

    // create button element and add name to innerText
    var newButtonItem = document.createElement('button');
    newButtonItem.innerText = food.name;

    // append button to list element
    newListItem.appendChild(newButtonItem);

    // select the unordered list in the DOM and append list item
    var $foodList = document.querySelector('food-list');
    $foodList.appendChild(newListItem);
  }

  return {
    loadList: loadList,
    add: add,
    getAll: getAll,
    addListItem: addListItem
  }

})();

foodRepository.loadList().then(function() {
  foodRepository.getAll().forEach(function(food) {
    foodRepository.addListItem(food);
  });
});
