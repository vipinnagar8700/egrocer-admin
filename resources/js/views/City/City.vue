<template>

    <div>

        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('manage_citys_center_points_latitude_longitude') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('manage_cities') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">
                        <div class="card-header">
                            <h4>{{ __('manage_cities') }}</h4>
                            <span class="pull-right">
                                <router-link to="/cities/create" class="btn btn-primary" v-if="$can('city_create')">{{ __('add_new_city') }}</router-link>
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
                                        @keyup="addFilter"
                                    ></b-form-input>

                                </b-col>
                                <b-col md="1" class="text-center">
                                    <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getRecords()">
                                        <i class="fa fa-refresh" aria-hidden="true"></i>
                                    </button>
                                </b-col>
                            </b-row>
                            <div class="table-responsive">



                                <b-table
                                    id="my-table"
                                    ref="table"

                                    head-variant="unset"

                                    :items="cities"
                                    :fields="fields"
                                    :current-page="currentPage"
                                    :per-page="perPage"

                                    :filter="filter"
                                    :filter-included-fields="filterOn"
                                    :sort-by.sync="sortBy"
                                    :sort-desc.sync="sortDesc"
                                    :sort-direction="sortDirection"
                                    @sort-changed="getRecords"
                                    :bordered="true"
                                    :busy="isLoading"

                                    stacked="md"
                                    show-empty
                                    small
                                    empty-text="There are no cities to show"
                                    :key="cities.length"
                                >
                                    <template #table-busy>
                                        <div class="text-center text-black my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong>{{ __('loading') }}...</strong>
                                        </div>
                                    </template>
                                    <template #cell(actions)="row">
                                        <div style="width: 120px">
                                            <router-link
                                                :to="{ name: 'EditCity',params: { id: row.item.id, record : row.item }}"
                                                v-b-tooltip.hover :title="__('edit')" class="btn btn-sm btn-primary"
                                                v-if="$can('city_update')">
                                                <i class="fa fa-pencil-alt"></i>
                                            </router-link>
                                            <button class="btn btn-sm btn-danger" v-b-tooltip.hover :title="__('delete')"
                                                    @click="deleteRecord(row.index,row.item.id)"
                                                    v-if="$can('city_delete')">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </template>
                                </b-table>
                            </div>
                            <b-row>
                                <b-col md="2" class="my-1">
                                    <label>
                                        <b-form-group
                                            :label="__('per_page')"
                                            label-for="per-page-select"
                                            label-align-sm="right"
                                            label-size="sm"
                                            class="mb-0">
                                            <b-form-select
                                                id="per-page-select"
                                                v-model="perPage"
                                                @change = "addFilter"
                                                :options="pageOptions"
                                                size="sm"
                                                class="form-control form-select"
                                            ></b-form-select>
                                        </b-form-group>
                                    </label>
                                </b-col>

                                <b-col md="4" class="my-1" offset-md="6">
                                    <label>{{__('total_records')}}:- {{ totalRows }}</label>,

                                    <b-pagination
                                        v-if="totalRows > 0"
                                        @input = "getRecords"

                                        v-model="currentPage"
                                        :total-rows="totalRows"
                                        :per-page="perPage"

                                        aria-controls="my-table"
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

    </div>

</template>
<script>
import {VuejsDatatableFactory} from 'vuejs-datatable';
import axios from "axios";
import moment from "moment";

export default {
    components: {
        VuejsDatatableFactory,
    },
    data: function () {
        return {
            isLoading: false,

            fields: [
                {key: 'id', label: __('id'), sortable: true, sortDirection: 'desc'},
                {key: 'name', label: __('name'), sortable: true, sortDirection: 'desc'},
                {key: 'zone', label: __('zone'), sortable: true, sortDirection: 'desc'},
                {key: 'state', label: __('state'), sortable: true, sortDirection: 'desc'},
                {key: 'latitude', label: __('latitude'), sortable: true, sortDirection: 'desc'},
                {key: 'longitude', label: __('longitude'), sortable: true, sortDirection: 'desc'},
                {key: 'geolocation_type', label: __('geolocation_type'), sortable: true, sortDirection: 'desc'},
                {key: 'actions', label: __('actions')}
            ],

            totalRows: 1,

            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            offset: 0,

            sortBy: 'id',
            sortDesc: true,
            sortDirection: 'desc',

            filter: null,
            filterOn: [],

            cities: [],

        }
    },
    mounted() {
       

    },
    created: function () {
        this.getRecords();
    },
    methods: {

        addFilter(){
            this.cities = [];
            this.totalRows = 1;
            this.currentPage = 1;
            this.offset = 0;
            this.getRecords();
        },

        getRecords() {
            this.isLoading = true
            let vm = this;
            this.offset = this.perPage * (this.currentPage-1);

            let param = {
                search: this.filter,
                sort_by: this.sortBy,
                sort_dir: this.sortDirection,

                limit : this.perPage,
                offset : this.offset,
            }


            axios.get(this.$apiUrl + '/cities', {
                params: param
            }).then((response) => {
                    this.isLoading = false
                    let data = response.data;

                    if(data.data.cities.length>0) {
                        const uniqueCities = new Set([...this.cities, ...data.data.cities]);
                        this.cities = Array.from(uniqueCities);

                        this.cities = [...new Set(this.cities.map(JSON.stringify))].map(JSON.parse);

                    }

                    this.totalRows = data.data.total;

                }).catch(error => {
                vm.isLoading = false;
                if (error?.request?.statusText) {
                    this.showError(error?.request?.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },

        deleteRecord(index, id) {
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
                        id: id
                    }
                    axios.post(this.$apiUrl + '/cities/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.cities.splice(index, 1)
                            this.showMessage('success', data.message);
                        });
                }
            });
        },
    }
};
</script>
