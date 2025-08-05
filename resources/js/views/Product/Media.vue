<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('media') }}</h3>
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
                                <li class="breadcrumb-item active" aria-current="page">{{ __('media') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">{{ __('media_upload_form') }}</h4>
                    </div>
                    <div class="card-body">
                        <b-row>
                            <div class="col-md-12">
                                <form method="POST" enctype="multipart/form-data">
                                    <vue-dropzone
                                        ref="myVueDropzone"
                                        id="dropzone"
                                        :options="dropzoneOptions"
                                        :useCustomSlot="true"
                                        v-on:vdropzone-success="uploadSuccess"
                                    >
                                        <div class="dropzone-custom-content">
                                            <h3 class="dropzone-custom-title"><i class="fa fa-upload"></i> {{ __('drag_and_drop_to_upload_image') }}</h3>
                                            <div class="subtitle">{{__('or_click_to_select_a_image_from_your_device')}}</div>
                                        </div>
                                    </vue-dropzone>
                                    <button type="button" :disabled="submitBtn === true" @click="uploadImage()" class="btn btn-primary mt-2">
                                        <i class="fa fa-upload" v-if="!isLoading"></i> {{ __('upload') }}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </button>
                                </form>
                            </div>
                        </b-row>

                        <b-row class="mb-2">
                            <h4 class="card-title mt-3">{{ __('media_list')}}</h4>
                            <b-col md="1" class="text-center">
                                <b-dropdown size="sm" dropright :text="__('actions')" split-variant="outline-primary"
                                            variant="primary" :disabled="selectedItems.length === 0" class="mt-3">
                                    <b-dropdown-item href="javascript:void(0);" @click="multipleDelete"><span
                                        class="text-danger" style="font-weight: bold;"><i class="fa fa-trash"></i> {{ __('delete_selected_media') }}</span>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </b-col>
                            <b-col md="3" offset-md="7">
                                <h6 class="box-title">{{ __('search') }}</h6>
                                <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    :placeholder="__('search')"
                                ></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getMedia()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>
                        <div class="table-responsive">
                            <b-table
                                :items="media"
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

                                <template #head(select)="row">
                                    <input type="checkbox" v-model="all_select" @click="allSelectCheckBox"
                                           class="form-check-input">
                                </template>
                                <template #cell(select)="row">
                                    <input type="checkbox" v-model="selectedItems" @change="selectCheckBox"
                                           :value="`${row.item.id}`" class="form-check-input">
                                </template>

                                <template #cell(image)="row">
                                    <img :src="$storageUrl + row.item.sub_directory + row.item.name" height="50"
                                         v-if="row.item.name"/>
                                </template>
                                <template #cell(actions)="row">
                                    <button type="button" class="btn btn-sm btn-primary"
                                            v-clipboard="() => row.item.sub_directory + row.item.name"
                                            @click="copyPath(row.item.id)">
                                        <span v-if="!copies.includes(row.item.id)">
                                            {{ __('copy') }}
                                        </span>
                                        <span v-if="copies.includes(row.item.id)">Copied!</span>
                                    </button>
                                    <button type="button" class="btn btn-sm btn-danger"
                                            @click="deleteMedia(row.index,row.item.id)">
                                        {{ __('delete') }}
                                    </button>
                                </template>

                            </b-table>
                        </div>
                        <b-row>
                            <b-col md="2" class="my-1">
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
                            <b-col md="4" class="my-1" offset-md="6">
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
    </div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone';
import axios from "axios";
import Auth from '../../Auth.js';

export default {
    components: {
        vueDropzone: vue2Dropzone
    },
    data: function () {
        return {
            login_user: Auth.user,
            seller_id:0,

            dropzoneOptions: {
                url: this.$apiUrl + '/media/save',
                thumbnailWidth: 175,
                maxFilesize: 0.5,
                addRemoveLinks: true,
                paramName: "files",
                autoProcessQueue: false,
                parallelUploads: 10,
                autoDiscover: false,
                dictResponseError: 'Error',
                uploadMultiple: true,
                headers: {"My-Awesome-Header": "header value", "Authorization": 'Bearer ' +Auth.token},
                acceptedFiles: 'image/jpeg,image/png,image/jpg,image/gif,image/webp', // Specify allowed image formats
                dictFileTooBig: 'File is too big ({{filesize}}MB). Max file size: {{maxFilesize}}MB.', // Custom error message for file size
                dictInvalidFileType: 'Invalid file type. Only JPG and PNG files are allowed.', // Custom error message for file type
            },
            submitBtn: false,
            fields: [
                {key: 'select', label: ''},
                {key: 'id', label: __('id'), sortable: true, sortDirection: 'desc'},
                {key: 'image', label: __('image'), sortable: true, class: 'text-center'},
                {key: 'name', label: __('name'), sortable: true, class: 'text-center'},
                {key: 'extension', label: __('extension'), sortable: true, class: 'text-center'},
                {key: 'type', label: __('type'), sortable: true, class: 'text-center'},
                {key: 'sub_directory', label: __('sub_directory'), sortable: true, class: 'text-center'},
                {key: 'size', label: __('size'), sortable: true, class: 'text-center'},
                {key: 'seller_name', label: __('seller_name'), sortable: true, class: 'text-center'},
                {key: 'actions', label: __('actions')}
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
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            media: [],
            copyIcon: true,
            copies: [],
            selectedItems: [],
            all_select: false,
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return {text: f.label, value: f.key}
                })
        },
        isSellerRoute() {
        // Use this.$route to access the current route
        return this.$route.path.startsWith('/seller/');
        },
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.media.length
    },
    created: function () {
        if(this.$roleSeller == this.login_user.role.name){
            this.seller_id = this.login_user.seller.id;
        } else {
            this.seller_id = 0;
        }
        this.getMedia();
    },
    methods: {
        getMedia() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/media')
                .then((response) => {
                    this.media = response.data.data;
                    this.totalRows = this.media.length;
                    this.isLoading = false;
                });
        },
        uploadImage() {
            let uploadFiles = this.$refs.myVueDropzone.getQueuedFiles();
            this.isLoading = true;
            if (uploadFiles.length === 0) {
                this.isLoading = false;
                this.showError("Select at list one image!");
            }
            if (uploadFiles.length > 10) {
                this.isLoading = false;
                this.showError("You can upload 10 medias file at a time");
                return false;
            }
            this.$refs.myVueDropzone.processQueue();
        },
        uploadSuccess(file, response) {
            if (response.status === 1) {
                this.getMedia();
                this.isLoading = false;
                this.showMessage("success", response.message);
                setTimeout(() => {
                    this.$refs.myVueDropzone.removeAllFiles();
                }, 3000)
            } else {
                this.isLoading = false;
                this.showError(response.message);
            }
        },
        deleteMedia(index, id) {
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
                    axios.post(this.$apiUrl + '/media/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.media.splice(index, 1)
                            this.showMessage('success', response.data.message);
                        });
                }
            });
        },
        copyPath(id) {
            this.copies.push(id);
        },

        allSelectCheckBox() {
            if (this.all_select == false) {
                this.all_select = true
                this.media.forEach(media => {
                    this.selectedItems.push(media.id)
                });
            } else {
                this.all_select = false
                this.selectedItems = []
            }
        },
        selectCheckBox() {
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            if (this.media.length === uniqueSelectedItems.length) {
                this.all_select = true
            } else {
                this.all_select = false
            }
        },
        multipleDelete() {
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            if (uniqueSelectedItems.length !== 0) {
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
                        let ids = uniqueSelectedItems.toString();
                        this.isLoading = true
                        let postData = {
                            ids: ids
                        }
                        axios.post(this.$apiUrl + '/media/multiple_delete', postData)
                            .then((response) => {
                                this.isLoading = false
                                let data = response.data;
                                this.getMedia();
                                this.selectedItems = [];
                                this.all_select = false;
                                this.showMessage("success", data.message);

                            });
                    }
                });
            } else {
                this.showWarning("Select at least one record!");
            }
        }
    }
};
</script>

<style scoped>
@import "../../../../node_modules/vue2-dropzone/dist/vue2Dropzone.min.css";
</style>
