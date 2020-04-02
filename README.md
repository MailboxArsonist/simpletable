# Simpletable
Just a simple table, nothing more nothing less.

Built with Vanilla JS, you can use this to create simple data tables.

# Setup

1. Init the table by importing the table.

```javascript
import SimpleTable from "./simpleTable.js"
```

2. Pass the table head options and table options. Add sortable value to set whether sortable. You can add a class too. Set pagination options and no results options and URL for the table to make a request. 

```javascript
const head = [{
  field: 'name',
  label: 'User',
  sortable: false
},{
  field: 'type',
  label: 'Type',
  sortable: false,
},{
  field: 'date',
  label: 'Date',
  sortable: true,
  classList: 'text-right'
},{
  field: 'commission',
  label: 'Gains',
  sortable: false,
  classList: 'text-right'
}
];

const options = {
  table: '#table',
  details: false,
  noResults: {
    message: 'There are no results',
    classList: ['text-center']
  },
  pagination: true,
  url: 'google.com'
};

new SimpleTable(options, head)
```

3. Insert a table element `<table id="table"></table>` for the simpletable to render to.

4. The simple table requires fontawesome for the loader icons and the sort icons. Feel free to change these out.

5. You will also need the css file, you can simply change / take what you need.

No licence, use, modify, share anywhere you like! Thanks for looking!
