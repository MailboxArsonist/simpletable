import {DataTable} from "./simpleTable.js"

const options = [{
    field: 'name',
    label: 'Enterprise',
    sortable: false
  },{
    field: 'type',
    label: 'Statut',
    sortable: false,
  },{
    field: 'date',
    label: 'Date',
    sortable: false,
  },{
    field: 'commission',
    label: 'Gains',
    sortable: false,
  }
];

const table = new DataTable('#table',options)




