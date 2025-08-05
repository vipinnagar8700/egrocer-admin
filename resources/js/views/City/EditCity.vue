<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('manage_city') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <template v-if="city.id">
                                    {{ __('edit') }}
                                </template>
                                <template v-else>
                                    {{ __('create') }}
                                </template>
                                {{ __('city') }}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-12 order-md-1 order-last">
                    <div class="card h-100">
                        <div class="card-header">
                            <h4>
                                <template v-if="city.id">{{ __('edit') }}</template>
                                <template v-else>{{ __('create') }}</template>
                                {{ __('city') }}
                            </h4>
                        </div>
                        <div class="card-body">
                            <form ref="my-form" @submit.prevent="saveRecord">
                                <div class="form-group">
                                    <label for="city_name"> {{ __('search_city') }}</label>
                                    <GmapAutocomplete type="search" class="form-control"
                                                      placeholder="Search City on map."
                                                      @place_changed="setPlace"
                                                      :options="{ fields: ['address_components','formatted_address', 'geometry', 'name','place_id','plus_code','types'], strictBounds: false }"
                                                      id="city_name"
                                                     >
                                    </GmapAutocomplete>
                                    <input type="hidden" v-model="city.formatted_address">
                                    <span class="text text-primary">{{ __('search_your_city_where_you_will_deliver_the_food_and_to_find_co_ordinates') }}</span>
                                </div>
                              
                                <div class="form-group">
                                    <label for="latitude">{{ __('latitude') }} <span
                                        class="text-danger text-sm">*</span></label>
                                    <input type="text" class="form-control" name="latitude" id="latitude"
                                           v-model="city.latitude" placeholder="Enter Latitude." required readonly>
                                </div>
                                <div class="form-group">
                                    <label for="longitude"> {{ __('longitude') }}<span class="text-danger text-sm">*</span></label>
                                    <input type="text" class="form-control" name="longitude" id="longitude"
                                           v-model="city.longitude" placeholder="Enter Longitude." required readonly>
                                </div>

                                <div class="form-group">
                                    <label for="name"> {{ __('city_name') }}<span
                                        class="text-danger text-sm">*</span></label>
                                    <input type="text" class="form-control" name="name" id="name"
                                           v-model="city.name" placeholder="Enter City Name." required readonly>
                                </div>

                                <div class="form-group">
                                    <label for="state"> {{ __('state_name') }}<span
                                        class="text-danger text-sm">*</span></label>
                                    <input type="text" class="form-control" name="state" id="state"
                                           v-model="city.state" placeholder="Enter State Name." required readonly>
                                </div>

                                <div class="form-group">
                                    <label for="state"> {{ __('zone_name') }}<span
                                        class="text-danger text-sm">*</span></label>
                                    <input type="text" class="form-control" name="zone" id="zone"
                                           v-model="city.zone" placeholder="Enter Zone Name." required>
                                </div>

                                <div class="form-group">
                                   
                                    <label for="time_to_travel">{{ __('time_to_travel_1km') }} <span
                                        class="text-danger text-sm">*</span> <small>(Enter in minutes)</small>
                                    </label>
                                    <input type="number" class="form-control" name="time_to_travel"
                                           id="time_to_travel" min="0" max="999999999" v-model="city.time_to_travel"
                                           placeholder="Enter Time to travel 1 (km)." required>
                                </div>


                                <div class="form-group">
                                    <label for="min_amount_for_free_delivery">{{ __('minimum_amount_for_free_delivery') }}<span
                                        class="text-danger text-xs">*</span> <small>[ {{ $currency }} ]</small></label>
                                    <input type="number" class="form-control" name="min_amount_for_free_delivery"
                                           id="min_amount_for_free_delivery" v-model="city.min_amount_for_free_delivery"
                                           placeholder="Enter Delivarable Maximum Distance in km" min="0" max="999999999" required>
                                </div>

                                <div class="form-group d-none">
                                    <label for="max_deliverable_distance"> {{ __('maximum_delivarable_distance') }}<span
                                        class="text-danger text-xs">*</span> <small>[Kilometre]</small></label>
                                    <input type="number" class="form-control" name="max_deliverable_distance" v-model="city.max_deliverable_distance"
                                           placeholder="Enter Delivarable Maximum Distance in km" min="0" max="999999999">
                                </div>

                                <div class="form-group">
                                    <label for="delivery_charge_method" class=" col-12 col-form-label">{{ __('delivery_charge_methods') }} <span class="text-danger text-sm">*</span></label>
                                    <select class="form-control form-select" name="delivery_charge_method"
                                            id="delivery_charge_method" v-model="city.delivery_charge_method" required>
                                        <option value="">{{ __('select_method') }}</option>
                                        <option value="fixed_charge">{{ __('fixed_delivery_charges') }}</option>
                                        <option value="per_km_charge">{{ __('per_km_delivery_charges') }}</option>
                                        <option value="range_wise_charges">{{ __('range_wise_delivery_charges') }}</option>
                                    </select>
                                </div>
                                <div class="form-group" v-if="city.delivery_charge_method === 'fixed_charge'">
                                    <label for="fixed_charge"> {{ __('fix_delivery_charges') }}<span
                                        class="text-danger text-sm">*</span></label>
                                    <input type="number" class="form-control" name="fixed_charge" id="fixed_charge"
                                           v-model="city.fixed_charge" placeholder="Global Flat Charges" min="0" max="999999999" step="any">
                                </div>
                                <div class="form-group" v-if="city.delivery_charge_method === 'per_km_charge'">
                                    <label for="per_km_charge">{{ __('per_km_delivery_charges') }}<span
                                        class="text-danger text-sm">*</span> </label>
                                    <input type="number" class="form-control" name="per_km_charge" id="per_km_charge"
                                           v-model="city.per_km_charge" placeholder="Per Kilometer Delivery Charge"
                                           min="0" max="999999999" step="any">
                                           <input type="text" class="form-control d-none" name="boundary_points" id="boundary_points"
                                                   v-model="city.boundary_points" placeholder="Boundary Points" >
                                </div>
                                
                                <div class="form-group col-sm-12"
                                     v-if="city.delivery_charge_method === 'range_wise_charges'">
                                    <label>{{ __('range_wise_delivery_charges') }}<span class="text-danger text-sm">* </span> <span
                                        class="text-secondary text-sm">(Set Proper ranges for delivery charge. Do not repeat the range value to next range. For e.g. 1-3,4-6)</span>
                                    </label>
                                    <div class="form-group row" v-for="(range, index) in city.range_wise_charges"
                                         :key="key = index+1">
                                        <div class="col-sm-1">{{ key }}.</div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" name="from_range[]"
                                                   id="from_range" v-model="range.from_range" placeholder="From Range"
                                                   min="0" max="999999999">
                                        </div>
                                        <div class="col-sm-1 btn btn-secondary">To</div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" name="to_range[]" id="to_range"
                                                   v-model="range.to_range"  placeholder="To Range" min="0" max="999999999">
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" name="price[]" id="price"
                                                   v-model="range.price" placeholder="Price" min="0" max="999999999" step="any">
                                        </div>

                                        <div class="col-sm-1" v-if="index === 0">
                                            <a v-b-tooltip.hover title="Add Row" style="cursor: pointer;" @click="addRow">
                                                <i class="fa fa-plus-square fa-2x"></i>
                                            </a>
                                        </div>

                                        <div class="col-sm-1" v-if="index !== 0">
                                            <a v-b-tooltip.hover title="Remove Row" style="cursor: pointer;"
                                               @click="remove(index)">
                                                <i class="fa fa-times fa-2x"></i>
                                            </a>
                                        </div>

                                    </div>

                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary"> {{ __('save') }}</button>
                                    <button type="reset" class="btn btn-secondary">{{ __('clear') }}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-6 order-md-1 order-last map_view_desktop">
                    <div class="card h-100">
                        <div class="card-header">
                            <h4>Map View</h4>
                        </div>
                        <div class="card-body">
                            <div class="offset-3 mt-1">
                                                <button type="button" id="remove-line" class="badge bg-primary">Remove Newly Added Line</button>
                                                <button type="button" id="clear-line" class="badge bg-danger">Clear Map</button>
                                                <button type="button" id="add-line" class="badge bg-success">Restore Old Map</button>
                                            </div>
                            <div id="map" style="position: relative; overflow: hidden;">
                                <GmapMap
                                                    :zoom="13"
                                                    :center="center"
                                                    :mapTypeControl=true
                                                    :drawingControl = true
                                                    style="width: 100%; height: 700px; margin-top: 5px"
                                                    ref="mapRef"
                                                >
                                                    <GmapMarker
                                                        :key="index"
                                                        v-for="(m, index) in markers"
                                                        :position="google && m.position"
                                                        @click="center = m.position"
                                                        :clickable="true"
                                                        :draggable="true"
                                                    />
                                                    <gmap-info-window
                                                        :options="{
                                                              maxWidth: 300,
                                                              pixelOffset: { width: 0, height: -35 }
                                                            }"
                                                        :position="infoWindow.position"
                                                        :opened="infoWindow.open"
                                                        @closeclick="infoWindow.open=false">
                                                        <div v-html="infoWindow.template"></div>
                                                    </gmap-info-window>
                                                </GmapMap>
                            </div>
                            <div v-if="city.formatted_address">
                                <span class="title font-weight-bolder">{{ city.formatted_address }}</span>
                            </div>
                             <div class="form-group d-none">
                                                <label for="vertices" class="control-label">Boundry Points<span class='text-danger text-xs'>*</span> </label>
                                                <textarea name="vertices" id="vertices" v-model="vertices" class="form-control" placeholder="here will be your selected outlines latitude and longitude" cols="10" rows="2"></textarea>
                                                 
                                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script async defer src="https://maps.googleapis.com/maps/api/js?libraries=drawing&v=weekly"></script>
<script>
import axios from "axios";
import {gmapApi} from 'vue2-google-maps'

export default {
    data: function () {
        return {
       
            center: {lat: 0, lng: 0},
            currentPlace: null,
            markers: [],
            city: {
                id: "",
                latitude: "",
                longitude: "",
                name: "",
                state: "",
                zone: "",
                formatted_address: "",
                time_to_travel: "",
                min_amount_for_free_delivery: "",
                max_deliverable_distance: "",
                delivery_charge_method: "",
                fixed_charge: "",
                per_km_charge: "",
                range_wise_charges: [
                    {from_range: "", to_range: "", price: ""}
                ],
                boundary_points:"",
                geolocation_type:"",
                radius:"",
                
            },
            boundary_points:"",
            formatted_address: "",
            infoWindow: {
                position: {lat: 0, lng: 0},
                open: false,
                template: ''
            },
             map:"",
            drawingManager:"",
            vertices:"",
            geolocation_type:"",
             googleMapsLoaded: false,
           
        }
    },
    mounted() {
        let vm = this;
        this.$refs.mapRef.$mapPromise.then((map) => {
            vm.map =  map;
            vm.drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.POLYGON,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [google.maps.drawing.OverlayType.POLYGON,
                        google.maps.drawing.OverlayType.CIRCLE,]
                },
                polygonOptions: {
                    editable: true,
                },
                circleOptions: {
                    fillColor: '#666666',
                    fillOpacity: 0.5,
                    strokeWeight: 1,
                    clickable: true,
                    editable: true,
                    draggable: true,
                    zIndex: 1
                }
            });
            vm.drawingManager.setMap(vm.map);
            google.maps.event.addListener(vm.drawingManager, "overlaycomplete", function (event) {
                var newShape = event.overlay;
                newShape.type = event.type;
            });
            google.maps.event.addListener(vm.drawingManager, "overlaycomplete", function (event) {
                if (event.type == "circle") {
                    var circle_points = [];
                    vm.radius = event.overlay.getRadius();
                    var lat = event.overlay.getCenter().lat();
                    var lng = event.overlay.getCenter().lng();
                    circle_points.push({
                        "lat": lat,
                        "lng": lng,
                    });
                    vm.geolocation_type = event.type;
                    vm.vertices =  JSON.stringify(circle_points);
                } else {
                    vm.geolocation_type = event.type;
                    vm.vertices = event.overlay.getPath().getArray();
                    vm.overlayClickListener(event.overlay);
                }
            });
            google.maps.event.addListener(this.drawingManager, "overlaycomplete", function (event) {
                vm.overlayRemoveListener(event.overlay, false);
            });
        });
         this.waitForGoogleMaps();
    },
    computed: {
        google() {
            return gmapApi(); // This will return the google object once the API is loaded
        }
    },
    created: function () {
        this.city.id = this.$route.params.id;
        this.cityRecord = this.$route.params.record;
        if (this.city.id) {
            this.getCity();
          
           
        }
        
    },
    methods: {
        addRow() {
            this.city.range_wise_charges.push({from_range: "", to_range: "", price: ""})
        },
        remove(index) {
            this.city.range_wise_charges.splice(index, 1)
        },
        setPlace(place) {
            this.currentPlace = place;
            this.addMarker()
        },
        addMarker() {
            if (this.currentPlace) {
                const marker = {
                    lat: this.currentPlace.geometry.location.lat(),
                    lng: this.currentPlace.geometry.location.lng(),
                };
                this.markers.push({position: marker});
                this.center = marker;
                this.city.latitude = this.currentPlace.geometry.location.lat();
                this.city.longitude = this.currentPlace.geometry.location.lng();
                this.city.name = this.currentPlace.name;

                let addressArr = this.currentPlace.formatted_address.split(",");
                this.city.state = addressArr[addressArr.length - 2];

                this.city.formatted_address = this.currentPlace.formatted_address;
                this.infoWindow.position = {lat: this.city.latitude, lng: this.city.longitude}
                this.infoWindow.template = `<b>${this.city.name}</b><br>${this.city.formatted_address}`
                this.infoWindow.open = true;
                this.currentPlace = null;
            }
        },
        getCity() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/cities/edit/' + this.city.id)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data.data;
                   
                    for (let key in this.city) {
                        if (key === 'range_wise_charges') {
                            this.city[key] = JSON.parse(data[key]);
                        } else {
                            this.city[key] = data[key];
                        }
                    }
                    const marker = {
                        lat: parseFloat(data.latitude),
                        lng: parseFloat(data.longitude)
                    };
                    this.markers.push({position: marker});
                    this.center = marker;
                    this.infoWindow.position = {lat: parseFloat(data.latitude), lng: parseFloat(data.longitude)}
                    this.infoWindow.template = `<b>${data.name}</b><br>${this.city.formatted_address}`
                    this.infoWindow.open = true;
                    this.boundary_points = this.city.boundary_points;
                     this.setMap();
                });
        },

       
        overlayClickListener(overlay){
            google.maps.event.addListener(overlay, "mouseup", function (event) {
                this.vertices = overlay.getPath().getArray();
            });
        },
        overlayRemoveListener(overlay, is_restore = false, drawed_map = "", not_remove = false, boundary_points = "") {
            let vm = this;
            if (is_restore == true) {
                document.getElementById("add-line").addEventListener("click", addLine);
            }
            document.getElementById("clear-line").addEventListener("click", clearLine);
            if (not_remove == false) {
                document.getElementById("remove-line").addEventListener("click", removeLine);
            }
            function clearLine() {
                overlay.setMap(null);
                vm.vertices = "";
            }
            function removeLine() {
                overlay.setMap(null);
                vm.vertices = "";
            }
            function addLine() {
                if (drawed_map != "") {
                    overlay.setMap(drawed_map);
                } else {
                    overlay.setMap(map);
                }
                vm.vertices = boundary_points;
            }
        },
           waitForGoogleMaps() {
      const checkGoogleMaps = setInterval(() => {
        if (gmapApi() && gmapApi().maps) {
          this.googleMapsLoaded = true;
          clearInterval(checkGoogleMaps);
          this.setMap();
        }
      }, 100); // Check every 100ms
    },
        setMap() {
           
            this.id = this.city.id;
            const marker = {
                lat: parseFloat(this.city.latitude),
                lng: parseFloat(this.city.longitude)
            };
            this.markers.push({position: marker});
            this.center = marker;
            this.infoWindow.position = {lat: parseFloat(this.city.latitude), lng: parseFloat(this.city.longitude)}
            this.infoWindow.template = `<b>${this.city.name}</b><br>${this.city.formatted_address}`
            this.infoWindow.open = true;
            //mapRef
           
            let boundary_points = this.boundary_points ? JSON.parse(this.boundary_points) : [];


            if (this.city.geolocation_type) {
                 const google = gmapApi();
                this.geolocation_type = this.city.geolocation_type;
                this.radius = this.city.radius;
                if (this.city.geolocation_type === "polygon") {
                    console.log(boundary_points);
                    this.vertices = boundary_points;
                    var bermudaTriangle = new google.maps.Polygon({
                        paths: boundary_points,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        editable: true,
                        geodesic: true
                    });
                    bermudaTriangle.setMap(this.map);
                    this.overlayRemoveListener(bermudaTriangle, true, this.map, true, boundary_points);
             
                } else if (this.city.geolocation_type === "circle") {
                    this.vertices = this.city.boundary_points;
                    const cityCircle = new google.maps.Circle({
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.35,
                        map : this.map,
                        center: boundary_points[0],
                        radius: Number(this.city.radius),
                    });
                  
                    this.overlayRemoveListener(cityCircle, true, this.map, true , this.city.boundary_points);
                }
            }
        },
        saveRecord: function () {

            let vm = this;
            this.isLoading = true;
            if (this.vertices) {
            let formObject = this.city;
            let formData = new FormData();
            for (let key in formObject) {
                if (key === 'range_wise_charges') {
                    formData.append(key, JSON.stringify(formObject[key]));
                } else {
                    formData.append(key, formObject[key]);
                }
            }
             formData.append("geolocation_type", this.geolocation_type);
                formData.append("radius", this.radius);
                if(this.geolocation_type === 'circle'){
                    formData.append("boundary_points", this.vertices);
                }else{
                    //let boundary_points = JSON.parse(JSON.stringify(this.vertices));
                    formData.append("boundary_points", JSON.stringify(this.vertices));
                }
            let url = this.$apiUrl + '/cities/save';
            if (this.city.id) {
                url = this.$apiUrl + '/cities/update';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    //this.showSuccess(data.message);
                    this.showMessage("success", data.message);
                    setTimeout(
                        function () {
                            vm.$swal.close();
                            vm.$router.push({path: '/cities'})
                        }, 2000);
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
            }else {
                vm.isLoading = false;
                this.showError("Draw Deliverable area on Map");
            }
        }
    }
};
</script>
