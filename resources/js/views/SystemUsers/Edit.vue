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
                    <label for='username'>Username <span class="text-danger text-xs">*</span></label>
                    <input type='text' id='username' v-model="system_user.username" class='form-control' placeholder='Username' required />
                </div>
                <div class="form-group">
                    <label for='email'>Email <span class="text-danger text-xs">*</span></label>
                    <input type='email' id='email' v-model="system_user.email" class='form-control' placeholder='Email' required />
                </div>

                <div class="form-group">
                    <label for='role'>Role <span class="text-danger text-xs">*</span></label>
                    <select class="form-control form-select" id="role" v-model="system_user.role_id">
                        <option value="">Select User Role</option>
                        <option v-for="role in roles" :value="role.id">{{role.name}}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for='password'>Password <span class="text-danger text-xs">*</span></label>
                    <div class="input-group">
                        <input :type="showPassword ? 'text' : 'password'" id='password' v-model="system_user.password" class='form-control' placeholder='Password' :required="!system_user.id ? true : false" />
                        <button type="button" v-on:click="showPassword = !showPassword" class="btn btn-primary font-bold">
                            <i v-if="showPassword" class="fa fa-eye-slash" aria-hidden="true"></i>
                            <i v-else class="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for='confirm_password'>Confirm Password <span class="text-danger text-xs">*</span></label>
                    <div class="input-group">
                        <input :type="showConfirmPassword ? 'text' : 'password'" id='confirm_password' v-model="system_user.confirm_password" class='form-control' placeholder='Confirm Password' :required="!system_user.id ? true : false" />
                        <button type="button" v-on:click="showConfirmPassword = !showConfirmPassword" class="btn btn-primary font-bold">
                            <i v-if="showConfirmPassword" class="fa fa-eye-slash" aria-hidden="true"></i>
                            <i v-else class="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <span class='text_hint' v-if="system_user.id">
                    Note : Leave it blank if you don't want to update it
                </span>
            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect'
export default {
    props: ['record','roles'],
    components: {
        Multiselect
    },
    created: function() {
    },
    data : function(){
        return {
            isLoading: false,
            showPassword: false,
            showConfirmPassword:false,
            system_user : {
                id: this.record ? this.record.id : null,
                username: this.record ? this.record.username : "",
                email: this.record ? this.record.email : "",
                role_id: this.record ? this.record.role.id : "",
                password: "",
                confirm_password: "",
            }

        };
    },
    computed: {
        modal_title: function(){
            let title = this.system_user.id ? "Edit" : "Create" ;
            title += " System User";
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
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;

            let url = this.$apiUrl + '/system_users/save'; 
            if(this.system_user.id){
                url = this.$apiUrl + '/system_users/update';
            }
            axios.post(url, this.system_user).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    vm.$eventBus.$emit('recordSaved', data.message);
                    vm.hideModal();
                }else{
                    vm.showMessage('error', data.message);
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
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
.text_hint{
    margin-top: 10px;
    margin-bottom: 10px;
    color: gray;
}
</style>
