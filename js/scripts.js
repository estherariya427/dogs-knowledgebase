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
          name: obj.strMeal,
          imageUrl: obj.strMealThumb
        };
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
    return repository;
  }

  function addListItem(food) {
    // create list element
    var newListItem = document.createElement('li');
    newListItem.classList.add('food-item');
    newListItem.innerText = '';

    // create button element and add name to innerText
    var newButtonItem = document.createElement('button');
    newButtonItem.innerText = food.name;
    newButtonItem.classList.add('buttonStyle');

    // append button to list element
    newListItem.appendChild(newButtonItem);

    // select the unordered list in the DOM and append list item
    var $foodList = document.querySelector('.food-list');
    $foodList.appendChild(newListItem);

    // Adding event Listener when click on the button
    newButtonItem.addEventListener('click', function(event) {
      showDetails(food);
    });
  }

  var $modalContainer = document.querySelector('#modal-container');
  function showModal(title, image) {

    $modalContainer.classList.add('is-visible');

    // Clear all existing modal content
    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content: Name, height, and image
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    var titleElement = document.createElement('h1');
    titleElement.innerText = title;

    var imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.classList.add('myImage');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  }

  function showDetails(food) {
    showModal(food.name, food.imageUrl);
  }

  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  $modalContainer.addEventListener('click', (e) => {
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });
  return {
    loadList: loadList,
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  }

})();

foodRepository.loadList().then(function() {
  foodRepository.getAll().forEach(function (food) {
    foodRepository.addListItem(food);
  });
});
