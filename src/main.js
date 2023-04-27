import './views/brief-view.js';
import './views/add-view.js';
import './views/filter-view.js';
import './views/sort-view.js';
import './views/list-view.js';

/**
 * @type {BriefView}
 */
const briefView = document.querySelector('brief-view');

/**
 * @type {AddView}
 */
const addView = document.querySelector('add-view');

/**
 * @type {FilterView}
 */
const filterView = document.querySelector('filter-view');

/**
 * @type {SortView}
 */
const sortView = document.querySelector('sort-view');

/**
 * @type {ListView}
 */
const listView = document.querySelector('list-view');

briefView.render();
addView.render();
filterView.render();
sortView.render();
listView.render();


