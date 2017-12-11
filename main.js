'use strict';

// `STORE` is responsible for storing the underlying data
// that our app needs to keep track of in order to work.
//
// for a shopping list, our data model is pretty simple.
// we just have an array of shopping list items. each one
// is an object with a `name` and a `checked` property that
// indicates if it's checked off or not.
// we're pre-adding items to the shopping list so there's
// something to see when the page first loads.
const STORE = [
  { name: 'apples', checked: false },
  { name: 'oranges', checked: false },
  { name: 'milk', checked: true },
  { name: 'bread', checked: false }
];

/*
  function addShoppingListItem(index, name, checked){
  // Do things here
  }

 */

function generateItemHtml(index) {
  return `<li>
        <span class= 'shopping-item ${STORE[index].checked ? "shopping-item__checked" :"" }' data-item-index="${index}">${STORE[index].name}</span>
        <div class= 'shopping-item-controls'>
          <button class= 'shopping-item-toggle'>
            <span class= 'button-label'>check</span>
            </button>
          <button class= 'shopping-item-delete'>
            <span class= 'button-label'>delete</span>
           </button>
        </div >
        </li>`;
}

function renderShoppingList() {
  // this function will be repsonsible for rendering the shopping list in
  // the DOM
  let list = STORE.map((item, index) => generateItemHtml(index));
  // Add to DOM
  $('.js-shopping-list').html(list);
  console.log('`renderShoppingList` ran');
}


function handleNewItemSubmit() {
  //this function will be responsible for when users add a new shopping list item
  //event listener on list
  //capture the item using val()
  //add item to STORE
  //render the shopping list on the page

  $('#js-shopping-list-form').submit(event => {
    event.preventDefault();
    let item = $('.js-shopping-list-entry').val();
    STORE.push({ name: item, checked: false });
    $('.js-shopping-list-entry').val('');
    renderShoppingList();
  });

  console.log('`handleNewItemSubmit` ran');
}


function handleItemCheckClicked() {
  // this function will be reponsible for when users click the "check" button on
  // a shopping list item.
  //event listener on check button
  //add to the list (li) the .shopping-item__checked class
  //set item "checked" in the STORE to true

  $('.js-shopping-list').on('click', '.shopping-item-toggle', function(event) {
    let currentItem = event.currentTarget;
    let itemIndex = $(currentItem).closest('li').find('span').attr('data-item-index');
    $(currentItem).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
    if (STORE[itemIndex].checked)
      STORE[itemIndex].checked = false;
    else
      STORE[itemIndex].checked = true;
  });
  renderShoppingList();

  console.log('`handleItemCheckClicked` ran');
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item

  // 1. Event Target to get deleted item
  // 2. Remove from STORE
  // 3. Reomve from DOM

  let item = $('.js-shopping-list').on('click', '.shopping-item-delete', function(event) {
    let currentItem = event.currentTarget;
    let itemIndex = $(currentItem).closest('li').find('span').attr('data-item-index');
    $(currentItem).closest('li').remove();
    delete STORE[itemIndex];
  });
  console.log('`handleDeleteItemClicked` ran');
}

function handleSearchItemClicked(){
  // How do we clear existing .shopping-item-found

  $('#js-shopping-list-search').on('submit'/*,'button[type="search"]'*/, event => {
    $('li.shopping-item-found').removeClass('shopping-item-found');
    event.preventDefault();
    let searchedItem = $('.js-shopping-list-search').val();
    let foundItem = null;
    
    STORE.forEach(i => { 
      if (i.name === searchedItem) foundItem = i;
    });
  
    let itemIndex = STORE.indexOf(foundItem);

    let item = $('.js-shopping-list')
      .find(`span[data-item-index="${itemIndex}"]`);

    item.parent().addClass('shopping-item-found');
    let offset = item.offset();
    item[0].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleSearchItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);