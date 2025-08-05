<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>Deliverable Area</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item" aria-current="page">Deliverable Area</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">
                        <div class="card-header">
                            <h4>Deliverable Area for City <small class="text text-primary text-sm">Search your city in which you will deliver the foods and city points.</small></h4>
                        </div>
                        <div class="card-body">
                            <form ref="my-form" @submit.prevent="saveRecord">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6 map-div">
                                            <label for="city_name">Select or Search City</label>
                                            <multiselect v-model="city"
                                                         :options="cities"
                                                         @close="setMap"
                                                         placeholder="Select & Search City"
                                                         label="zone"
                                                         track-by="zone" id="city_name" required>
                                                <template slot="singleLabel" slot-scope="props">
                                                    <span class="option__desc">
                                                        <span class="option__title">{{ props.option.zone }}</span>
                                                    </span>
                                                </template>
                                                <template slot="option" slot-scope="props">
                                                    <div class="option__desc">
                                                        <span class="option__title">{{
                                                                props.option.zone + ' &nbsp;- &nbsp; ' + props.option.formatted_address 
                                                            }}</span>
                                                    </div>
                                                </template>
                                            </multiselect>
                                        </div>
                                        <div class="col-md-12"> 
                                            <small class="text text-primary text-sm h4 mt-1">Please edit Map or City Deliverable Area in desktop. It may not work in mobile device.</small>
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
                                                    style="width: 100%; height: 400px; margin-top: 5px"
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
                                            <div class="form-group">
                                                <button type="submit" class="btn btn-primary mt-3">{{ __('save') }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Multiselect from 'vue-multiselect'
import {gmapApi} from 'vue2-google-maps'

export default {
    components: {
        Multiselect
    },
    data: function () {
        return {
            id:"",
            cities: [],
            city: "",
            zone: "",
            center: {lat: 0, lng: 0},
            infoWindow: {
                position: {lat: 0, lng: 0},
                open: false,
                template: ''
            },
            map:"",
            markers: [],
            drawingManager:"",
            vertices:"",
            geolocation_type:"",
            radius:"",
        }
    },
    computed: {
        google: gmapApi
    },
    created: function () {
        this.getCities();
    },
    methods: {
        getCities() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/cities')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.cities = data.data
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
        setMap() {
            console.log(this.city);
             console.log(this.city.latitude);
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
            let boundary_points = JSON.parse(this.city.boundary_points);
            console.log(boundary_points);
            if (this.city.geolocation_type) {
                this.geolocation_type = this.city.geolocation_type;
                this.radius = this.city.radius;
                if (this.city.geolocation_type === "polygon") {
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
                        radius: Math.sqrt(this.city.radius) * 100,
                    });
                    this.overlayRemoveListener(cityCircle, true, this.map, true , this.city.boundary_points);
                }
            }
        },
        saveRecord: function () {
            let vm = this;
            this.isLoading = true;
            if (this.vertices && this.id) {
                let formData = new FormData();
                formData.append("id", this.id);
                formData.append("geolocation_type", this.geolocation_type);
                formData.append("radius", this.radius);
                if(this.geolocation_type === 'circle'){
                    formData.append("boundary_points", this.vertices);
                }else{
                    //let boundary_points = JSON.parse(JSON.stringify(this.vertices));
                    formData.append("boundary_points", JSON.stringify(this.vertices));
                }
                let url = this.$apiUrl + '/cities/save_boundary';
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
            } else {
                vm.isLoading = false;
                this.showError("Select city and map.");
            }
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
                        /*"radius": vm.radius,*/
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
    },
};
</script>
<style scoped>
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>
