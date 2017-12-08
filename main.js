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
  return `<li><span class= 'shopping-item' data-item-index="${index}">${STORE[index].name}</span>
        <div class= 'shopping-item-controls'>
        <button class= 'shopping-item-toggle'>
        <span class= 'button-label'>check</span>
        </button><button class= 'shopping-item-delete'>
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
    renderShoppingList();
  });

  console.log('`handleNewItemSubmit` ran');
}


function handleItemCheckClicked() {
  // this function will be reponsible for when users click the "check" button on
  // a shopping list item.
  console.log('`handleItemCheckClicked` ran');
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  console.log('`handleDeleteItemClicked` ran');
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

}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);