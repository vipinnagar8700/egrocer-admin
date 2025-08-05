<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" no-fade static>
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">Save
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">Cancel</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">

                    <div class="form-group">
                        <label>Main Category</label>
                        <select class="form-control" v-model="category_id">
                            <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Sub Category Name</label>
                        <input type="text" class="form-control" required v-model="name">
                    </div>
                    <div class="form-group">
                        <label>Sub Category Subtitle</label>
                        <input type="text" class="form-control" required v-model="subtitle">
                    </div>

                    <div class="form-group">
                        <label>Image</label>
                        <p class="text-muted">Please choose square image of larger than 350px*350px &amp; smaller than 550px*550px.</p>
                        <input type="file" name="category_image" accept="image/*" v-on:change="handleFileUpload" ref="file_image" required v-if="!id">
                        <input type="file" name="category_image" accept="image/*" v-on:change="handleFileUpload" ref="file_image" v-if="id">

                        <div class="image_preview" v-if="id">
                            <img :src="image" height="100" />
                        </div>
                    </div>

            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: ['record','categories'],
    data : function(){
        return {
            isLoading: false,
            id: this.record ? this.record.id : null ,
            name: this.record ? this.record.name : null ,
            subtitle: this.record ? this.record.subtitle : null ,
            image: this.record ? this.record.image_url : null ,
            category_id: 1,
        };
    },
    computed: {
        modal_title: function(){
            let title = this.id ? "Edit" : "Add" ;
            title += " Sub Category";
            return title;
        },
    },
    created: function() {
        if(this.categories.length>0){
            this.category_id = this.categories[0].id
        }
        if(this.record){
            this.category_id = this.record.category_id
        }
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        handleFileUpload() {
            this.image = this.$refs.file_image.files[0];
        },
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formData = new FormData();
            if(this.id) {
                formData.append('id', this.id);
            }
            formData.append('category_id', this.category_id);
            formData.append('name', this.name);
            formData.append('subtitle', this.subtitle);
            formData.append('image', this.image);

            let url = this.$apiUrl + '/subcategories/save';
            if(this.id){
                url = this.$apiUrl + '/subcategories/update';
            }

            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {

                    this.$eventBus.$emit('categorySaved', data.message);
                    this.hideModal();
                   
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
                    this.showError(__('something_went_wrong'));
                }
            });
        }
    },
    mounted(){
        this.showModal();
    }
}
</script>

<style scoped>

.image_preview{
    margin-top: 5px;
}
</style>
