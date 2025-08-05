<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" scrollable no-close-on-backdrop no-fade static>
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">Save
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">Cancel</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group">
                    <label>Unit Name</label>
                    <input type="text" class="form-control" required v-model="name" placeholder="Enter unit name.">
                </div>
                <div class="form-group">
                    <label>Short Code</label>
                    <input type="text" class="form-control" required v-model="short_code" placeholder="Enter short code of unit name.">
                </div>
                <div class="form-group">
                    <label>Parent Unit</label>
                    <select class="form-control form-select" v-model="parent_id">
                        <option value="0">Main Unit</option>
                        <option v-for="unit in units" :value="unit.id">{{unit.name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Conversion</label>
                    <input type="number" class="form-control" v-model="conversion" placeholder="Enter Conversion." min="1" @input="validateConversion">
                    <span v-if="validationError" class="error">{{ validationError }}</span>
                </div>
            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form> 
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: ['record','units'],
    data : function(){
        return {
            isLoading: false,
            id: this.record ? this.record.id : null ,
            name: this.record ? this.record.name : null ,
            short_code: this.record ? this.record.short_code : null ,
            parent_id: this.record ? this.record.parent_id : 0 ,
            conversion: this.record ? this.record.conversion : null,
            validationError: null,
        };
    },
    computed: {
        modal_title: function(){
            let title = this.id ? "Edit" : "Add" ;
            title += " Unit";
            return title;
        },
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        validateConversion() {
            if (this.conversion < 1 ) {
                this.validationError = "Conversion must be greater than 0";
            } else {
                this.validationError = null;
            }
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
            formData.append('name', this.name);
            formData.append('short_code', this.short_code);
            formData.append('parent_id', this.parent_id);
            formData.append('conversion', this.conversion);
            let url = this.$apiUrl + '/units/save';
            if(this.id){
                url = this.$apiUrl + '/units/update';
            }
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                  
                    this.$eventBus.$emit('unitSaved', data.message);
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
                    this.showError("Something went wrong!");
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

</style>
