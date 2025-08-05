<template>
  <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" size="lg" scrollable no-close-on-backdrop no-fade static>
    <div slot="modal-footer">
      <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading || (Number(this.minimum_order_amount) < Number(this.discount))">
        {{ __('save') }}
        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
      </b-button>
      <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
    </div>
    <form ref="my-form" @submit.prevent="saveRecord">

        <div v-if="discount_type === 'amount' && Number(this.minimum_order_amount) < Number(this.discount)" class="alert alert-light-danger color-danger alert-dismissible fade show" role="alert">
            <strong><i class="bi bi-exclamation-triangle"></i>  {{ __('error') }}</strong>
             {{ __('discount_is_grater_than_minimun_order_amount') }}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>


      <div class="row">
        <label><span class="text-danger text-xs">*</span> {{__('required_fields')}}</label>
        <div class="divider mt-0"><div class="divider-text"> {{ __('promo_code_form') }}</div></div>
        <div class="form-group col-md-6">
          <label> {{ __('promo_code') }}<i class="text-danger">*</i></label>
          <input type="text" class="form-control" v-model="promo_code" placeholder="Enter promo code." />
        </div>
        <div class="form-group col-md-6">
          <label> {{ __('message') }}<i class="text-danger">*</i></label>
          <input type="text" class="form-control" v-model="message" placeholder="Enter message." />
        </div>

        <div class="form-group col-md-6">
          <label>{{ __('start_date') }}<i class="text-danger">*</i></label>
          <input type="date" class="form-control" v-model="start_date" placeholder="Enter start date." @input="validateStartDate"/>
          <span v-if="validationStartDateError" class="error">{{ validationStartDateError }}</span>
        </div>
        <div class="form-group col-md-6">
          <label> {{ __('end_date') }}<i class="text-danger">*</i></label>
          <input type="date" class="form-control" v-model="end_date" placeholder="Enter end date." @input="validateEndDate" />
          <span v-if="validationEndDateError" class="error">{{ validationEndDateError }}</span>
        </div>

        <div class="form-group col-md-6">
          <label>{{ __('no_of_users') }}<i class="text-danger">*</i></label>
          <input type="number" step="1" class="form-control" v-model="no_of_users" placeholder="Enter no. of users" @input="validateNoOfUsers"/>
          <span v-if="validationNoOfUsersError" class="error">{{ validationNoOfUsersError }}</span>
        </div>
        <div class="form-group col-md-6">
          <label>{{ __('minimum_order_amount') }}<i class="text-danger">*</i></label>
          <input type="number" min="0" step="0.01" class="form-control" v-model="minimum_order_amount" placeholder="Enter minimum order amount." />
        </div>


        <div class="form-group col-md-6">
          <label> {{ __('discount_type') }}<i class="text-danger">*</i></label>
          <select class="form-control form-select" v-model="discount_type">
            <option value="">{{ __('select_discount_type') }}</option>
            <option value="percentage"> {{ __('percentage') }}</option>
            <option value="amount"> {{ __('amount') }}</option>
          </select>
        </div>

          <div class="form-group col-md-6" v-if="discount_type != '' ">
              <label> {{ __('discount') }}<i class="text-danger">*</i></label>
              <input type="number" required min="0.01" max="100" step="0.01" class="form-control" v-if="discount_type == 'percentage'" v-model="discount" placeholder="Enter discount percentage." @input="validateDiscountPercentage"/>
              <input type="number" required min="0" step="0.01" class="form-control" v-if="discount_type == 'amount'" v-model="discount" placeholder="Enter discount amount." />
              <p v-if="discountPercentagevalidationError" class="error">{{ discountPercentagevalidationError }}</p>
          </div>

        <div class="form-group col-md-6" v-if="discount_type == 'percentage'">
          <label> {{ __('max_discount_amount') }}<i class="text-danger">*</i></label>
          <input type="number" class="form-control" v-model="max_discount_amount" placeholder="Enter max discount amount." @input="validateMaxDiscountAmount"/>
          <span v-if="validationMaxDiscountAmountError" class="error">{{ validationMaxDiscountAmountError }}</span>
        </div>
        <div class="form-group col-md-6">
          <label> {{ __('repeat_usage') }}<i class="text-danger">*</i></label>
          <select class="form-control form-select" v-model="repeat_usage">
            <option value=""> {{ __('select') }}</option>
            <option value="1">{{ __('allowed') }}</option>
            <option value="0">{{ __('not_allowed') }}</option>
          </select>
        </div>

        <div class="form-group col-md-6" v-if="repeat_usage === 1 || repeat_usage === '1'">
          <label> {{ __('no_of_repeat_usage') }}<i class="text-danger">*</i></label>
          <input type="number" min="0" step="1" class="form-control" required v-model="no_of_repeat_usage" placeholder="Enter no. of repeat user" />
          <span class="text text-primary font-size-13">{{ __('set_0_if_you_want_ro_remove_limit') }}</span>
        </div>
          <div class="form-group">
              <label>{{ __('image') }}</label>
              <p class="text-muted">{{ __('please_choose_square_image_of_larger_than_350px_350px_and_smaller_than_550px_550px') }}</p>
              <span v-if="error" class="error">{{ error }}</span>
              <input type="file" accept="image/*" name="image" v-on:change="handleFileUpload" ref="file_image" class="file-input">
              <div class="file-input-div bg-gray-100" @click="$refs.file_image.click()" @drop="dropFile" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                  <template v-if="image && image.name !== ''">
                      <label>{{ __('selected_file_name') }} {{ image.name }}</label>
                  </template>
                  <template v-else>
                      <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                      <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                  </template>
              </div>
              <div class="row" v-if="image_url">
                  <div class="col-md-4">
                      <img class="custom-image" :src="image_url" title='Promo code image' alt='Promo code image'/>
                  </div>
              </div>
          </div>
        <div class="form-group col-md-12" v-if="id">
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
import axios from "axios";

export default {
  props: ["record"],
  data: function () {
    return {
      isLoading: false,
      id: this.record ? this.record.id : "",
      promo_code: this.record ? this.record.promo_code : "",
      message: this.record ? this.record.message : "",
      start_date: this.record ? this.record.start_date : "",
      end_date: this.record ? this.record.end_date : "",
      no_of_users: this.record ? this.record.no_of_users : "",
      minimum_order_amount: this.record ? this.record.minimum_order_amount : "",
      discount_type: (this.record && this.record.length !== 0) ? this.record.discount_type:"",
      discount: this.record ? this.record.discount : "",
      max_discount_amount: this.record ? this.record.max_discount_amount : "",
      repeat_usage: this.record ? this.record.repeat_usage:"",
      no_of_repeat_usage: this.record ? this.record.no_of_repeat_usage : 0,
      status: this.record ? this.record.status : 1,
      image: this.record ? this.record.image_url : "",
      image_url: this.record ? this.record.image_url : "",
      validationEndDateError: null,
      validationStartDateError: null,
      validationNoOfUsersError: null,
      validationMaxDiscountAmountError: null,
      error: null,
      discountPercentagevalidationError: null,
    };
  },
  computed: {
    modal_title: function () {
      let title = this.id ?  __('edit')  :  __('add') ;
      title += ' ';
      title +=   __('promo_code');
      return title;
    },
      isInvalidDiscount() {
          return this.minimum_order_amount < this.discount;
      }


  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    dropFile(event) {
        event.preventDefault();
        this.$refs.file_image.files = event.dataTransfer.files;
        this.handleFileUpload(); // Trigger the onChange event manually
        // Clean up
        event.currentTarget.classList.add('bg-gray-100');
        event.currentTarget.classList.remove('bg-green-300');
    },
    handleFileUpload() {
      const file = this.$refs.file_image.files[0];
      
      // Reset previous error message
      this.error = null;

      // Check if a file was selected
      if (!file) return;

      // Perform image validation
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
          this.error = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF or WEBP image.";
          return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
          this.error = "File size exceeds the maximum allowed limit (2MB).";
          return;
      }

      // Create a URL for the uploaded image and display it
      this.imageUrl = URL.createObjectURL(file);
      this.image = this.$refs.file_image.files[0];
      this.image_url = URL.createObjectURL(this.image);
    },
    validateStartDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        this.currentDate = `${year}-${month}-${day}`;

        console.log(this.start_date + ' ' + this.currentDate);

        const startDate = new Date(this.start_date);
        const currentDate = new Date(this.currentDate);
        const endDate = new Date(this.end_date);

        if (startDate < currentDate || startDate > endDate) {
            this.validationStartDateError = "Start date cannot be a past date or after the end date.";
            this.start_date = "";
        } else {
            this.validationStartDateError = null;
        }
    },
    validateEndDate() {
        if (this.end_date < this.start_date ) {
            this.validationEndDateError = "End Date must be equal or greater than Start Date.";
            this.end_date = "";
        } else {
            this.validationEndDateError = null;
        }
    },
    validateNoOfUsers() {
        if (this.no_of_users < 1 ) {
            this.validationNoOfUsersError = "No of Users must be integer value.";
            this.no_of_users = "";
        } else {
            this.validationNoOfUsersError = null;
        }
    },
    validateMaxDiscountAmount() {
        if (this.max_discount_amount < 1 ) {
            this.validationMaxDiscountAmountError = "Max Discount Amount must be integer value.";
            this.max_discount_amount = "";
        } else {
            this.validationMaxDiscountAmountError = null;
        }
    },
    validateDiscountPercentage() {
      if (this.discount < 1 || this.discount > 100) {
            this.discountPercentagevalidationError = "Discount must be between 1 and 100.";
            this.discount = null;
        } else {
            this.discountPercentagevalidationError = null;
        }
    },
    saveRecord: function () {
      let vm = this;
      this.isLoading = true;
      let formData = new FormData();
      if (this.id) {
        formData.append("id", this.id);
      }
      formData.append("promo_code", this.promo_code);
      formData.append("message", this.message);
      formData.append("start_date", this.start_date);
      formData.append("end_date", this.end_date);
      formData.append("no_of_users", this.no_of_users);
      formData.append("minimum_order_amount", this.minimum_order_amount);
      formData.append("discount", this.discount);
      formData.append("discount_type", this.discount_type);
      formData.append("max_discount_amount", this.max_discount_amount);
      formData.append("repeat_usage", this.repeat_usage);
      formData.append("no_of_repeat_usage", this.no_of_repeat_usage);
      formData.append("status", this.status);
      formData.append("image", this.image);

      let url = this.$apiUrl + "/promo_code/save";
      if (this.id) {
        url = this.$apiUrl + "/promo_code/update";
      }

      axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          let data = res.data;
         
          if (data.status === 1) {
            
            this.$eventBus.$emit("PromoCodeSaved", data.message);
            vm.$router.push({path: '/promo_code'});
            this.hideModal();
           
          } else {
            vm.showError(data.message);
            vm.isLoading = false;
          }
        }).catch((error) => {
          vm.isLoading = false;
          if (error.request.statusText) {
              this.showError(error.request.statusText);
          }else if (error.message) {
              this.showError(error.message);
          } else {
              this.showError(__('something_went_wrong'));
          }
        });
    },
  },
  mounted() {
    this.showModal();
  },
};
</script>

<style scoped>

</style>
