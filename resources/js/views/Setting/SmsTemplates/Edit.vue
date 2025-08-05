<template>
   <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" no-fade static>
      <div slot="modal-footer">
         <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">
            {{ __('save') }}
            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
         </b-button>
         <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
      </div>
      <form ref="my-form" @submit.prevent="saveRecord">
         <div class="row">
            <div class="form-group">
               <label>{{ __('title') }}</label>
               <input type="text" class="form-control" required v-model="title">
            </div>
            <div class="form-group">
               <label>{{ __('message') }}</label>
               <input type="text" class="form-control" required v-model="message">
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
       data: function(){
           return {
               isLoading: false,
               id: this.record ? this.record.id : null,
               title: this.record ? this.record.title : '',
               message: this.record ? this.record.message : '',
           };
       },
       computed: {
           modal_title: function(){
               let title = __('edit');
               title += " ";
               title += __('sms_template');
               return title;
           },
       },
       methods: {
           showModal() {
               this.$refs['my-modal'].show();
           },
           hideModal() {
               this.$refs['my-modal'].hide();
           },
           saveRecord: function(){
            let vm = this;
               this.isLoading = true;

               let formData = new FormData();
               if(this.id) {
                   formData.append('id', this.id);
               }
               formData.append('title', this.title);
               formData.append('message', this.message);

               let url = this.$apiUrl + '/sms_templates/update';

               axios.post(url, formData, {
                   headers: {
                       'Content-Type': 'multipart/form-data'
                   }
               }).then(res => {
                   let data = res.data;
                   
                   if (data.status === 1) {
                       this.$eventBus.$emit('SmsTemplatesSaved', data.message);
                       this.hideModal();
                   } else {
                       this.showError(data.message);
                       this.isLoading = false;
                   }
               }).catch(error => {
                   this.isLoading = false;
                   if (error.request.statusText) {
                       this.showError(error.request.statusText);
                   } else if (error.message) {
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
