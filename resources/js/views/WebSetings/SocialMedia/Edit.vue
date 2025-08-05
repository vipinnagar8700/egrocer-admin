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
                    <label for="icon">Icon</label>
                    <select name="icon" id="icon" v-model="socialMedia.icon" class="form-control form-select social_media" >
                        <option value="">Select Icon</option>
                        <option value="fab fa-facebook"> Facebook</option>
                        <option value="fab fa-linkedin"> LinkedIn</option>
                        <option value="fab fa-instagram"> Instagram</option>
                        <option value="fab fa-x-twitter"> Twitter</option>
                        <option value="fab fa-whatsapp"> Whatsapp</option>
                        <option value="fab fa-youtube"> Youtube</option>
                        <option value="fab fa-qq"> QQ</option>
                        <option value="fab fa-weixin"> WeChat</option>
                        <option value="fab fa-tumblr"> Tumblr</option>
                        <option value="fab fa-google-plus"> Google+</option>
                        <option value="fab fa-skype">  Skype</option>
                        <option value='fab fa-flickr'> fa-flickr</option>
                        <option value="fab fa-pinterest"> Pinterest</option>
                        <option value="fab fa-reddit"> Reddit</option>
                        <option value="fab fa-foursquare"> Foursquare</option>
                        <option value="fab fa-renren">  Renren</option>
                        <option value="fab fa-delicious"> Delicious </option>
                    </select>
                </div>
                <div class="form-group ">
                    <label for="link">Link</label>
                    <input type="url" name="link" id="link" v-model="socialMedia.link" placeholder="link" class="form-control">
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
    data : function(){
        return {
            isLoading: false,
            socialMedia:{
                id: this.record ? this.record.id : null ,
                icon: this.record ? this.record.icon : "" ,
                link: this.record ? this.record.link : "" ,
            },
        };
    },
    computed: {
        modal_title: function(){
            let title = this.socialMedia.id ? "Edit" : "Add" ;
            title += " Social Media";
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
            let formObject = this.socialMedia;
            let formData = new FormData();
            for(let key in formObject){
                formData.append(key, formObject[key]);
            }
            let url = this.$apiUrl + '/social_media/save';
            if(this.socialMedia.id){
                url = this.$apiUrl + '/social_media/update';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('socialMediaSaved', data.message);
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
