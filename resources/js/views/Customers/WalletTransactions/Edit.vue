<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" no-fade static>
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading || (graterAmount === true) ">Save
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">Cancel</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group">
                    <label>Customer</label>
                    <multiselect v-model="walletTransaction.customer"
                                 :options="customers"
                                 @close="checkAmount"
                                 placeholder="Select & Search Customer"
                                 label="name"
                                 track-by="name" required>
                        <template slot="singleLabel" slot-scope="props">
                            <span class="option__desc">
                                <span class="option__title">{{ props.option.name }}</span>
                            </span>
                        </template>
                        <template slot="option" slot-scope="props">
                            <div class="option__desc">
                                <span class="option__title">{{ props.option.name }}</span>,
                                <span class="option__small">Balance:- {{ props.option.balance }}</span>
                            </div>
                        </template>
                    </multiselect>
                    <div class="border border-grey rounded p-2 mt-2" v-if="walletTransaction.customer">
                        <div class="d-flex justify-content-between align-items-center text-left">
                            <span>Name:-</span><span> {{ walletTransaction.customer.name }}</span>
                            <span>Mobile:-</span><span> {{ walletTransaction.customer.mobile }}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center text-left">
                            <span>Id:-</span><span> {{ walletTransaction.customer.id }}</span>
                            <span>Balance:-</span><span> {{ walletTransaction.customer.balance }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="type">Type</label>
                    <input type="text" name="type" id="type" v-model="walletTransaction.type" class="form-control" value="Credit" readonly disabled />
                </div>
                <div class="form-group">
                    <label for="amount">Amount</label>
                    <input type="number" name="amount" id="amount" v-model="walletTransaction.amount" v-on:keyup="checkAmount" required class="form-control" placeholder="Enter Transfer Amount" min="1" step="0.01"  @input="validateAmount">
                    <span class="text-danger" v-if="graterAmount === true">You Can not enter amount greater than balance.</span>
                    <span v-if="validationError" class="error">{{ validationError }}</span>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea name="message" id="message" v-model="walletTransaction.message" class="form-control" rows="3" placeholder="Enter Message." required ></textarea>
                </div>
            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect'
export default {
    props: ['record','customers'],
    components: {
        Multiselect
    },
    data : function(){
        return {
            isLoading: false,
            graterAmount:false,
            walletTransaction:{
                id: this.record ? this.record.id : null ,
                customer:null,
                type: "credit" ,
                amount: this.record ? this.record.amount : "" ,
                message: this.record ? this.record.message : "" ,
                validationError: null,
            },

        };
    },
    computed: {
        modal_title: function(){
            let title = this.id ? "Edit" : "Add" ;
            title += " Wallet Transaction";
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
            if (this.walletTransaction.amount < 1 ) {
                this.validationError = "Amount must be greater than 0";
            } else {
                this.validationError = null;
            }
        },
        
        checkAmount(){
            if((this.walletTransaction.type === 'debit') && (parseInt(this.walletTransaction.amount) > parseInt(this.walletTransaction.customer.balance))){
                this.graterAmount = true;
            }else{
                this.graterAmount = false;
            }
        },
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formObject = this.walletTransaction;
            let formData = new FormData();
            for(let key in formObject){
                if (key === 'customer'){
                    formData.append(key, JSON.stringify(formObject[key]));
                }
                else{
                    formData.append(key, formObject[key]);
                }
            }
            let url = this.$apiUrl + '/wallet_transactions/save';
            if(this.walletTransaction.id){
                url = this.$apiUrl + '/wallet_transactions/update';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('walletTransactionsSaved', data.message);
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
