import SimpleTable from "./simpleTable.js"

const head = [{
    field: 'name',
    label: 'Enterprise',
    sortable: true,
    classList: 'text-left'
  },{
    field: 'type',
    label: 'Statut',
    sortable: false,
    classList: 'text-left'
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
    pagination: 'buttons', // 'buttons,' 
    url: 'google.com'
}

const table = new SimpleTable(options, head)




