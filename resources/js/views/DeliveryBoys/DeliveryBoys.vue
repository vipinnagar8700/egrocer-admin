<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('delivery_boys') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page"> {{ __('delivery_boys') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title"> {{ __('delivery_boys') }}</h4>
                        <span class="pull-right">
                            <router-link to="/delivery_boys/create" class="btn btn-primary" v-b-tooltip.hover  title="Add New Seller" v-if="$can('delivery_boy_create')">Add Delivery boys{{ __('add_delivery_boys') }}</router-link>

                        </span>
                    </div>
                    <div class="card-body">

                        <b-row class="mb-2">
                            <b-col md="3">

                                <div class="form-group">
                                    <h6 for="filterStatus"> {{ __('filter_delivery_boy_by_status') }}</h6>
                                    <select id="filterStatus" name="filterStatus" v-model="filterStatus" @change="getDeliveryBoys()" class="form-control form-select">
                                        <option value="">{{ __('all') }}</option>
                                        <option value="0">{{ __('registered') }}</option>
                                        <option value="1">{{ __('approved') }}</option>
                                        <option value="2">{{ __('not_approved') }}</option>
                                        <option value="3">{{ __('deactivate') }}</option>
                                        <option value="7">{{ __('removed') }}</option>
                                    </select>
                                </div>
                            </b-col>

                            <b-col md="3" offset-md="5">
                                <h6 class="box-title">{{ __('search') }}</h6>
                                <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    placeholder="Search"
                                ></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getDeliveryBoys()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>
                        <div class="table-responsive">
                        <b-table
                            :items="deliveryBoys"
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
                            <template #head(balance)="row">
                                {{ __('balance') }}{{' ('+$currency+')' }}
                            </template>
                            <template #head(cash_received)="row">
                               {{ __('cash_received') }} {{'('+$currency+')' }}
                            </template>

                            <template #cell(mobile)="row">
                                {{ row.item.mobile | mobileMask }}
                            </template>

                            <template #cell(bonus_percentage)="row">
                                <small :id="'bonus'+row.item.id" class="d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2">
                                    <i class="fa fa-info-circle"></i>
                                </small>
                                <b-popover :target="'bonus'+row.item.id" triggers="hover" placement="left">
                                    <template #title>
                                        {{ __('bonus_details') }}
                                    </template>
                                    <table class="table table-borderless">
                                        <tr>
                                            <th>{{ __('bonus_type') }}</th>
                                            <td class="text-end">{{ row.item.bonus_type === 1?"Commission":"Fixed/Salaried" }}</td>
                                        </tr>
                                       <tr v-if="row.item.bonus_type === 1">
                                            <th>{{ __('commission') }}</th>
                                            <td class="text-end">{{ row.item.bonus_percentage }}</td>
                                        </tr>
                                        <tr>
                                            <th>{{ __('min_amount') }} ({{ $currency }})</th>
                                            <td class="text-end">{{ row.item.bonus_min_amount }}</td>
                                        </tr>
                                        <tr>
                                            <th>{{ __('max_amount') }} ({{ $currency }})</th>
                                            <td class="text-end">{{ row.item.bonus_max_amount }}</td>
                                        </tr>
                                    </table>
                                </b-popover>
                                
                            </template>

                            <template #cell(status)="row">
                                <label v-if="row.item.status == 0" class='badge bg-primary'>{{ __('registered') }}</label>
                                <label v-else-if="row.item.status == 1" class='badge bg-success'>{{ __('active') }}</label>
                                <label v-else-if="row.item.status == 2" class='badge bg-warning'>{{ __('not_approved') }}</label>
                                <label v-else-if="row.item.status == 3" class='badge bg-danger'>{{ __('deactive') }}</label>
                                <label v-else-if="row.item.status == 7" class='badge bg-danger'>{{ __('removed') }}</label>
                            </template>

                            <template #cell(is_available)="row">
                                <span v-if="row.item.status == 1" class="badge bg-success">{{ __('yes') }}</span>
                                <span v-else class="badge bg-danger">{{ __('no') }}</span>
                            </template>

                            <template #cell(actions)="row">
                                <router-link :to="{ name: 'EditDeliveryBoy',params: { id: row.item.id, record : row.item }}" v-b-tooltip.hover title="Edit" class="btn btn-primary btn-sm" v-if="$can('seller_update')" v-b-tooltip.hover :title="__('edit')">
                                    <i class="fa fa-pencil-alt"></i>
                                </router-link>

                                <button class="btn btn-sm btn-danger" @click="deleteDeliveryBoys(row.index,row.item.id)" v-if="$can('delivery_boy_delete')" v-b-tooltip.hover :title="__('delete')"><i class="fa fa-trash"></i></button>
                            </template>

                        </b-table>
                        </div>
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
                { key: 'id', label:  __('id') , sortable: true, sortDirection: 'desc' },
                { key: 'name', label:  __('name') , sortable: true, class: 'text-center' },
                { key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center' },
                { key: 'address', label: __('address'), sortable: true,  class: 'text-center' },
                { key: 'bonus_percentage', label: __('bonus'), sortable: true, class: 'text-center' },
                { key: 'balance', label: __('balance'), sortable: true,  class: 'text-center' },
                { key: 'cash_received', label: __('cash_received'), sortable: true,  class: 'text-center' },
                { key: 'other_payment_information', sortable: true, label: __('other_payment_information'),  class: 'text-center' },
                { key: 'status', label: __('status'), sortable: true, class: 'text-center' },
                { key: 'is_available', label: __('available'),  class: 'text-center' },
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

            isLoading: false,
            sectionStyle : 'style_1',
            max_visible_units : 12,
            max_col_in_single_row : 3,
            create_new : null,
            edit_record : null,

            categories: null,
            products: null,

            deliveryBoys: [],

            filterStatus : ""
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
        this.totalRows = this.deliveryBoys.length
    },

    created: function() {
        this.$eventBus.$on('deliveryBoysSaved', (message) => {
            this.showMessage("success", message);
            this.getDeliveryBoys();
            this.create_new = null;
        });
        this.getDeliveryBoys();
    },
    methods: {
        getDeliveryBoys(){
            this.isLoading = true

            axios.get(this.$apiUrl + '/delivery_boys',{
                params: {
                    filterStatus: this.filterStatus
                }
            })
                .then((response) => {
                    this.isLoading = false
                    this.deliveryBoys = response.data.data;
                    this.totalRows = this.deliveryBoys.length
                });
        },
        deleteDeliveryBoys(index, id){
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
                    axios.post(this.$apiUrl + '/delivery_boys/delete',postData)
                        .then((response) => {
                            this.isLoading = false
                            this.deliveryBoys.splice(index, 1)
                            this.showMessage('success', response.data.message);
                        });
                }
            });
        },
   
        hideModal() {
            this.create_new = false
            this.edit_record = false
            this.$router.push({path: '/delivery_boys'});
        },
    }
};
</script>
