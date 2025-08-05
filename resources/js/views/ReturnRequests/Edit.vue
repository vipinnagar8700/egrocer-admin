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
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="status">Status</label><br>
                        <div id="status" class="btn-group">
                            <label class="btn btn-warning" data-toggle-class="btn-warning" data-toggle-passive-class="btn-default">
                                <input type="radio" v-model="returnRequest.status" value="1" class="form-check-input"> Pending
                            </label>
                            <label class="btn btn-success" data-toggle-class="btn-success" data-toggle-passive-class="btn-default">
                                <input type="radio" v-model="returnRequest.status" value="2" class="form-check-input"> Approve
                            </label>
                            <label class="btn btn-danger" data-toggle-class="btn-danger" data-toggle-passive-class="btn-default">
                                <input type="radio" v-model="returnRequest.status" value="3" class="form-check-input"> Reject
                            </label>
                        </div>
                    </div>

                    <input type="hidden" v-model="returnRequest.order_id">

                    <div class="form-group" v-if="returnRequest.status == 2">
                        <label for="assign delivery boy">Assign Delivery Boy</label>
                        <form class="row g-3 align-items-center" ref="my-form">
                            <div class="input-group">
                                <label class="visually-hidden" for="delivery_boy_id">Delivery Boy</label>
                                <select id="delivery_boy_id" name="delivery_boy_id" class="form-control form-select" v-model="returnRequest.delivery_boy_id" required>
                                    <option value="">Select Delivery Boy</option>
                                    <option v-for="boy in deliveryBoys" :value="boy.id">{{ boy.name }}</option>
                                </select>
                            </div>
                        </form>
                    </div> 
                </div>
                    <div class="form-group">
                        <label for="remark">Remark</label>
                        <textarea name="remark" id="remark" v-model="returnRequest.remark" class="form-control" placeholder="Enter Remark">
                        </textarea>
                    </div>
            </div>
            <button ref="dummy_submit" style="display:none;" ></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';
import Auth from '../../Auth.js';

export default {
    props: ['record'],
    data : function(){
        return {
            isLoading: false,
            login_user: Auth.user,
              deliveryBoys:'',
            delivery_boy_id:'',
            returnRequest:{
                id: this.record ? this.record.id : null ,
                status: this.record ? this.record.status : "" ,
                order_id: this.record ? this.record.order_id : "" ,
                delivery_boy_id:  this.record ? this.record.delivery_boy_id : 0 ,
                remark: this.record ? this.record.remarks : "" ,
            },
           
        };
    },
    computed: {
        modal_title: function(){
            let title = this.returnRequest.id ? "Edit" : "Add" ;
            title += " Return Request";
            return title;
        },
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show();
            this.getOrder();
           
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },

        getOrder() {
            this.isLoading = true
         
            axios.get(this.$apiUrl + '/orders/view/' + this.record.order_id)
                .then((response) => {
              
                    this.isLoading = false
                    let data = response.data;
                    if (data.status === 1) {
                        this.deliveryBoys = response.data.data.deliveryBoys;
                    } else {
                        this.showError(data.message);
                        setTimeout(() => {
                            this.$router.back();
                        }, 1000);
                    }
                }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },

        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formObject = this.returnRequest;
            let formData = new FormData();
            for(let key in formObject){
                formData.append(key, formObject[key]);
            }
            
            let url = this.$apiUrl + '/return_requests/save';
            if(this.returnRequest.id){
                url = this.$apiUrl + '/return_requests/update';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('returnRequestSaved', data.message);
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
