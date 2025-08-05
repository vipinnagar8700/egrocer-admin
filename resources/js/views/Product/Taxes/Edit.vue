<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" scrollable no-close-on-backdrop no-fade static>
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group">
                    <label>{{ __('title') }}</label>
                    <input type="text" class="form-control" v-model="title" :placeholder="__('enter_tax_title')">
                </div>
                <div class="form-group">
                    <label>{{ __('percentage') }}</label>
                    <input type="number" class="form-control" v-model="percentage" placeholder="10.00"  min="1" max="100" @input="validatePercentage" step="0.01">
                    <span v-if="validationError" class="error">{{ validationError }}</span>
                </div>
                <div class="form-group" v-if="id">
                    <label>{{ __('status') }}</label>
                    <div class="col-md-9 text-left mt-1">
                        <b-form-radio-group
                            v-model="status"
                            :options="[
                                { text: ' Deactivated', 'value': 0 },
                                { text: ' Activated', 'value': 1 },
                            ]"
                            buttons
                            button-variant="outline-primary"
                            required
                        ></b-form-radio-group>
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
    props: ['record'],
    data: function () {
        return {
            isLoading: false,
            id: this.record ? this.record.id : null,
            title: this.record ? this.record.title : null,
            percentage: this.record ? this.record.percentage : null,
            status: this.record ? this.record.status : null,
            validationError: null,
        };
    },
    computed: {
        modal_title: function () {
            let title = this.id ? __('edit_tax') : __('add_tax');
            return title;
        },
    },
    created: function () {

    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        validatePercentage() {
            if (this.percentage < 0.1 || this.percentage > 100) {
                this.validationError = "Percentage must be between 1 and 100.";
            } else {
                this.validationError = null;
            }
        },
        saveRecord: function () {
            let vm = this;
            this.isLoading = true;

            let formData = new FormData();
            if (this.id) {
                formData.append('id', this.id);
            }
            formData.append('title', this.title);
            formData.append('percentage', this.percentage);
            formData.append('status', this.status);

            let url = this.$apiUrl + '/products/taxes/save';
            if (this.id) {
                url = this.$apiUrl + '/products/taxes/update';
            }

            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('recordSaved', data.message);
                    this.hideModal();
                } else {
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
    mounted() {
        this.showModal();
    }
}
</script>

<style scoped>

.image_preview {
    margin-top: 5px;
}
</style>
