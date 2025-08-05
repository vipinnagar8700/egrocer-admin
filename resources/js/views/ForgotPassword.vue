<template>
    <div class="auth">
        <div class="auth" :style="{ backgroundImage: 'url('+ $panelLoginBackgroundImg + ')' }">
            <div class="auth-section">
                <div class="auth-back">
                    <router-link to="/login"><span class="fa fa-arrow-left"></span></router-link>
                </div>
                <div class="auth-card">
                    <div class="auth-logo">
                        <a href="javascript:void(0)" style="display: flex; align-items: center; justify-content: flex-start;">
                            <img v-if="$appLogo != ''" :src="$storageUrl+$appLogo" style="height: 70px; width: 70px;" alt='Logo'/>
                            <img v-else :src="$baseUrl + '/images/logo.png'" style="height: 70px; width: 70px;" alt='Logo'/>
                            <h2 style="margin: 10px;">{{ $appName }}</h2>
                        </a>
                    </div>
                    <h4>Reset Your</h4>
                    <h4>Password here!</h4>
                    <form @submit.prevent="forgetPasswordSendMail()">
                        <div class="form-group position-relative has-icon-left mb-4">
                            <input type="email" class="form-control form-control-xl" placeholder="Email Address" v-model="user.email" required>
                            <div class="form-control-icon">
                                <i class="bi bi-person"></i>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5 auth-btn">
                            Reset Password
                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                        </button>
                    </form>
                    <div class="auth-copyright">
                        <a href="javascript:void(0)" class="text-primary font-weight-normal"> {{ $copyrightDetails }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Auth from '../Auth.js';

export default {
    data: function () {
        return {
            isLoading: false,
            user: {
                email: '',
            },
            loggedUser: Auth.user,
            setting:""
        };
    },

    mounted() {
        if (this.loggedUser) {
            this.$router.push('/dashboard');
        }
    },
    methods: {
        forgetPasswordSendMail: function () {
            let vm = this;
            this.isLoading = true;
            let url = this.$apiUrl + '/forget-password';
            axios.post(url, this.user).then(res => {
                vm.isLoading = false;
                let data = res.data;

                if (data.status === 1) {
                    this.user.email = '';
                    vm.showMessage("success", data.message);
                } else {
                    vm.showError(data.message);
                }

            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else {
                    if (error.request.statusText) {
                        this.showError(error.request.statusText);
                    }else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError(__('something_went_wrong'));
                    }
                }
            });
        }
    }
}
</script>
<style scoped>

</style>
