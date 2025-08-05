<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('new_offers_for_customers') }} </h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('new_offers_for_customers') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title"> {{ __('new_offer_section') }}</h4>
                        <span class="pull-right">
                            <button class="btn btn-primary"  @click="create_new=true" v-if="$can('new_offer_image_create')"> {{ __('add_offer') }}</button>
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
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getOffers()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>
                        <b-table
                            :items="offers"
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
                            <template #cell(type)="row">
                                <p v-if="row.item.type ==='default'"> {{ __('default') }}</p>
                                <p v-if="row.item.type ==='category'"> {{ __('category') }}</p>
                                <p v-if="row.item.type ==='product'"> {{ __('product') }}</p>
                                <p v-if="row.item.type ==='offer_url'"> {{ __('offer_url') }}</p>
                            </template>
                            <template #cell(type_name)="row">
                                <a v-if="row.item.type ==='offer_url'" :href="row.item.offer_url" target="_blank" >LINK</a>
                                <p v-else> {{row.item.type_name }}</p>
                            </template>
                            <template #cell(position)="row">
                                <p v-if="row.item.position ==='below_slider'"> {{ __('below_slider') }}</p>
                                <p v-if="row.item.position ==='below_category'"> {{ __('below_category') }}</p>
                                <p v-if="row.item.position ==='below_section'"> {{ __('below_section') }}</p>
                                <p v-if="row.item.position ==='top'"> {{ __('top') }}</p>
                            </template>
                            <template #cell(section_position)="row">
                                <p v-if="row.item.position ==='below_section'"> {{row.item.section_title }}</p>
                            </template>
                            <template #cell(image)="row">
                                <p v-if="row.item.image ===''"> {{ __('no_image') }}</p>
                                <img :src="$storageUrl + row.item.image" height="50" v-else/>
                            </template>

                            <template #cell(actions)="row">
                                <button class="btn btn-sm btn-primary" @click="edit_record = row.item" v-if="$can('home_slider_image_update')" v-b-tooltip.hover :title="__('edit')"><i class="fa fa-pencil-alt"></i></button>
                                <button class="btn btn-sm btn-danger" @click="deleteOffer(row.index,row.item.id)" v-if="$can('new_offer_image_delete')" v-b-tooltip.hover :title="__('delete')"><i class="fa fa-trash"></i></button>
                                <button class="btn btn-sm btn-primary" @click="row.toggleDetails">
                                    <i v-if="row.detailsShowing" class="fa fa-eye-slash"></i>
                                    <i v-else class="fa fa-eye"></i>
                                </button>
                            </template>

                            <template #row-details="row">
                                <b-card>
                                    <ul>
                                        <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
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
            :sections="sections"
            :categories="categories"
            :products="products"
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
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                {key: 'type', label: __('type'), sortable: true, class: 'text-center'},
                {key: 'type_name', label: __('name'), sortable: true, class: 'text-center'},
                { key: 'image', label:  __('image'),  class: 'text-center' },
                { key: 'position', label:  __('position'),  class: 'text-center' },
                { key: 'section_position', label: __('select_position'),  class: 'text-center' },
                { key: 'actions', label:  __('actions') }
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
            offers:[],
            section:[],
            categories: [],
            products: [],
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
        this.totalRows = this.offers.length
    },
    watch: {
        $route(to, from) {
            this.showCreateModal();
        }
    },
    created: function() {
        this.showCreateModal();
        this.$eventBus.$on('offerSaved', (message) => {
            this.showMessage("success", message);
            this.getOffers();
            this.create_new = null;
        });
        this.getOffers();
        this.getCategories();
        this.getProducts();
    },
    methods: {
        getOffers(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/offers')
                .then((response) => {
                    this.isLoading = false
                    this.offers = response.data.data.offers;
                    this.sections = response.data.data.sections;
                    this.totalRows = this.offers.length
                });
        },
        getCategories() {
            this.isLoading = true
            let url = this.$apiUrl + '/categories';
            axios.get(url)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.categories = data.data
                });
        },
        getProducts() {

            this.isLoading = true
            let url = this.$apiUrl + '/products';
            axios.get(url)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.products = data.data.products
                });
        },
        deleteOffer(index, id){
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
                    axios.post(this.$apiUrl + '/offers/delete',postData)
                        .then((response) => {
                            this.isLoading = false
                            this.offers.splice(index, 1)
                            this.showMessage('success', response.data.message);
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
            this.$router.push({path: '/offers'});
        },
    }
};
</script>
