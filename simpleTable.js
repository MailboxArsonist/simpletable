// EXAMPLE HEAD [{
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
//     sortable: true,
//     classList: 'text-right'
//   },{
//     field: 'commission',
//     label: 'Gains',
//     sortable: false,
//     classList: 'text-right'
//   }
// ];
// EXAMPLE OPTIONS {
//     table: '#referralStats',
//     details: false,
//     pagination: 'buttons', // 'buttons,' 
//     url: google.com
// };

export default class SimpleTable { 
    constructor(options, columns) {
        this.loading = true
        this.initialized = false
        this.columns = columns
        this.sorting = null
        this.filters = null
        this.noResults = options.noResults || { message: 'No results found', classList: ['text-center', 'font-italic']}
        this.page = 1
        this.perPage = options.perPage || 25
        this.total = 0
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

    render(){
        this.renderLoader()
        this.renderHead()
        this.request()
    }

    renderLoader(){
        const loader = document.createElement('div')
        loader.classList.add('simpletable-loader')
        this.table.appendChild(loader)
        loader.innerHTML = '<i class="fas fa-2x fa-spin fa-spinner"></i>'
    }

    toggleLoader(){
        const loader = this.table.querySelector('.simpletable-loader')
        this.loading ? loader.style.display = 'block' : loader.style.display = 'none'
    }

    // Creates and appends a th row from provided options in this.columns
    renderHead(){
        const row = document.createElement('tr')
        row.className = 'simpletable-head'

        // Create a cell for each col
        this.columns.forEach(option => {
            const cell = document.createElement('th')
            cell.textContent = option.label

            if(option.classList) {
                cell.classList = option.classList
            }
            cell.setAttribute('field', option.field)

            // If sortable append icon and add event listener
            if(option.sortable) {
                const sort = document.createElement('i')
                sort.classList.add("fal", "fa-long-arrow-down", "simpletable-sort")
                cell.appendChild(sort)
                sort.addEventListener('click', evt => this.handleSort(evt))
            }
            row.appendChild(cell)
        });
        // Append to table
        this.table.appendChild(row)
    }

    renderPagination() {

        // Only render if more than one page and buttons are not already rendered
        if(this.total > this.perPage && !document.querySelector('.simpletable-pagination')) {

            // Calc amount of buttons
            const amountOfButtons = Math.ceil(this.total / this.perPage)
            const buttonContainer = document.createElement('div')
            buttonContainer.classList.add('simpletable-pagination')

            for (let index = 1; index <= amountOfButtons; index++) {

                const button = document.createElement('button')

                if(index === this.page) {
                    button.classList.add('simpletable-active')
                }

                button.textContent = index
                button.addEventListener('click', evt => this.handlePagination(evt))
                buttonContainer.appendChild(button)
            }
            // Render buttons
            this.table.parentElement.appendChild(buttonContainer)
        }
    }

    handlePagination(evt){
        // Remove active class from last and set on new
        const button = document.querySelector('.simpletable-active')
        button.classList.remove('simpletable-active')
        evt.target.classList.add('simpletable-active')

        // Check not current page
        if(this.page === parseInt(evt.target.textContent)) {
            return
        }
        // Set page and request next page
        this.page = parseInt(evt.target.textContent)
        this.request()
    }

    // Creates and appends table rows and cells from data
    renderBody(data){
        const rows = this.table.querySelectorAll('.simpletable-row')

        // Remove any rows inside body
        if(rows) {
            rows.forEach(el => {
                el.parentElement.removeChild(el);
            })
        }

        data.forEach(rowData => {
            const row = document.createElement('tr')
            row.className = 'simpletable-row'
            
            this.columns.forEach(col => {
                const val = rowData[col.field]
                const cell = document.createElement('td')
                cell.textContent = val ? val.data : ''

                // Set class if provided by request
                if(val && typeof val.classList === 'object' && val.classList.length) {
                    val.classList.forEach(className => cell.classList.add(className))
                } else if (val && typeof val.classList === 'string') {
                    cell.classList.add(val.classList)
                }
                row.appendChild(cell)
            });
            this.table.appendChild(row)
        })

        // If no results show message
        if(!data.length) {
            const row = document.createElement('tr')
            row.className = 'simpletable-row'

            const cell = document.createElement('td')
            cell.textContent = this.noResults.message
            
            if(typeof this.noResults.classList === 'object' && this.noResults.classList.length) {
                this.noResults.classList.forEach(className => cell.classList.add(className))
            }

            cell.setAttribute('colspan', this.columns.length)
            row.appendChild(cell)
            this.table.appendChild(row)
        }

        // Render pagination buttons
        this.renderPagination()
    }


    // Handles sort on table. Adds/removes active classes and makes api call
    handleSort(e){
        if(e.target){
            const field = e.target.parentNode.getAttribute('field')
            const direction = e.target.classList.contains('asc') ? 'DESC' : 'ASC'

            // Loop over and remove any other active sort
            const sorts = this.table.querySelectorAll('.simpletable-sort')
            sorts.forEach(function(sort){
                sort.classList.remove('asc', 'sorted')
            })

            if(direction === 'DESC') {
                e.target.classList.remove('asc')
            } else {
                e.target.classList.add('asc')
            }
            e.target.classList.add('sorted')

            // Update sorting 
            this.sorting = {
                field,
                direction
            }

            // Make request with new sort data
            this.request();
        }
    }

    request(){
        // Display loading 
        this.loading = true
        this.toggleLoader()

        // Set req params
        const direction = this.sorting && this.sorting.direction ? this.sorting.direction : 'DESC';
        const sort = this.sorting && this.sorting.field ? this.sorting.field : null;
        const start = (this.page - 1) * this.perPage
        const filters = this.filters
        
    }

    setFilters(filterObject){
        this.filters = filterObject
    }
}