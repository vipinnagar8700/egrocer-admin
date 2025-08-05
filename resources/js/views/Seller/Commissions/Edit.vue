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
                <div class="col-md-1"><h6 class="modal-title">ID</h6></div>
                <div class="col-md-2"><h6 class="modal-title">Category Name</h6></div>
                <div class="col-md-9">
                    <h6 class="modal-title">Commission(%)
                        <br><small>[Keep blank if you want to apply global Commission for particular category]</small></h6>
                </div>
            </div>
            <template v-for="sellerCommission in sellerCommissions">
                <div class="row mt-1">
                    <div class="col-md-1">
                        {{ sellerCommission.category_id }}
                    </div>
                    <div class="col-md-2">
                        {{ sellerCommission.category_name }}
                    </div>
                    <div class="col-md-9">
                        <input type="number" class="form-control" v-model="sellerCommission.commission" :placeholder="'Enter Commission of '+sellerCommission.category_name">
                    </div>
                </div>
            </template>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: ['record'],
    data : function(){
        return {
            isLoading: false,
            sellerCommissions : null
        };
    },
    created: function () {
        this.getSellerCommissions();
    },
    computed: {
        modal_title: function(){
            return "Set Category Wise Saller Commission";
        },
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        getSellerCommissions(){
            this.isLoading = true
            let seller_id = (this.record.seller_id)?this.record.seller_id:this.record.id;
            axios.get(this.$apiUrl + '/seller_commissions/formData/'+seller_id)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.sellerCommissions = data.data
                });
        },
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formData = this.sellerCommissions;
            let url = this.$apiUrl + '/seller_commissions/save';
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('commissionsSaved', data.message);
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
