<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('manage_units') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item"><router-link to="/manage_products">{{ __('product') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('units') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">{{ __('units_list') }}</h4>
                        <span class="pull-right">
                            <button class="btn btn-primary"  @click="create_new=true" v-if="$can('unit_create')">{{ __('add_unit') }}</button>
                        </span>
                    </div>
                    <div class="card-body">

                        <b-row class="mb-2">
                            <b-col md="3" offset-md="8">
                                <h6 class="box-title">{{ __('search') }}</h6>
                                <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    :placeholder="__('search')"
                                ></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getUnits()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>

                        <b-table
                            :items="units"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection"
                            :bordered="true"
                            :busy="isLoading"
                            stacked="md"
                            show-empty
                            small>

                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>

                            <template #cell(parent_id)="row">
                                <p v-if="row.item.parent_id!==null">{{ row.item.parent_id }}</p>
                                <p v-else>-</p>
                            </template>

                            <template #cell(conversion)="row">
                                <p v-if="row.item.conversion!==null">{{ row.item.conversion }}</p>
                                <p v-else>-</p>
                            </template>

                            <template #cell(actions)="row">
                                <button class="btn btn-sm btn-primary" @click="edit_record = row.item" v-if="$can('unit_update')" v-b-tooltip.hover :title="__('edit')"><i class="fa fa-pencil-alt"></i></button>
                                <button class="btn btn-sm btn-danger" @click="deleteUnit(row.index,row.item.id)"><i class="fa fa-trash"></i></button>
                            </template>

                        </b-table>

                        <b-row>
                            <b-col  md="2" class="my-1">
                                <b-form-group
                                    :label="__('per_page')"
                                    label-for="per-page-select"
                                    label-align-sm="right"
                                    label-size="sm"
                                    class="mb-0">
                                    <b-form-select
                                        id="per-page-select"
                                        v-model="perPage"
                                        :options="pageOptions"
                                        size="sm"
                                        class="form-control form-select"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col  md="4" class="my-1" offset-md="6">
                                <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRows"
                                    :per-page="perPage"
                                    align="fill"
                                    size="sm"
                                    class="my-0"
                                ></b-pagination>
                            </b-col>
                        </b-row>

                    </div>
                </div>
            </section>
        </div>
        <!-- Add / Edit -->
        <app-edit-record
            v-if="create_new || edit_record"
            :record="edit_record"
            :units="units"
            @modalClose="hideModal()"
        ></app-edit-record>
    </div>
</template>
<script>
    import EditRecord from './Edit';
    export default {
        components: {
            'app-edit-record' : EditRecord,
        },
        data: function() {
            return {
                fields: [
                    { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                    { key: 'name', label: __('name'), sortable: true, class: 'text-center' },
                    { key: 'short_code', label: __('short_code'), sortable: true, class: 'text-center' },
                    { key: 'parent_id', label: __('parent_id'),  class: 'text-center' },
                    { key: 'conversion', label: __('conversion'),  class: 'text-center' },
                    { key: 'actions', label: __('actions') }
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: this.$perPage,
                pageOptions: this.$pageOptions,
                sortBy: '',
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                filterOn: [],
                page: 1,

                units: [],
                isLoading: false,
                sectionStyle : 'style_1',
                max_visible_units : 12,
                max_col_in_single_row : 3,
                create_new : null,
                edit_record : null
            }
        },
        computed: {
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => {
                        return { text: f.label, value: f.key }
                    })
            }
        },
        mounted() {
            // Set the initial number of items
            this.totalRows = this.units.length
        },
        created: function() {
            this.$eventBus.$on('unitSaved', (message) => {
               
              
                this.showMessage("success", message);
                this.getUnits();
                this.create_new = null;
            });
            this.getUnits();
        },
        methods: {
            getUnits(){
                this.isLoading = true
                axios.get(this.$apiUrl + '/units')
                    .then((response) => {
                        this.isLoading = false
                        let data = response.data;
                        this.units = data.data
                        this.totalRows = this.units.length
                    });
            },
            deleteUnit(index, id){
                this.$swal.fire({
                    title: "Are you Sure?",
                    text: "You want be able to revert this",
                    confirmButtonText: "Yes, Sure",
                    cancelButtonText: "Cancel",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#37a279',
                    cancelButtonColor: '#d33',
                }).then(result => {

                    if (result.value) {
                        this.isLoading = true
                        let postData = {
                            id : id
                        }
                        axios.post(this.$apiUrl + '/units/delete',postData)
                            .then((response) => {
                                this.isLoading = false
                                let data = response.data;
                                this.units.splice(index, 1);
                                
                                this.showMessage("success", data.message);
                            });
                    }
                });
            },
            addUnitSettings(){
                let postData = {
                    add_unit_settings : 1,
                    cat_style: this.sectionStyle,
                    max_visible_units : this.max_visible_units,
                    max_col_in_single_row : this.max_col_in_single_row
                }
                
                axios.post(this.$apiUrl + '/units/saveUnitSettings',postData)
                    .then((response) => {
                       
                        let data = response.data;
                        
                        this.showMessage("success", data.message);
                    });
            },
            hideModal() {
                this.create_new = false
                this.edit_record = false
            },
        }
    };
</script>
