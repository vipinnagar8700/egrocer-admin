<template>

    <div>

        <div class="page-heading">
            <div class="row">
            <div class="col-12 col-md-6 order-md-1 order-last">
                <h3>Sub Categories</h3>
            </div>
            <div class="col-12 col-md-6 order-md-2 order-first">
                <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link to="/dashboard">Dashboard</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">Sub Categories</li>
                    </ol>
                </nav>
            </div>
        </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">

                        <div class="card-header">
                            <h4>Sub Categories</h4>
                            <span class="pull-right">
                                <button class="btn btn-primary"  @click="edit_record=true">Add New Sub Category</button>
                            </span>
                        </div>

                        <div class="card-body">

                            <table class="table mt-10">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Main Category</th>
                                        <th>Name</th>
                                        <th>Subtitle</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(category,index) of subcategories">
                                        <td>{{ category.id }}</td>
                                        <td>{{ category.category.name }}</td>
                                        <td>{{ category.name }}</td>
                                        <td>{{ category.subtitle }}</td>
                                        <td>
                                            <img :src="category.image_url" height="50" />
                                        </td>
                                        <td>
                                            <button class="btn btn-primary">View Products</button>
                                            <button class="btn btn-secondary" @click="edit_record = category">Edit</button>
                                            <button class="btn btn-danger" @click="deleteCategory(index,category.id)">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add / Edit -->
        <app-edit-record
            v-if="edit_record"
            :record="edit_record"
            :categories="categories"
            @modalClose="edit_record = null"
        ></app-edit-record>
    </div>

</template>
<script>
import { VuejsDatatableFactory } from 'vuejs-datatable';
import EditRecord from './Edit.vue';


export default {
    components: {
            VuejsDatatableFactory,
            'app-edit-record' : EditRecord,
    },
    data: function() {
        return {

            columns: [
                {label: 'id', field: 'id'},
                {label: 'Main Category', field: 'name', headerClass: 'class-in-header second-class'},
                {label: 'Name', field: 'name', headerClass: 'class-in-header second-class'},
                {label: 'Subtitle', field: 'subtitle'},
                {label: 'Image', field: 'name'},
                {label: 'Action', field: 'name'},
            ],
            page: 1,

            categories: [],
            subcategories: [],
            isLoading: false,
            sectionStyle : 'style_1',
            max_visible_categories : 12,
            max_col_in_single_row : 3,
            edit_record : null,
            category_id : null
        }
    },
    created: function() {
        this.category_id = this.$route.params.id;

        this.$eventBus.$on('categorySaved', (message) => {
            this.showMessage('success', message);
            this.getSubCategories();

        });
        this.getSubCategories();
        this.getCategories();

    },
    methods: {
        getCategories(){

            this.isLoading = true
            axios.get(this.$apiUrl + '/categories')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.categories = data.data
                });
        },

        getSubCategories(){

            this.isLoading = true

            let url = this.$apiUrl + '/subcategories';
            if(this.category_id){
                url = this.$apiUrl + '/subcategories/' + this.category_id;
            }
            axios.get(url)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.subcategories = data.data
                });
        },

        deleteCategory(index, id){
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
                    axios.post(this.$apiUrl + '/subcategories/delete',postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.categories.splice(index, 1)
                            this.showSuccess(data.message)
                        });
                }
            });
        },
    }
};
</script>
