<template>

    <div>

        <div class="page-heading">
            <div class="row">
            <div class="col-12 col-md-6 order-md-1 order-last">
                <h3>{{ __('manage_sms_templates') }}</h3>
            </div>
            <div class="col-12 col-md-6 order-md-2 order-first">
                <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('manage_sms_templates') }}</li>
                    </ol>
                </nav>
            </div>
        </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">
                        
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
                                    <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getSmsTemplates()">
                                        <i class="fa fa-refresh" aria-hidden="true"></i>
                                    </button>
                                </b-col>

                            </b-row>
                            <b-table
                                :items="sms_templates"
                                :fields="fields"
                               
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
                                <template #cell(updated_at)="row">
                                    {{ new Date(row.item.updated_at).toLocaleString()  }}
                                </template>
                               
                                <template #cell(actions)="row">
                                    <button class="btn btn-sm btn-primary" @click="edit_record = row.item" v-if="$can('category_update')" v-b-tooltip.hover :title="__('edit')"><i class="fa fa-pencil-alt"></i></button>
                                </template>

                            </b-table>
                            <b-row>
                            <b-col  md="2" class="my-1">
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
                                            :options="pageOptions"
                                            size="sm"
                                            class="form-control form-select"
                                        ></b-form-select>
                                    </b-form-group>
                                </label>
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
            v-if="edit_record"
            :record="edit_record"
            @modalClose="edit_record = null"
        ></app-edit-record>
    </div>

</template>
<script>

import EditRecord from './Edit.vue';
export default {
    components: {
        'app-edit-record' : EditRecord,
    },
    data: function() {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-left', sortable: true, sortDirection: 'desc',thStyle: { width: '5%' }  },
                { key: 'type', label: __('type'), class: 'text-left', sortable: true,thStyle: { width: '20%' }  },
                { key: 'message', label: __('message'), class: 'text-left', sortable: true,thStyle: { width: '50%' }  },
                { key: 'updated_at', label: __('last_update'),  class: 'text-left',thStyle: { width: '15%' }  },
                { key: 'actions', label: __('actions'), class: 'text-center', thStyle: { width: '10%' } }
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
            sms_templates: [],
            isLoading: false,
            edit_record : null,
            settingModalShow:false
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
        },
    },
    mounted() {

    },
    watch: {
        currentPage() {
            this.getSmsTemplates();
        },
        perPage() {
            this.getSmsTemplates();
        }
    },
    created: function() {
        this.$eventBus.$on('SmsTemplatesSaved', (message) => {
            this.showMessage("success", message);
            this.getSmsTemplates();
            this.create_new = null;
        });
        this.getSmsTemplates(); 
    },
    methods: {

        getSmsTemplates(){

            this.isLoading = true
            const params = {
                offset: this.currentPage,
                limit: this.perPage,
                filter: this.filter
            };
            axios.get(this.$apiUrl + '/sms_templates', { params })
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.sms_templates = data.data
                    this.totalRows = data.total
                });
        }

    }
};
</script>
