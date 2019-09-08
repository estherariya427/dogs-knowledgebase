var dogRepository = (function () {
  var repository = [];

  function loadList() {
    return $.ajax('https://dog.ceo/api/breeds/list/all', { dataType: 'json'}).then(function (responseJSON) {
      console.log(responseJSON);
    }).then(function (data) {
      var dog = {
        name: $(this).data;
      };
      add(dog);
    });
  }).catch(function (e) {
      console.error(e);
    });
  }

function loadImage(item) {
  return $.ajax('https://dog.ceo/api/breed/' + item + '/images/random', )
}

  function add(dog) {
    if(typeof dog === typeof {}) {
      repository.push(dog);
    }
    else {
      return document.write('<p>"' + dog +'" is a wrong input type! </p>');
    }
  }

  function addListItem(dog) {
    var $element = $().
  }

  return {
    loadList: loadList,
    add: add
  };
})();

dogRepository.loadList().then(function() {


});
