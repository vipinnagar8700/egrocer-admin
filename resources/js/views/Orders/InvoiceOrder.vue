<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>Invoice</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                             <li class="breadcrumb-item" v-else-if="isDeliveryBoyRoute">
                                <router-link to="/delivery_boy/">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>

                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/orders">View Order</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else-if="isDeliveryBoyRoute">
                                <router-link to="/delivery_boy/orders">View Order</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/orders">View Order</router-link>
                            </li>

                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link :to="'/seller/orders/view/'+id">Order Details</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else-if="isDeliveryBoyRoute">
                                <router-link :to="'/delivery_boy/orders/view/'+id">Order Details</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link :to="'/orders/view/'+id">Order Details</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Invoice</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">
                        <div class="card-header">
                            <h4>Invoice</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <section class="invoice" id="printMe" v-html="invoice">

                                    </section>
                                </div>
                            </div>

                        </div>
                        <div class="card-footer">
                            <button type="button" v-print="'#printMe'"  v-b-tooltip.hover title="Print" class="btn btn-sm btn-secondary" ><i class="fa fa-print"></i> Print</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import print from 'vue-print-nb'
export default {
    directives: {
        print
    },
    data: function () {
        return {
            id: null,
            invoice:""
        }
    },
    computed: {
        isSellerRoute() {
        // Use this.$route to access the current route
        return this.$route.path.startsWith('/seller/');
        }, 
        isDeliveryBoyRoute() {
      // Use this.$route to access the current route
      return this.$route.path.startsWith('/delivery_boy/');
    },
    },
    
    created: function () {
        this.id = this.$route.params.id;
        
        if (this.id) {
            this.getInvoice();
        }
    },
    filters: {
        moment: function (date) {
            
            return moment(date).format('D-MMMM-YYYY, h:mm:ss A');
        }
    },
    methods: {
        moment: function () {
            return moment();
        },
        getInvoice(){
            this.isLoading = true
            let param = {
                "order_id": this.id,
            }
            axios.get(this.$apiUrl + '/orders/invoice/', {
                params: param
            })
            .then((response) => {
                this.isLoading = false
                let data = response.data;
                if (data.status === 1) {
                    this.invoice = response.data.data;
                } else {
                    this.showError(data.message);
                    setTimeout(() => {
                        //this.$router.push('/login');
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
                    this.showError(__('something_went_wrong'));
                }
            });
        },
    }
};
</script>
<style scoped>
@page {
    size: auto;
    margin: 0mm;
}

.borderless td,
.heading th {
    border: none !important;
    padding: 0px !important;
}

address {
    margin-bottom: 1px;
    font-style: normal;
    line-height: 1.42857143;
}

p {
    margin: 0 0 0px;
}

.invoice {
    position: relative;
    background: #fff;
    border: 1px solid #f4f4f4;
    padding: 20px;
    margin: 10px 25px
}
.invoice-title {
    margin-top: 0
}

.well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05)
}
.well blockquote {
    border-color: #ddd;
    border-color: rgba(0, 0, 0, .15)
}
.well-lg {
    padding: 24px;
    border-radius: 6px
}
.well-sm {
    padding: 9px;
    border-radius: 3px
}


</style>
