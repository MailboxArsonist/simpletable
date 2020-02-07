// const options = [{
//     field: 'name',
//     label: 'Enterprise',
//     sortable: false
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
                "data":"70,00 \u20ac"
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
                        "data":"70,00 \u20ac"
                    }
    }]
}


export class DataTable {
    constructor(table, options) {
        this.initialized = false

        this.options = options
        this.table = null
        if(typeof table === "string") {
            this.table = document.querySelector(table)
        }

        this.init()
    }
    init() {
        if (this.initialized) {
            return false
        }
        this.render()
        this.initialized = false
    }

    async render(){
        // Fake api request
        const d = testData

          
        const test = await this.request(true, 1000);
        console.log(test)

        this.table.classList.add('simple-table')
        this.renderHead()
    }

    renderHead(){
        const row = document.createElement('tr')
        row.className = 'simple-head'
        this.options.forEach(option => {
            const cell = document.createElement('th')
            cell.textContent = option.label
            cell.setAttribute('field', option.field)
            row.appendChild(cell)
        });
        console.log(row)
        this.table.appendChild(row)
    }

    request(success, timeout){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              if(success) {
                resolve(testData);
              } else {
                reject({message: 'Error'});
              }
            }, timeout);
        });
    }
}