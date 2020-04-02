import SimpleTable from "./simpleTable.js"

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

const table = new SimpleTable(options, head)




