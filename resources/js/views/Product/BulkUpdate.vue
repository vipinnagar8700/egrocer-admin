<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('bulk_update') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                           <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                {{ __('bulk_update') }}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">
                        <div class="card-header">
                            <h4>{{ __('product_bulk_update_form') }}</h4>
                        </div>
                        <div class="card-body">
                            <div class="alert alert-info">
                                <p>Always download and use new sample file if you did updated admin panel version.</p>
                                <p>Read and follow instructions carefully before proceed.</p>
                                <p><b>Instruction:</b></p>
                                -- Download Product Data file as CSV. <br/>
                                -- Change product name, price, stock relate information and update.
                            </div>
                            <div class="row">
                                <!-- form start -->
                                <form method="post" ref="my-form" @submit.prevent="saveRecord" enctype="multipart/form-data">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="upload_file">{{ __('csv_file') }}</label>
                                            <input type="file" name="upload_file" id="upload_file" v-on:change="handleFileUpload" ref="file_csv" class="form-control" required accept=".csv"/>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <button type="submit" class="btn btn-primary" id="submit_btn" name="btnAdd" :disabled="isLoading">
                                            <i class="fa fa-upload" v-if="!isLoading"></i> {{ __('update') }}
                                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                        </button>
                                        <button type="reset" class="btn btn btn-secondary">
                                            <i class="fa fa-undo" aria-hidden="true"></i> {{ __('clear') }}
                                        </button>
                                        <a @click="downloadProductDataExcel" v-b-tooltip.hover title="Download Excel" class="btn btn-info" :disabled="isLoadingDownload" >
                                            <template v-if="isLoadingDownload" >
                                                <b-spinner small label="Spinning"></b-spinner> Downloading...
                                            </template>
                                            <template v-else>
                                                <i class="fa fa-download"></i> {{ __('download_product_data_file') }}
                                            </template>
                                        </a>
                                    </div>
                                </form>
                                <!-- form end -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data: function () {
        return {
            isLoading: false,
            isLoadingDownload: false,
            sampleFileurl : this.$baseUrl + '/sample-file/products.csv',
            instructionsFileurl : this.$baseUrl + '/sample-file/products.txt',
            file: null,
        }
    },
    computed: {
        isSellerRoute() {
        // Use this.$route to access the current route
        return this.$route.path.startsWith('/seller/');
        },
    },
    created: function () {

    },
    mounted() {

    },
    methods: {
        handleFileUpload() {
            this.file = this.$refs.file_csv.files[0];
        },
        downloadProductDataExcel(){
            axios({
                url: this.$apiUrl + '/products/download_product_data_excel',
                method: 'get',
                responseType: 'blob',
               
            }).then((response) => {
                this.isLoadingDownload = false;
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'products_data.csv'); // Set the download file name
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
                this.isLoading = false;
            });
        },
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formData = new FormData();
            formData.append('file', this.file);
            let url = this.$apiUrl + '/products/bulk_update';
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                   
                    this.showMessage("success", data.message);
                    this.$refs.file_csv.value=null;
                    this.file = null;
                    vm.isLoading = false;
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        }
    }
};
</script>

