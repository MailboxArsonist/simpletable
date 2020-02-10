// const columns = [{
//     field: 'name',
//     label: 'Enterprise',
//     sortable: false,
//   },{
//     field: 'type',
//     label: 'Statut',
//     sortable: false,
//   },{
//     field: 'date',
//     label: 'Date',
//     sortable: false,
//   },{
//     field: 'commission',
//     label: 'Gains',
//     sortable: false,
//   }
// ];

const testData = {
    "recordsFiltered":2,
    "data":[{
        "date":{
            "data":"30\/01\/2020",
            "classList":"text-right"
        },
        "name":{ 
            "data":"safari company",
            "classList":"text-left"
        },
        "type": {
            "data":"Abonnement",
            "classList":"text-left"
        },
        "commission": {
            "data":"70,00 \u20ac",
            "classList":"text-right"
        }
        },
        {
        "date":{
            "data":"29\/01\/2020",
            "classList":"text-right"
            },
            "name":{
                "data":"test",
                "classList":"text-left"
            },
                "type":{
                    "data":"Abonnement",
                    "classList":"text-left"
                    },
                    "commission":{
                        "data":"70,00 \u20ac",
                        "classList":"text-right"
                    }
    }]
}
const testData2 = {
    "recordsFiltered":2,
    "data":[{
        "date":{
            "data":"30\/01\/2020",
            "classList":"text-right"
        },
        "name":{ 
            "data":"company",
            "classList":"text-left"
        },
        "type": {
            "data":"Abonnement",
            "classList":"text-left"
        },
        "commission": {
            "data":"70,00 \u20ac",
            "classList":"text-right"
        }
        },
        {
        "date":{
            "data":"29\/01\/2020",
            "classList":"text-right"
            },
            "name":{
                "data":"new company with a long ass name bla vla etc......",
                "classList":"text-left"
            },
                "type":{
                    "data":"Abonnement",
                    "classList":"text-left"
                    },
                    "commission":{
                        "data":"70,00 \u20ac",
                        "classList":"text-right"
                    }
    }]
}


export class DataTable {
    constructor(options, columns) {
        this.initialized = false

        this.columns = columns
        this.sorting = null
        this.details = options.details || false
        this.pagination = options.pagination || false
        this.table = null
        this.url = options.url

        if(typeof options.table === "string") {
            this.table = document.querySelector(options.table)
        }

        this.init()
    }
    init() {
        if (this.initialized) {
            return false
        }
        this.render()
        this.initialized = false
        this.table.classList.add('simpletable')
    }

    async render(){
        this.renderHead()
        // Fake api request
        const data = await this.request(true, 1000);
        console.log(data)
        this.renderBody(data.data)
    }

    renderHead(){
        const row = document.createElement('tr')
        row.className = 'simpletable-head'
        this.columns.forEach(option => {
            const cell = document.createElement('th')
            cell.textContent = option.label
            cell.classList = option.classList
            cell.setAttribute('field', option.field)
            if(option.sortable) {
                const sort = document.createElement('i')
                sort.classList.add ("fas", "fa-long-arrow-alt-down", "simpletable-sort")
                cell.appendChild(sort)
                sort.addEventListener('click', evt => this.handleSort(evt))
            }
            row.appendChild(cell)
        });
        console.log(row)
        this.table.appendChild(row)
    }

    renderBody(data){
        const rows = document.querySelectorAll('.simpletable-row')
        if(rows) {
            rows.forEach(el => {
                console.log(el.parentElement.removeChild(el))
            })
        }
        data.forEach(rowData => {
            const row = document.createElement('tr')
            row.className = 'simpletable-row'
            this.columns.forEach(col =>{
                const val = rowData[col.field]
                const cell = document.createElement('td')
                cell.textContent = val.data
                cell.classList.add(val.classList)
                row.appendChild(cell)
            });
            this.table.appendChild(row)
        })
    }

    async handleSort(e){
        if(e.target){
            const field = e.target.parentNode.getAttribute('field')
            const direction = e.target.classList.contains('asc') ? 'desc' : 'asc'

            // Loop over and remove any other active sort
            const sorts = document.querySelectorAll('.simpletable-sort')
            sorts.forEach(function(sort){
                sort.classList.remove('asc', 'sorted')
            })
            if(direction === 'desc') {
                e.target.classList.remove('asc')
            } else {
                e.target.classList.add('asc')
            }
            e.target.classList.add('sorted')
            this.sorting = {
                field,
                direction
            }
            const data = await this.request(true, 1000, this.sorting);
            this.renderBody(data.data)
        }
    }

    

    request(success, timeout, params){
        console.log(params)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              if(success) {
                resolve(params? testData2 : testData);
              } else {
                reject({message: 'Error'});
              }
            }, timeout);
        });
    }
}