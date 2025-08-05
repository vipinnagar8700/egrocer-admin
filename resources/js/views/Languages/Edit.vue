<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" size="lg" scrollable no-close-on-backdrop no-fade static>
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">



            <div class="row">
                <div class="form-group">
                    <label for="seller">{{ __('system_type') }}</label>
                    <select name="seller" id="seller" v-model="system_type" class="form-control form-select">
                        <option value="">{{ __('select_system_type') }}</option>
                        <option v-for="item in system_types" :value="item.id">{{item.name}}</option>
                    </select>
                </div>

                <div class="form-group col-md-6">
                    <label for="supported_language">{{ __('supported_language') }}</label>
                    <select name="supported_language" id="supported_language" v-model="supported_language"  class="form-control form-select">
                        <option value="">{{ __('select_supported_language') }}</option>
                        <option v-for="item in supported_languages" :value="item.id">{{item.name}}</option>
                    </select>
                </div>

                <div class="form-group col-md-6">
                    <label for="display_name">{{ __('display_name') }} (Display in app/web)</label>
                    <input name="display_name" id="display_name" v-model="display_name"  class="form-control">
                </div>

                <div class="form-group">
                    <label for="json_file">{{ __('json_file') }}</label>
                    <span v-if="error" class="error">{{ error }}</span>
                    <input type="file" name="json_file" id="json_file" accept="application/json" v-on:change="handleFileUpload" ref="json_file" class="form-control">
                </div>

                <div class="form-group" v-if="json_data">
                    <label for="json_data">{{ __('json_data') }}</label>
                    <textarea readonly class="form-control" rows="10" v-model="json_data" name="json_data" id="json_data">{{ json_data }}</textarea>
                </div>
                <div class="form-group">
                    <input name="is_default" id="is_default" v-model="is_default" true-value="1" false-value="0" :checked="is_default" type="checkbox" class="form-check-input">
                    <label for="is_default">{{ __('set_as_a_default_language') }}</label>
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
    props: ['record','system_types','supported_languages'],
    data: function () {
        return {
            isLoading: false,

            id: this.record ? this.record.id : null,
            system_type:this.record ? this.record.system_type : "",
            supported_language:this.record ? this.record.supported_language_id : "",
            display_name:this.record ? this.record.display_name : "",
            json_file: "" ,
            json_data: this.record ? this.record.json_data : "",
            is_default: this.record ? this.record.is_default : 0,
            status: this.record ? this.record.status : 1,
            error: null,
        };
    },
    computed: {
        modal_title: function () {
            let title = this.id ? __('edit_language') : __('add_language');
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

        handleFileUpload() {
            
            this.json_file = this.$refs.json_file.files[0];

            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const jsonData = JSON.parse(reader.result);
                    this.json_data = JSON.stringify(jsonData);
                    this.error = "";
                } catch (error) {
                    this.error = "Invalid JSON file. Please upload a valid JSON file.";
                    this.json_data = "";
                    event.target.value = ""; // Clear the file input
                }
            };
            reader.readAsText(this.json_file);
        },
        saveRecord: function () {

            let vm = this;
            this.isLoading = true;
            let formData = new FormData();
            if (this.id) {
                formData.append('id', this.id);
            }
            formData.append('system_type', this.system_type);
            formData.append('supported_language', this.supported_language);
            formData.append('display_name', this.display_name);
            formData.append('json_data', this.json_data);
            formData.append('is_default', this.is_default);
            formData.append('status', this.status);

            let url = this.$apiUrl + '/languages/save';
            if (this.id) {
                url = this.$apiUrl + '/languages/update';
            }

            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('recordSaved', data.message);
                    vm.$router.push({path: '/languages'});
                    this.hideModal();
                } else {
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error?.request?.statusText) {
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
