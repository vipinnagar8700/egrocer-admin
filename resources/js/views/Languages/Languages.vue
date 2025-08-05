<template>

    <div>

        <div class="page-heading">
            <div class="row">
            <div class="col-12 col-md-6 order-md-1 order-last">
                <h3>{{ __('manage_languages') }}</h3>
            </div>
            <div class="col-12 col-md-6 order-md-2 order-first">
                <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('manage_languages') }}</li>
                    </ol>
                </nav>
            </div>
        </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">

                        <div class="card-header">
                            <h4>{{ __('languages') }}</h4>
                            <span class="pull-right">


                                <button v-if="supported_languages.length == 0" :disabled="isSystemRefreshing" class="btn btn-info" @click="supportedLanguageSeeder">
                                    <b-spinner v-if="isSystemRefreshing" small label="Spinning"></b-spinner> Add default supported languages
                                </button>
                                <button v-else class="btn btn-primary" @click="showSupportedLanguages = true">{{ __('supported_languages_list') }}</button>

                                <b-modal v-model="showSupportedLanguages" size="lg" :title="__('supported_languages_list')" scrollable no-close-on-backdrop no-fade static>
                                    <b-container fluid>
                                        <b-row class="mb-2">
                                            <b-col md="4" offset-md="8">
                                                <h6 class="box-title">{{ __('search') }}</h6>
                                                <b-form-input
                                                    id="filter-input"
                                                    v-model="filterSL"
                                                    type="search"
                                                    :placeholder="__('search')"
                                                ></b-form-input>
                                            </b-col>
                                        </b-row>

                                            <b-table sticky-header
                                                hover stacked="md"
                                                show-empty
                                                small
                                                :bordered="true"
                                                :items="supported_languages"
                                                :fields="supported_languages_fields"
                                                :filter="filterSL"
                                                :sort-by.sync="sortBySL"
                                                :sort-desc.sync="sortDescSL"
                                                :sort-direction="sortDirectionSL"
                                            >

                                            </b-table>

                                    </b-container>
                                    <template #modal-footer>
                                        <b-button variant="danger" size="sm" class="float-right" @click="showSupportedLanguages=false">Close
                                        </b-button>
                                    </template>
                                </b-modal>

                                <router-link to="/languages/create" class="btn btn-primary" v-b-tooltip.hover  :title="__('add_language')">{{ __('add_language') }}</router-link>
                            </span>
                        </div>

                        <div class="card-body">
                            <b-row class="mb-2">

                                <b-col md="3">
                                    <h6 class="box-title" for="seller">{{ __('system_type') }}</h6>
                                    <select name="seller" id="seller" v-model="system_type" @change="getRecords()" class="form-control form-select">
                                        <option value="">{{ __('all_system_types') }}</option>
                                        <option v-for="system_type in system_types" :value="system_type.id">{{system_type.name}}</option>
                                    </select>
                                </b-col>

                                <b-col md="3" offset-md="5">
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
                                :items="languages"
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

                                    <button class="btn btn-sm btn-info" @click="downloadJSON(row.item)" v-b-tooltip.hover :title="__('download')"><i class="fa fa-download"></i></button>

                                    <button class="btn btn-sm btn-secondary" @click="row.toggleDetails">
                                        <i v-if="row.detailsShowing" class="fa fa-eye-slash"></i>
                                        <i v-else class="fa fa-eye"></i>
                                    </button>

                                </template>

                                <template #row-details="row">
                                    <b-card title="This your json contant." header-tag="header">
                                        <template #header>
                                            <span class="pull-right">
                                                <b-button size="sm" variant="danger" @click="row.toggleDetails"><i class="fa fa-times"></i></b-button>
                                            </span>
                                        </template>

                                        <ul class="list-group" style="max-height: 300px; overflow-y: scroll;">
                                            <li class="list-group-item" v-for="(value, key) in convertInJsonData(row.item.json_data)" :key="key">
                                                <strong>{{ key }}</strong> :- {{ value }}
                                            </li>
                                        </ul>
                                    </b-card>
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
            :system_types = "system_types"
            :supported_languages="supported_languages"
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
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'),  class: 'text-center' },
                { key: 'code', label: __('code'),  class: 'text-center' },
                { key: 'type', label: __('type'),  class: 'text-center' },
                { key: 'system_type_name', label: __('system_type'),  class: 'text-center' },
                { key: 'is_default', label: __('default'),  class: 'text-center' },
                { key: 'status', label: __('status'),  class: 'text-center' },
                { key: 'actions', label: __('actions') }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: 'id',
            sortDesc: true,
            sortDirection: 'desc',
            filter: null,
            filterOn: [],
            page: 1,

            isLoading: false,
            sectionStyle : 'style_1',
            max_visible_units : 12,
            max_col_in_single_row : 3,

            languages: [],
            system_types: [],
            system_type:"",
            supported_languages: [],
            supported_languages_fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'asc' },
                { key: 'name', label: __('name'),  class: 'text-center' },
                { key: 'code', label: __('code'),  class: 'text-center' },
                { key: 'type', label: __('type'),  class: 'text-center' }
            ],
            sortBySL: 'id',
            sortDescSL: false,
            sortDirectionSL: 'asc',
            filterSL: null,
            showSupportedLanguages: false,
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
        this.getSupportedLanguages();
    },
    methods: {

        getRecords(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/languages',{
                params: {
                    system_type: this.system_type
                }
            }).then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.languages = data.data;
                    this.totalRows = this.languages.length
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
        getSupportedLanguages(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/languages/supported_languages')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;

                    this.system_types = data.data.system_types;
                    this.system_types = this.system_types; // this line is remove System type admin panel.

                    this.supported_languages = data.data.supported_languages;
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
        supportedLanguageSeeder(){

            let vm = this;

            vm.isSystemRefreshing = true;
            axios.get(this.$baseUrl + '/supported_language')
                .then((response) => {
                    let data = response.data;
                    if (data.status === 1) {

                        setTimeout( () => {
                            vm.showMessage("success", data.message);
                            vm.isSystemRefreshing = false;

                            this.getSupportedLanguages();
                            this.getRecords();

                            window.location.reload();
                        }, 2000);

                    } else {
                        vm.showError(data.message);
                        vm.isSystemRefreshing = false;
                    }
                }).catch(error => {
                vm.isSystemRefreshing = false;
                if (error?.request?.statusText) {
                    vm.showError(error.request.statusText);
                }else if (error.message) {
                    vm.showError(error.message);
                } else {
                    vm.showError(__('something_went_wrong'));
                }
            });
        },
        downloadJSON(row){
            const data = this.convertInJsonData(row.json_data);

            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = row.code+'.json';
            link.click();

            // Clean up the object URL
            URL.revokeObjectURL(url);
        },

        convertInJsonData(data){
            data = JSON.parse(data);
            if(Array.isArray(data)){
                data = data[0];
            }
            return data;
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
                    axios.post(this.$apiUrl + '/languages/delete',postData)
                        .then((response) => {
                            this.isLoading = false

                            let data = response.data;


                            if (data.status === 1) {
                             this.getRecords();
                                this.showMessage('success', data.message);
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
            this.$router.push({path: '/languages'});
        },
    }
};
</script>
