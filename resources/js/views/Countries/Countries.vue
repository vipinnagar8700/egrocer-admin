<template>

    <div>

        <div class="page-heading">
            <div class="row">
            <div class="col-12 col-md-6 order-md-1 order-last">
                <h3>{{ __('manage_countries') }}</h3>
            </div>
            <div class="col-12 col-md-6 order-md-2 order-first">
                <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('manage_countries') }}</li>
                    </ol>
                </nav>
            </div>
        </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">

                        <div class="card-header">
                            <h4>{{ __('countries') }}</h4>
                            <span class="pull-right">
                                <router-link to="/countries/create" class="btn btn-primary" v-b-tooltip.hover  :title="__('add_country')">{{ __('add_country') }}</router-link>
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
                                    <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getRecords()">
                                        <i class="fa fa-refresh" aria-hidden="true"></i>
                                    </button>
                                </b-col>
                            </b-row>
                            <b-table
                                :items="countries"
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

                                <template #cell(id)="row">
                                    {{ row.item.id }}
                                </template>
                                <template #cell(logo)="row">
                                    <p v-if="row.item.logo ===''"> {{ __('no_image') }}</p>
                                    <img :src="$storageUrl + row.item.logo" height="50" v-else/>
                                </template>
                                <template #cell(is_default)="row">
                                    <span v-if="row.item.is_default == 1" class="badge bg-success">Yes</span>
                                    <span v-else class="badge bg-danger">No</span>
                                </template>

                                <template #cell(status)="row">
                                    <span class='badge bg-success' v-if="row.item.status == 1">Activated</span>
                                    <span class='badge bg-danger' v-if="row.item.status == 0">Deactivated</span>
                                </template>

                                <template #cell(actions)="row">
                                    <button class="btn btn-sm btn-primary" @click="edit_record = row.item" v-b-tooltip.hover :title="__('edit')" ><i class="fa fa-pencil-alt"></i></button>
                                    <button class="btn btn-sm btn-danger" @click="deleteRecord(row.index,row.item.id)" v-b-tooltip.hover :title="__('delete')"><i class="fa fa-trash"></i></button>
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
                                    <label>{{__('total_records')}} :- {{ totalRows }} </label>
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
                </div>
            </div>
        </div>

        <!-- Add / Edit -->
        <app-edit-record
            v-if="create_new || edit_record"
            :record="edit_record"
            @modalClose="hideModal()"
        ></app-edit-record>
    </div>

</template>
<script>

import EditRecord from './Edit.vue';
import axios from "axios";


export default {
    components: {
            'app-edit-record' : EditRecord,
    },
    data: function() {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'asc' },
                { key: 'name', label: __('name'),  class: 'text-center', sortable: true, sortDirection: 'asc' },
                { key: 'dial_code', label: __('dial_code'),  class: 'text-center' },
                { key: 'code', label: __('code'),  class: 'text-center' },
                { key: 'logo', label: __('logo'),  class: 'text-center' },
                { key: 'status', label: __('status'),  class: 'text-center', sortable: true, sortDirection: 'asc' },
                { key: 'actions', label: __('actions') }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: 'id',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,
            isLoading: false,
            sectionStyle : 'style_1',
            max_visible_units : 12,
            max_col_in_single_row : 3,
            countries: [],
            sortBySL: 'id',
            sortDescSL: false,
            sortDirectionSL: 'asc',
            isSystemRefreshing: false,
            create_new : null,
            edit_record : null,
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
        this.totalRows = this.languages.length
    },
    watch: {
        $route(to, from) {
            this.showCreateModal();
        }
    },
    created: function() {
        this.showCreateModal();
        this.$eventBus.$on('recordSaved', (message) => {
            this.showMessage('success', message);
            this.getRecords();
            this.create_new = null;
        });
        this.getRecords();
    },
    methods: {
        getRecords(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/countries',{
            }).then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.countries = data.data;
                    this.totalRows = this.countries.length
                }).catch(error => {
                vm.isLoading = false;
                if (error?.request?.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },
        deleteRecord(index, id){
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
                    axios.post(this.$apiUrl + '/countries/delete',postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            if (data.status === 1) {
                                // Find the index of the country in the array based on its id
                                const indexOfDeletedCountry = this.countries.findIndex(country => country.id === postData.id);

                                if (indexOfDeletedCountry !== -1) {
                                    // If the country is found in the array, remove it
                                    this.countries.splice(indexOfDeletedCountry, 1);
                                    this.showMessage('success', data.message);
                                } else {
                                    // Handle the case where the country is not found in the array
                                    console.error("Country not found in the array.");
                                }
                            } else {
                                this.showError(data.message);
                            }
                        }).catch(error => {
                        vm.isLoading = false;
                        if (error?.request?.statusText) {
                            this.showError(error.request.statusText);
                        }else if (error.message) {
                            this.showError(error.message);
                        } else {
                            this.showError("Something went wrong!");
                        }
                    });
                }
            });
        },

        showCreateModal(){
            let create = this.$route.params.create;
            if(create){
                this.create_new = true;
            }
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
            this.$router.push({path: '/countries'});
        },
    }
};
</script>
