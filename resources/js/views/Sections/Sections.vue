<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('featured_section_to_show_product_exclusively') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('featured_section_to_show_product_exclusively') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">{{ __('featured_sections_of_app') }}</h4>
                        <span class="pull-right">
                            <button class="btn btn-primary"  @click="create_new=true" v-if="$can('featured_section_create')">{{ __('add_sections') }}</button>
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
                                    placeholder="Search"
                                ></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getSections()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>

                        </b-row>

                        <b-table
                            :items="sections"
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
                            <template #cell(style)="row">
    <div>
        <!-- App Style -->
        <div v-if="row.item.style_app">
            <strong>{{ __('App Style:') }}</strong>
            <img 
                v-if="row.item.style_app === 'style_1'"
                :src="$baseUrl + '/images/app_style/App_Style_1.jpg'" 
                alt="App Style 1" 
                height="70"
                @click="openLightbox($baseUrl + '/images/app_style/App_Style_1.jpg')"
            />
            <img 
                v-if="row.item.style_app === 'style_2'"
                :src="$baseUrl + '/images/app_style/App_Style_2.jpg'" 
                alt="App Style 2" 
                height="70"
                @click="openLightbox($baseUrl + '/images/app_style/App_Style_2.jpg')"
            />
            <img 
                v-if="row.item.style_app === 'style_3'"
                :src="$baseUrl + '/images/app_style/App_Style_3.jpg'" 
                alt="App Style 3" 
                height="70"
                @click="openLightbox($baseUrl + '/images/app_style/App_Style_3.jpg')"
            />
            <img 
                v-if="row.item.style_app === 'style_4'"
                :src="$baseUrl + '/images/app_style/App_Style_4.jpg'" 
                alt="App Style 4" 
                width="70"
                @click="openLightbox($baseUrl + '/images/app_style/App_Style_4.jpg')"
            />
            
            
            <FsLightbox :toggler="toggler" :sources="lightboxSources" 	:onClose="handleClose" 
                                    >  </FsLightbox>
            <br/><br/>
        </div>

        <!-- Web Style -->
        <div v-if="row.item.style_web">
            <strong>{{ __('Web Style:') }}</strong>
            <img 
                v-if="row.item.style_web === 'style_1'"
                :src="$baseUrl + '/images/web_style/Web_Style_1.jpg'" 
                alt="Web Style 1" 
                height="70"
                @click="openLightbox($baseUrl + '/images/web_style/Web_Style_1.jpg')"
            />
            <img 
                v-if="row.item.style_web === 'style_2'"
                :src="$baseUrl + '/images/web_style/Web_Style_1.jpg'" 
                alt="Web Style 2" 
                height="70"
                @click="openLightbox($baseUrl + '/images/web_style/Web_Style_2.jpg')"
            />
            <img 
                v-if="row.item.style_web === 'style_3'"
                :src="$baseUrl + '/images/web_style/Web_Style_1.jpg'" 
                alt="Web Style 3" 
                height="70"
                @click="openLightbox($baseUrl + '/images/web_style/Web_Style_3.jpg')"
            />
            <img 
                v-if="row.item.style_web === 'style_4'"
                :src="$baseUrl + '/images/web_style/Web_Style_1.jpg'" 
                alt="Web Style 4" 
                width="70"
                @click="openLightbox($baseUrl + '/images/web_style/Web_Style_4.jpg')"
            />
        </div>
    </div>
</template>

                             <template #cell(product_type)="row">
                                 {{ row.item.product_type }}
                                <div v-if="row.item.product_type === 'custom_products'">
                                    <strong>{{ __('product_ids') }} : </strong> {{ row.item.product_ids }}
                                </div>
                             </template>

                            <template #cell(image)="row">
                                <p v-if="row.item.image ===''">{{ __('no_image') }}</p>
                                <img :src="$storageUrl + row.item.image" height="50" v-else/>
                            </template>
                            <template #cell(actions)="row">
                                <!--<router-link :to="`/subcategories/${row.item.id}`" class="btn btn-primary">View Subcategories</router-link>-->
                                <button class="btn btn-sm btn-primary" @click="edit_record = row.item" v-if="$can('featured_section_update')" v-b-tooltip.hover :title="__('edit')"><i class="fa fa-pencil-alt"></i></button>
                                <button class="btn btn-sm btn-danger" @click="deleteSection(row.index,row.item.id)" v-if="$can('featured_section_delete')" v-b-tooltip.hover :title="__('delete')"><i class="fa fa-trash"></i></button>
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
            @modalClose="hideModal()"
        ></app-edit-record>
    </div>
</template>
<script>
import EditRecord from './Edit';
import FsLightbox from "fslightbox-vue";
export default {
    components: {
        'app-edit-record' : EditRecord,
        FsLightbox,
    },
    data: function() {
        return {
            fields: [
                { key: 'id', label:  __('id') , sortable: true, sortDirection: 'desc' },
                { key: 'title', label: __('title'), sortable: true, class: 'text-center' },
                { key: 'short_description', label: __('short_description'), sortable: true, class: 'text-center' },
                { key: 'style', label: 'Style',  class: 'text-center' },
                { key: 'product_type', label: __('product_type'),  class: 'text-center' },
                { key: 'category_ids', label: __('category_ids'),  class: 'text-center' },
                { key: 'position', label: __('position'),  class: 'text-center' },
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
            sections: [],
            toggler: false,
            lightboxSources: [],
            slide: 1,
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
        this.totalRows = this.sections.length
    },
    watch: {
        $route(to, from) {
            this.showCreateModal();
        }
    },
    created: function() {
        this.showCreateModal();
        this.$eventBus.$on('sectionSaved', (message) => {
            this.showMessage("success", message);
            this.getSections();
            this.create_new = null;
        });
        this.getSections();
    },
    methods: {
         openLightbox(image) {
     
      this.lightboxSources = [image];
      this.toggler = !this.toggler;
    },
     handleClose() {
        this.lightboxSources = null;
      this.toggler = false;
      
    },
        getSections(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/sections')
                .then((response) => {
                    this.isLoading = false
                    this.sections = response.data.data;
                    this.totalRows = this.sections.length
                }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        deleteSection(index, id){
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
                    axios.post(this.$apiUrl + '/sections/delete',postData)
                        .then((response) => {
                            this.isLoading = false
                            this.sections.splice(index, 1)
                            this.showMessage('success', response.data.message);
                        }).catch(error => {
                        this.isLoading = false;
                        if (error.request.statusText) {
                            this.showMessage('error', error.request.statusText);
                        }else if (error.message) {
                            this.showMessage('error', error.message);
                        } else {
                            this.showMessage('error', __('something_went_wrong'));
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
            this.$router.push({path: '/sections'});
        },
    }
};
</script>
