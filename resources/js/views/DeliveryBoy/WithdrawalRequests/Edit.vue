<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" no-fade static>
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading || (graterAmount === true) || (validationError !== null) ">Save
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">Cancel</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group">
                    <label for="balance">Balance</label>
                    <input type="number" name="balance" id="balance" v-model="balance" class="form-control" step="any" readonly>
                </div>
                <div class="form-group">
                    <label for="amount">Amount</label>
                    <input type="number" name="amount" id="amount" v-model="withdrawalRequests.amount" v-on:keyup="checkAmount" required class="form-control" placeholder="Enter Transfer Amount"  @input="validateAmount" step="any">
                    <span class="text-danger" v-if="graterAmount === true">{{ __('requested_amount_should_not_greater_then_available_balance') }}</span>
                    <span v-if="validationError" class="error">{{ validationError }}</span>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea name="message" id="message" v-model="withdrawalRequests.message" class="form-control" rows="3" placeholder="Enter Message." required ></textarea>
                </div>
            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';
import Auth from '../../../Auth.js';

export default {
    props: ['record','balance'],
    
    data : function(){
        return {
            isLoading: false,
            graterAmount:false,
            login_user: Auth.user,
            balance:null,
            withdrawalRequests:{
                id: this.record ? this.record.id : null,
                type: "delivery_boy" ,
                type_id:Auth.user.id,
                amount: this.record ? this.record.amount : "" ,
                message: this.record ? this.record.message : "" ,
               
            },
              validationError: null,

        };
    },
    computed: {
        modal_title: function(){
            let title = this.id ? "Edit" : "Add" ;
            title += " Withdraw Request";
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
         validateAmount() {
            if (this.withdrawalRequests.amount < 0.01 ) {
                this.validationError =  __('requested_amount_should_equal_or_greater_then') + ' '+ this.$currency+'0.01';
            } else {
                this.validationError = null;
            }
        },
       
        checkAmount(){
            if(((this.withdrawalRequests.amount) > (this.balance))){
                this.graterAmount = true;
            }else{
                this.graterAmount = false;
            }
        },
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formObject = this.withdrawalRequests;
            let formData = new FormData();
            for(let key in formObject){
                if (key === 'customer'){
                    formData.append(key, JSON.stringify(formObject[key]));
                }
                else{
                    formData.append(key, formObject[key]);
                }
            }
            let url = this.$apiUrl + '/withdrawal_requests/add';
            if(this.withdrawalRequests.id){
                url = this.$apiUrl + '/withdrawal_requests/update';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('withdrawalRequestsSaved', data.message);
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
@import "../../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>
