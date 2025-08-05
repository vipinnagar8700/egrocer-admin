<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('product_ratings') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('product_ratings') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">
                        <div class="card-header">
                            <h4>{{ __('product_ratings_list') }}</h4>
                        </div>
                        <div class="card-body">
                            <b-row class="mb-2">
                                <b-col md="3">
                                    <h6 class="box-title">{{ __('products') }}</h6>
                                    <form method="post">
                                        <select  @change="getRecords()" v-model="product_id" class="form-control form-select">
                                            <option value="">{{ __('select_product') }}</option>
                                            <option v-for="product in products" :value="product.id">
                                                {{ product.name }}
                                            </option>
                                        </select>
                                    </form>
                                    <span class="text-danger d-block font-size-13">{{ __('select_a_product_for_update_product_rating_list') }}</span>
                                </b-col>
                            </b-row>

                           

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
                                    <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getProductRatings()">
                                        <i class="fa fa-refresh" aria-hidden="true"></i> 
                                    </button>
                                </b-col>

                            </b-row>
                            <b-table
                                :items="ratings"
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

                                 <template #cell(rate)="row">
                                    <!-- Use the renderStarRating method to display the star rating -->
                                    {{ renderStarRating(row.item.rate) }}
                                </template>

                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>
                                <template #cell(updated_at)="row">
                                    {{ new Date(row.item.updated_at).toLocaleString()  }}
                                </template>
                               <template #cell(images)="row">
                                    <a v-for="(image, index) in row.item.images" :key="index" >
                                    <img class="images_border" :src="image.image_url" alt="Image" height="50">
                                    </a>
                                    
                                    <FsLightbox :toggler="toggler" :sources="lightboxSource" :onClose="handleClose" ></FsLightbox>
                                </template>
                                <template #cell(status)="row">
                                    <span class='badge bg-success' v-if="row.item.status == 1">Activated</span>
                                    <span class='badge bg-danger' v-if="row.item.status == 0">Deactivated</span>
                                </template>
                                <template #cell(actions)="row">
                              
                                    <button class="btn btn-sm btn-primary" @click="edit_record = row.item"  v-b-tooltip.hover :title="__('edit')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-sm btn-danger" @click="deleteDietary(row.index,row.item.id)"  v-b-tooltip.hover :title="__('delete')"><i class="fa fa-trash"></i></button>
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
                                <label>Total Ratings :- {{totalRows}}   , </label>
                                 <label>Average Rating: {{ calculateAverageRating().toFixed(2) }}</label>
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

                            <template v-if="list.length==0 && product_id>0">
                                <span>{{ __('no_ratings_foundddd') }}</span>
                            </template>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable';
import axios from "axios";
import FsLightbox from "fslightbox-vue";
export default {
    components: {
        draggable,
         FsLightbox,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'user.name', label: __('user'),  class: 'text-center' },
                { key: 'rate', label: __('rate'), class: 'text-center', sortable: true },
                { key: 'review', label: __('review'),  class: 'text-center' },
                { key: 'images', label: __('image'),  class: 'text-center' }, 
                { key: 'updated_at', label: __('date'),  class: 'text-center' },
                
            ],
            totalRows: 0,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: 'id',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,
            ratings: [],
            list: [],
            editable: true,
            isDragging: false,
            delayedDragging: false,
            isLoading: false,
            products: [], 
            product_id:this.id !== undefined ? this.id : "",
            
             lightboxSource: [],  // array to store sources for each row
     toggler: false,
      activeImageIndex: 0,
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: !this.editable,
                ghostClass: "ghost"
            };
        },
        listString() {
            return JSON.stringify(this.list, null, 2);
        },
        list2String() {
            return JSON.stringify(this.list2, null, 2);
        }
    },
    watch: {
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
        }
    },
    mounted() { 
     
        $(document).on('click', '[data-toggle="lightbox"]', function(event) {
      event.preventDefault();
      $(this).ekkoLightbox();
    });

    },
    created: function () {
        this.id = this.$route.params.id;
        this.getProducts();
        this.getRecords();
    },
 
    methods: {
       openLightbox(image) {
      // Populate lightboxSources with the image URLs
      this.lightboxSource = [image];
      // Open the lightbox at the selected index
     this.toggler = !this.toggler;
    },
    handleClose(rowIndex) {
      this.lightboxSource[rowIndex] = null;  // Close lightbox for the specific row
    },
        calculateAverageRating() {
    if (this.ratings.length === 0) {
      return 0; // Return 0 if there are no ratings to avoid division by zero
    }

    const totalRatings = this.ratings.reduce((total, rating) => total + rating.rate, 0);
    const averageRating = totalRatings / this.ratings.length;

    return averageRating;
  },
         renderStarRating(rate) {
       const totalStars = 5;
    const filledStars = rate;
    const blankStars = totalStars - filledStars;

    const starIconFilled = '⭐️';
    const starIconBlank = '☆';

    const ratingString = starIconFilled.repeat(filledStars) + starIconBlank.repeat(blankStars);

    return ratingString;
    },
  

      getRecords() {
            this.isLoading = true;
            this.product_id  = this.product_id !== "" ? this.product_id : this.id;
            let param = {
               "product_id": this.product_id
            }
           
            axios.get(this.$baseUrl + '/customer/products/ratings_list', {
                params: param
            }).then((response) => {
                this.isLoading = false;
                this.ratings = response.data.data.rating_list;
                this.totalRows = this.ratings.length
            });
        },
    
       
        getProducts() {
            axios.get(this.$apiUrl + '/products/active')
                .then((response) => {
                    this.products = response.data.data;
                });
        },
    }
};
</script>
<style scoped>
.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}
</style>
<style>
/* Add some basic styling to the lightbox */
#lightbox {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 999;
}

#lightbox-content {
  position: relative;
  max-width: 80%;
  max-height: 80%;
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
}
</style>
