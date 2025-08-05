<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('payment_gateways_methods_settings') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('payment_gateways_methods_settings') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
            <section class="section">
                <form id="payment_method_settings_form" method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="row">
                        <div class="col-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h4 class="card-title">{{ __('cod_payments') }}</h4>
                                </div>
                                <div class="card-body">
                                    <input type="hidden" id="payment_method_settings" v-model="payment_method.payment_method_settings" name="payment_method_settings" required="" value="1" aria-required="true">
                                    <div class="">
                                        <div class="form-group">
                                            <label for="cod_payment_method">{{ __('cod_payments') }} <small>[ {{ __('enable') }} / {{ __('disable') }} ] </small></label><br>
                                            <div class='form-check form-switch'>
                                                <input class='form-check-input' id="cod_payment_method" type='checkbox' true-value="1" false-value="0" v-model="payment_method.cod_payment_method" :checked="payment_method.cod_payment_method">
                                            </div>
                                        </div>
                                        <div v-if="payment_method.cod_payment_method == 1" class="form-group">
                                            <label for="cod_mode">{{ __('cod_mode') }}</label><br>
                                            <p><small><b>{{ __('global') }} :</b> {{ __('will_be_considered_for_all_the_products') }}.</small></p>
                                            <p><small><b>{{ __('product_wise') }} :</b> {{ __('product_wise_cod_will_be_considered') }}.</small></p>
                                            <select name="cod_mode" id="cod_mode" class="form-control form-select" v-model="payment_method.cod_mode">
                                                <option value="global" selected="">{{ __('global') }}</option>
                                                <option value="product">{{ __('product_wise') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h4 class="card-title">{{ __('paypal_payments') }}</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="paypal_payment_method"> {{ __('paypal_payments') }}<small>[ {{ __('enable') }} / {{ __('disable') }} ] </small></label><br>
                                        <div class='form-check form-switch'>
                                            <input class='form-check-input' id="paypal_payment_method" type='checkbox' true-value="1" false-value="0" v-model="payment_method.paypal_payment_method" :checked="payment_method.paypal_payment_method">
                                        </div>
                                    </div>
                                    <div v-if="payment_method.paypal_payment_method == 1" class="form-group">
                                        <label for="paypal_mode"> {{ __('payment_mode') }}<small>[ {{ __('sandbox') }} / {{ __('live') }} ]</small></label>
                                        <select name="paypal_mode" id="paypal_mode" required v-model="payment_method.paypal_mode" class="form-control form-select">
                                            <option value="">{{ __('select_mode') }} </option>
                                            <option value="sandbox" selected="">{{ __('sandbox') }} ( {{ __('testing') }} )</option>
                                            <option value="production"> {{ __('production') }}( {{ __('live') }} )</option>
                                        </select>
                                    </div >
                                    <div v-if="payment_method.paypal_payment_method == 1" class="form-group">
                                        <label for="paypal_currency_code">{{ __('currency_code') }} <small>[ {{ __('paypal_supported') }} ]</small> <a href="https://developer.paypal.com/docs/api/reference/currency-codes/" target="_BLANK"><i class="fa fa-link"></i></a></label>
                                        <select name="paypal_currency_code" id="paypal_currency_code" required v-model="payment_method.paypal_currency_code" class="form-control form-select">
                                            <option value=""> {{ __('select_currency_code') }}</option>
                                            <option value="INR">Indian rupee {{ __('indian_rupee') }}</option>
                                            <option value="AUD">Australian dollar{{ __('australian_dollar') }} </option>
                                            <option value="BRL">Brazilian real{{ __('brazilian_real') }} </option>
                                            <option value="CAD">Canadian dollar{{ __('canadian_doller') }} </option>
                                            <option value="CNY">Chinese Renmenbi{{ __('chinese_renmenbi') }} </option>
                                            <option value="CZK">Czech koruna{{ __('czech_koruna') }} </option>
                                            <option value="DKK">Danish krone {{ __('danish_krone') }}</option>
                                            <option value="EUR">Euro {{ __('euro') }}</option>
                                            <option value="HKD">Hong Kong dollar {{ __('hong_kong_dollar') }}</option>
                                            <option value="HUF">Hungarian forint {{ __('hungarian_forint') }}</option>
                                            <option value="ILS">Israeli new shekel{{ __('israeli_new_shekel') }} </option>
                                            <option value="JPY">Japanese yen{{ __('japanese_yen') }} </option>
                                            <option value="MYR">Malaysian ringgit{{ __('malaysian_ringgit') }} </option>
                                            <option value="MXN">Mexican peso {{ __('mexican_peso') }}</option>
                                            <option value="TWD">New Taiwan dollar {{ __('new_taiwan_dollar') }}</option>
                                            <option value="NZD">New Zealand dollar{{ __('new_zealand_dollar') }} </option>
                                            <option value="NOK">Norwegian krone{{ __('norwegian_krone') }} </option>
                                            <option value="PHP">Philippine peso {{ __('philippine_peso') }}</option>
                                            <option value="PLN">Polish złoty {{ __('polish_zloty') }}</option>
                                            <option value="GBP">Pound sterling{{ __('pound_sterling') }} </option>
                                            <option value="RUB">Russian ruble{{ __('russian_ruble') }} </option>
                                            <option value="SGD">Singapore dollar {{ __('singapore_dollar') }}</option>
                                            <option value="SEK">Swedish krona{{ __('swedish_krona') }} </option>
                                            <option value="CHF">Swiss franc{{ __('swiss_franc') }} </option>
                                            <option value="THB">Thai baht{{ __('thai_baht') }} </option>
                                            <option value="USD" selected="">United States dollar{{ __('united_states_dollar') }} </option>
                                        </select>
                                    </div>
                                    <div v-if="payment_method.paypal_payment_method == 1" class="form-group">
                                        <label for="paypal_business_email">{{ __('paypal_business_email') }}</label>
                                        <input type="text" class="form-control" name="paypal_business_email" id="paypal_business_email" v-model="payment_method.paypal_business_email" placeholder="Paypal Business Email" required>
                                    </div>
                                    <div v-if="payment_method.paypal_payment_method == 1" class="form-group">
                                        <label for="paypal_notification_url">{{ __('notification_url') }}<small>(Set this as IPN notification URL in you PayPal account{{ __('set_this_as_ipn_notification_url_in_you_paypal_account') }})</small></label>
                                        <input type="text" class="form-control" name="paypal_notification_url" id="paypal_notification_url" v-model="payment_method.paypal_notification_url"  placeholder="Paypal IPN notification URL" disabled="">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h4 class="card-title">{{ __('razorpay_payments') }}</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="razorpay_payment_method">{{ __('razorpay_payments') }}<small>[ {{ __('enable') }} / {{ __('disable') }} ] </small></label><br>
                                        <div class='form-check form-switch'>
                                            <input class='form-check-input' id="razorpay_payment_method" type='checkbox' true-value="1" false-value="0" v-model="payment_method.razorpay_payment_method" :checked="payment_method.razorpay_payment_method">
                                        </div>
                                    </div>
                                    <div v-if="payment_method.razorpay_payment_method == 1" class="form-group">
                                        <label for="razorpay_key">{{ __('razorpay_key_id') }}</label>
                                        <input type="text" class="form-control" name="razorpay_key" id="razorpay_key" v-model="payment_method.razorpay_key" placeholder="Razor Key ID">
                                    </div>
                                    <div v-if="payment_method.razorpay_payment_method == 1" class="form-group">
                                        <label for="razorpay_secret_key">{{ __('secret_key') }}</label>
                                        <input type="text" class="form-control" name="razorpay_secret_key" id="razorpay_secret_key" v-model="payment_method.razorpay_secret_key" placeholder="Razorpay Secret Key ">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h4 class="card-title">{{ __('paystack_payments') }}</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="paystack_payment_method">{{ __('paystack_payments') }}<small>[ {{ __('enable') }} / {{ __('disable') }} ] </small></label><br>
                                        <div class='form-check form-switch'>
                                            <input class='form-check-input' id="paystack_payment_method" type='checkbox' true-value="1" false-value="0" v-model="payment_method.paystack_payment_method" :checked="payment_method.paystack_payment_method">
                                        </div>
                                    </div>
                                    <div v-if="payment_method.paystack_payment_method == 1" class="form-group">
                                        <label for="paystack_public_key">{{ __('paystack_public_key') }}</label>
                                        <input type="text" class="form-control" name="paystack_public_key" id="paystack_public_key" v-model="payment_method.paystack_public_key" placeholder="Paystack Public key" required>
                                    </div>
                                    <div v-if="payment_method.paystack_payment_method == 1" class="form-group">
                                        <label for="paystack_secret_key">{{ __('paystack_secret_key') }}</label>
                                        <input type="text" class="form-control" name="paystack_secret_key" id="paystack_secret_key" v-model="payment_method.paystack_secret_key" placeholder="Paystack Secret Key " required>
                                    </div>
                                    <div v-if="payment_method.paystack_payment_method == 1" class="form-group">
                                        <label for="paystack_currency_code"> {{ __('currency_code') }}<small>[{{ __('paystack_supported') }}]</small> <a href="https://support.paystack.com/hc/en-us/articles/360009973779-What-currency-is-available-to-my-business-" target="_BLANK"><i class="fa fa-link"></i></a></label>
                                        <select name="paystack_currency_code" id="paystack_currency_code" required v-model="payment_method.paystack_currency_code" class="form-control form-select">
                                            <option value="">{{ __('select_currency_code') }}</option>
                                            <option value="GHS">{{ __('ghana') }} - GHS</option>
                                            <option value="NGN">{{ __('nigeria') }} - NGN</option>
                                            <option value="USD">{{ __('nigeria') }} - USD</option>
                                            <option value="ZAR">{{ __('south_africa') }}- ZAR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h4 class="card-title">{{ __('stripe_payments') }}</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="stripe_payment_method">{{ __('stripe_payments') }} <small>[ {{ __('enable') }} / {{ __('disable') }} ] </small></label><br>
                                        <div class='form-check form-switch'>
                                            <input class='form-check-input' id="stripe_payment_method" type='checkbox' true-value="1" false-value="0" v-model="payment_method.stripe_payment_method" :checked="payment_method.stripe_payment_method">
                                        </div>
                                    </div>
                                    <div v-if="payment_method.stripe_payment_method == 1" class="form-group">
                                        <label for="stripe_publishable_key">{{ __('stripe_publishable_key') }}</label>
                                        <input type="text" class="form-control" name="stripe_publishable_key" id="stripe_publishable_key" v-model="payment_method.stripe_publishable_key" placeholder="Stripe Publishable Key">
                                    </div>
                                    <div v-if="payment_method.stripe_payment_method == 1" class="form-group">
                                        <label for="stripe_secret_key">{{ __('stripe_secret_key') }}</label>
                                        <input type="text" class="form-control" name="stripe_secret_key" id="stripe_secret_key" v-model="payment_method.stripe_secret_key" placeholder="Stripe Secret Key ">
                                    </div>
                                    <div v-if="payment_method.stripe_payment_method == 1" class="form-group">
                                        <label for="stripe_webhook_secret_key">{{ __('stripe_webhook_secret_key') }}</label>
                                        <input type="text" class="form-control" name="stripe_webhook_secret_key" id="stripe_webhook_secret_key" v-model="payment_method.stripe_webhook_secret_key" placeholder="Stripe Webhook Secret Key">
                                    </div>
                                    <div v-if="payment_method.stripe_payment_method == 1" class="form-group">
                                        <label for="stripe_webhook_url">{{ __('payment_endpoint_url') }} <small>({{ __('set_this_as_url_in_your_stripe_account') }})</small></label>
                                        <input type="text" class="form-control" name="stripe_webhook_url" id="stripe_webhook_url" v-model="payment_method.stripe_webhook_url" readonly="">
                                    </div>
                                    <div v-if="payment_method.stripe_payment_method == 1" class="form-group">
                                        <label for="stripe_currency_code">{{ __('currency_code') }} <small>[ {{ __('stripe_supported') }}]</small> <a href="https://stripe.com/docs/currencies" target="_BLANK"><i class="fa fa-link"></i></a></label>
                                        <select name="stripe_currency_code" id="stripe_currency_code" required v-model="payment_method.stripe_currency_code" class="form-control form-select">
                                            <option value="">Select Currency Code </option>
                                            <option value="INR"> Indian rupee </option>
                                            <option value="USD"> United States dollar </option>
                                            <option value="AED"> United Arab Emirates Dirham </option>
                                            <option value="AFN"> Afghan Afghani </option>
                                            <option value="ALL"> Albanian Lek </option>
                                            <option value="AMD"> Armenian Dram </option>
                                            <option value="ANG"> Netherlands Antillean Guilder </option>
                                            <option value="AOA"> Angolan Kwanza </option>
                                            <option value="ARS"> Argentine Peso</option>
                                            <option value="AUD"> Australian Dollar</option>
                                            <option value="AWG"> Aruban Florin</option>
                                            <option value="AZN"> Azerbaijani Manat </option>
                                            <option value="BAM"> Bosnia-Herzegovina Convertible Mark </option>
                                            <option value="BBD"> Bajan dollar </option>
                                            <option value="BDT"> Bangladeshi Taka</option>
                                            <option value="BGN"> Bulgarian Lev </option>
                                            <option value="BIF"> Burundian Franc</option>
                                            <option value="BMD"> Bermudan Dollar</option>
                                            <option value="BND"> Brunei Dollar </option>
                                            <option value="BOB"> Bolivian Boliviano </option>
                                            <option value="BRL"> Brazilian Real </option>
                                            <option value="BSD"> Bahamian Dollar </option>
                                            <option value="BWP"> Botswanan Pula </option>
                                            <option value="BZD"> Belize Dollar </option>
                                            <option value="CAD"> Canadian Dollar </option>
                                            <option value="CDF"> Congolese Franc </option>
                                            <option value="CHF"> Swiss Franc </option>
                                            <option value="CLP"> Chilean Peso </option>
                                            <option value="CNY"> Chinese Yuan </option>
                                            <option value="COP"> Colombian Peso </option>
                                            <option value="CRC"> Costa Rican Colón </option>
                                            <option value="CVE"> Cape Verdean Escudo </option>
                                            <option value="CZK"> Czech Koruna </option>
                                            <option value="DJF"> Djiboutian Franc </option>
                                            <option value="DKK"> Danish Krone </option>
                                            <option value="DOP"> Dominican Peso </option>
                                            <option value="DZD"> Algerian Dinar </option>
                                            <option value="EGP"> Egyptian Pound </option>
                                            <option value="ETB"> Ethiopian Birr </option>
                                            <option value="EUR"> Euro </option>
                                            <option value="FJD"> Fijian Dollar </option>
                                            <option value="FKP"> Falkland Island Pound </option>
                                            <option value="GBP"> Pound sterling </option>
                                            <option value="GEL"> Georgian Lari </option>
                                            <option value="GIP"> Gibraltar Pound </option>
                                            <option value="GMD"> Gambian dalasi </option>
                                            <option value="GNF"> Guinean Franc </option>
                                            <option value="GTQ"> Guatemalan Quetzal </option>
                                            <option value="GYD"> Guyanaese Dollar </option>
                                            <option value="HKD"> Hong Kong Dollar </option>
                                            <option value="HNL"> Honduran Lempira </option>
                                            <option value="HRK"> Croatian Kuna </option>
                                            <option value="HTG"> Haitian Gourde </option>
                                            <option value="HUF"> Hungarian Forint </option>
                                            <option value="IDR"> Indonesian Rupiah </option>
                                            <option value="ILS"> Israeli New Shekel </option>
                                            <option value="ISK"> Icelandic Króna </option>
                                            <option value="JMD"> Jamaican Dollar </option>
                                            <option value="JPY"> Japanese Yen </option>
                                            <option value="KES"> Kenyan Shilling </option>
                                            <option value="KGS"> Kyrgystani Som </option>
                                            <option value="KHR"> Cambodian riel </option>
                                            <option value="KMF"> Comorian franc </option>
                                            <option value="KRW"> South Korean won </option>
                                            <option value="KYD"> Cayman Islands Dollar </option>
                                            <option value="KZT"> Kazakhstani Tenge </option>
                                            <option value="LAK"> Laotian Kip </option>
                                            <option value="LBP"> Lebanese pound </option>
                                            <option value="LKR"> Sri Lankan Rupee </option>
                                            <option value="LRD"> Liberian Dollar </option>
                                            <option value="LSL"> Lesotho loti </option>
                                            <option value="MAD"> Moroccan Dirham </option>
                                            <option value="MDL"> Moldovan Leu </option>
                                            <option value="MGA"> Malagasy Ariary </option>
                                            <option value="MKD"> Macedonian Denar </option>
                                            <option value="MMK"> Myanmar Kyat </option>
                                            <option value="MNT"> Mongolian Tugrik </option>
                                            <option value="MOP"> Macanese Pataca </option>
                                            <option value="MRO"> Mauritanian Ouguiya </option>
                                            <option value="MUR"> Mauritian Rupee</option>
                                            <option value="MVR"> Maldivian Rufiyaa </option>
                                            <option value="MWK"> Malawian Kwacha </option>
                                            <option value="MXN"> Mexican Peso </option>
                                            <option value="MYR"> Malaysian Ringgit </option>
                                            <option value="MZN"> Mozambican metical </option>
                                            <option value="NAD"> Namibian dollar </option>
                                            <option value="NGN"> Nigerian Naira </option>
                                            <option value="NIO"> Nicaraguan Córdoba </option>
                                            <option value="NOK"> Norwegian Krone </option>
                                            <option value="NPR"> Nepalese Rupee </option>
                                            <option value="NZD"> New Zealand Dollar </option>
                                            <option value="PAB"> Panamanian Balboa </option>
                                            <option value="PEN"> Sol </option>
                                            <option value="PGK"> Papua New Guinean Kina </option>
                                            <option value="PHP"> Philippine peso </option>
                                            <option value="PKR"> Pakistani Rupee </option>
                                            <option value="PLN"> Poland złoty </option>
                                            <option value="PYG"> Paraguayan Guarani </option>
                                            <option value="QAR"> Qatari Rial </option>
                                            <option value="RON"> Romanian Leu </option>
                                            <option value="RSD"> Serbian Dinar </option>
                                            <option value="RUB"> Russian Ruble </option>
                                            <option value="RWF"> Rwandan franc </option>
                                            <option value="SAR"> Saudi Riyal </option>
                                            <option value="SBD"> Solomon Islands Dollar </option>
                                            <option value="SCR"> Seychellois Rupee </option>
                                            <option value="SEK"> Swedish Krona </option>
                                            <option value="SGD"> Singapore Dollar </option>
                                            <option value="SHP"> Saint Helenian Pound </option>
                                            <option value="SLL"> Sierra Leonean Leone </option>
                                            <option value="SOS"> Somali Shilling </option>
                                            <option value="SRD"> Surinamese Dollar </option>
                                            <option value="STD"> Sao Tome Dobra </option>
                                            <option value="SZL"> Swazi Lilangeni </option>
                                            <option value="THB"> Thai Baht </option>
                                            <option value="TJS"> Tajikistani Somoni </option>
                                            <option value="TOP"> Tongan Paʻanga </option>
                                            <option value="TRY"> Turkish lira </option>
                                            <option value="TTD"> Trinidad &amp; Tobago Dollar </option>
                                            <option value="TWD"> New Taiwan dollar </option>
                                            <option value="TZS"> Tanzanian Shilling </option>
                                            <option value="UAH"> Ukrainian hryvnia </option>
                                            <option value="UGX"> Ugandan Shilling </option>
                                            <option value="UYU"> Uruguayan Peso </option>
                                            <option value="UZS"> Uzbekistani Som </option>
                                            <option value="VND"> Vietnamese dong </option>
                                            <option value="VUV"> Vanuatu Vatu </option>
                                            <option value="WST"> Samoa Tala</option>
                                            <option value="XAF"> Central African CFA franc </option>
                                            <option value="XCD"> East Caribbean Dollar </option>
                                            <option value="XOF"> West African CFA franc </option>
                                            <option value="XPF"> CFP Franc </option>
                                            <option value="YER"> Yemeni Rial </option>
                                            <option value="ZAR"> South African Rand </option>
                                            <option value="ZMW"> Zambian Kwacha </option>
                                        </select>
                                    </div>
                                    <div v-if="payment_method.stripe_payment_method == 1" class="form-group">
                                        <label for="stripe_mode"> {{ __('mode') }} </label>
                                        <select name="stripe_mode" id="stripe_mode" class="form-control form-select" :required="payment_method.stripe_payment_method == 1" v-model="payment_method.stripe_mode">
                                            <option value="">{{ __('select_mode') }} </option>
                                            <option value="sandbox">{{ __('sandbox') }} ({{ __('testing') }})</option>
                                            <option value="production">{{ __('production') }} ({{ __('live') }} )</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h4 class="card-title">{{ __('paytm_payments') }}</h4>
                                </div>
                                <div class="card-body">

                                    <div class="form-group">
                                        <label for="paytm_payment_method">{{ __('paytm_payments') }}<small>[ {{ __('enable') }} / {{ __('disable') }} ] </small></label><br>
                                        <div class='form-check form-switch'>
                                            <input class='form-check-input' id="paytm_payment_method" type='checkbox' true-value="1" false-value="0" v-model="payment_method.paytm_payment_method" :checked="payment_method.paytm_payment_method">
                                        </div>
                                    </div>

                                    <div v-if="payment_method.paytm_payment_method == 1" class="form-group">
                                        <label for="paytm_mode">{{ __('paytm_payment_mode') }} <small>[ {{ __('sandbox') }} / {{ __('live') }} ]</small></label>
                                        <select name="paytm_mode" id="paytm_mode" :required="payment_method.paytm_payment_method == 1" v-model="payment_method.paytm_mode" class="form-control form-select">
                                            <option value="">{{ __('select_paytm_payment_mode') }}</option>
                                            <option value="sandbox">{{ __('sandbox') }} (  {{ __('testing') }})</option>
                                            <option value="production">{{ __('production') }} (  {{ __('live') }})</option>
                                        </select>
                                    </div>

                                    <div v-if="payment_method.paytm_payment_method == 1" class="form-group">
                                        <label for="paytm_merchant_key">{{ __('merchant_key') }}</label>
                                        <input type="text" class="form-control" name="paytm_merchant_key" id="paytm_merchant_key" v-model="payment_method.paytm_merchant_key" placeholder="Paytm Merchant Key">
                                    </div>

                                    <div v-if="payment_method.paytm_payment_method == 1" class="form-group">
                                        <label for="paytm_merchant_id">{{ __('merchant_id') }}</label>
                                        <input type="text" class="form-control" name="paytm_merchant_id" id="paytm_merchant_id" v-model="payment_method.paytm_merchant_id" placeholder="Paytm Merchant ID">
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="col-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h4 class="card-title">{{ __('midtrans_payments') }}</h4>
                                </div>
                                <div class="card-body">

                                    <div class="form-group">
                                        <label for="midtrans_payment_method">{{ __('midtrans_payments') }}<small>[ {{ __('enable') }} / {{ __('disable') }} ] </small></label><br>
                                        <div class='form-check form-switch'>
                                            <input class='form-check-input' id="midtrans_payment_method" type='checkbox' true-value="1" false-value="0" v-model="payment_method.midtrans_payment_method" :checked="payment_method.midtrans_payment_method">
                                        </div>
                                    </div>

                                    <div v-if="payment_method.midtrans_payment_method == 1" class="form-group">
                                        <label for="midtrans_mode">{{ __('midtrans_payment_mode') }} <small>[ {{ __('sandbox') }} / {{ __('live') }} ]</small></label>
                                        <select name="midtrans_mode" id="midtrans_mode" :required="payment_method.midtrans_payment_method == 1" v-model="payment_method.midtrans_mode" class="form-control form-select">
                                            <option value="">{{ __('select_mode') }}</option>
                                            <option value="sandbox">{{ __('sandbox') }} (  {{ __('testing') }})</option>
                                            <option value="production">{{ __('production') }} (  {{ __('live') }})</option>
                                        </select>
                                    </div>

                                    <div v-if="payment_method.midtrans_payment_method == 1" class="form-group">
                                        <label for="midtrans_server_key">{{ __('server_key') }}</label>
                                        <input type="text" class="form-control" name="midtrans_server_key" id="midtrans_server_key" v-model="payment_method.midtrans_server_key" placeholder="Midtrans Server Key">
                                    </div>
                                    <div v-if="payment_method.midtrans_payment_method == 1" class="form-group">
                                        <label for="paypal_notification_url">{{ __('notification_url') }} <small>{{ __('set_webhook_url') }}</small></label>
                                        <input type="text" class="form-control" name="midtrans_notification_url" v-model="payment_method.midtrans_notification_url" placeholder="Midtrans Webhook URL" disabled="">
                                    </div>
                                    <div v-if="payment_method.midtrans_payment_method == 1" class="form-group">
                                        <label for="midtrans_return_url">{{ __('return_url') }} <small>{{ __('set_webhook_url') }}</small></label>
                                        <input type="text" class="form-control" name="midtrans_return_url" v-model="payment_method.midtrans_return_url" placeholder="Midtrans Return URL" disabled="">
                                        <small>{{ __('set_website_url') }}</small>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="col-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h4 class="card-title">{{ __('phonepay_payments') }}</h4>
                                </div>
                                <div class="card-body">

                                    <div class="form-group">
                                        <label for="phonepay_payment_method">{{ __('phonepay_payments') }}<small>[ {{ __('enable') }} / {{ __('disable') }} ] </small></label><br>
                                        <div class='form-check form-switch'>
                                            <input class='form-check-input' id="phonepay_payment_method" type='checkbox' true-value="1" false-value="0" v-model="payment_method.phonepay_payment_method" :checked="payment_method.phonepay_payment_method">
                                        </div>
                                    </div>

                                    <div v-if="payment_method.phonepay_payment_method == 1" class="form-group">
                                        <label for="phonepay_mode">{{ __('phonepay_payment_mode') }} <small>[ {{ __('sandbox') }} / {{ __('live') }} ]</small></label>
                                        <select name="phonepay_mode" id="phonepay_mode" :required="payment_method.phonepay_payment_method == 1" v-model="payment_method.phonepay_mode" class="form-control form-select">
                                            <option value="">{{ __('select_mode') }}</option>
                                            <option value="sandbox">{{ __('sandbox') }} (  {{ __('testing') }})</option>
                                            <option value="production">{{ __('production') }} (  {{ __('live') }})</option>
                                        </select>
                                    </div>

                                    <!-- <div v-if="payment_method.phonepay_payment_method == 1" class="form-group">
                                        <label for="phonepay_api_key">{{ __('api_key') }}</label>
                                        <input type="text" class="form-control" name="phonepay_api_key" id="phonepay_api_key" v-model="payment_method.phonepay_api_key" placeholder="Phonepe API Key">
                                    </div>
                                   
                                    <div v-if="payment_method.phonepay_payment_method == 1" class="form-group">
                                        <label for="phonepay_salt_index">{{ __('salt_index') }} </label>
                                        <input type="text" class="form-control" name="phonepay_salt_index" v-model="payment_method.phonepay_salt_index" placeholder="Phonepe Salt Index">
                                    </div>
                                    <div v-if="payment_method.phonepay_payment_method == 1" class="form-group">
                                        <label for="phonepay_app_id">{{ __('app_id') }} </label>
                                        <input type="text" class="form-control" name="phonepay_app_id" v-model="payment_method.phonepay_app_id" placeholder="App ID">
                                    </div> -->
                                    <div v-if="payment_method.phonepay_payment_method == 1" class="form-group">
                                        <label for="phonepay_merchant_id">{{ __('merchant_id') }} </label>
                                        <input type="text" class="form-control" name="phonepay_merchant_id" v-model="payment_method.phonepay_merchant_id" placeholder="Phonepe Merchant ID">
                                    </div>
                                    <div v-if="payment_method.phonepay_payment_method == 1" class="form-group">
                                        <label for="phonepay_client_id">{{ __('client_id') }}</label>
                                        <input type="text" class="form-control" name="phonepay_client_id" id="phonepay_client_id" v-model="payment_method.phonepay_client_id" placeholder="Phonepe Client ID">
                                    </div>
                                    <div v-if="payment_method.phonepay_payment_method == 1" class="form-group">
                                        <label for="phonepay_client_version">{{ __('client_version') }}</label>
                                        <input type="text" class="form-control" name="phonepay_client_version" id="phonepay_client_version" v-model="payment_method.phonepay_client_version" placeholder="Phonepe Client Version">
                                    </div>
                                    <div v-if="payment_method.phonepay_payment_method == 1" class="form-group">
                                        <label for="phonepay_client_secret">{{ __('client_secret') }}</label>
                                        <input type="text" class="form-control" name="phonepay_client_secret" id="phonepay_client_secret" v-model="payment_method.phonepay_client_secret" placeholder="Phonepe Client Secret">
                                    </div>

                                    <div v-if="payment_method.phonepay_payment_method == 1" class="form-group">
                                        <label for="phonepay_payment_endpoint_url">{{ __('payment_endpoint_url') }} </label>
                                        <input type="text" class="form-control" name="phonepay_payment_endpoint_url" v-model="payment_method.phonepay_payment_endpoint_url" placeholder="Phonepe Payment Endpoint URL">
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h4 class="card-title">{{ __('cashfree_payments') }}</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="phonepay_payment_method">{{ __('cashfree_payments') }}<small>[ {{ __('enable') }} / {{ __('disable') }} ] </small></label><br>
                                        <div class='form-check form-switch'>
                                            <input class='form-check-input' id="cashfree_payment_method" type='checkbox' true-value="1" false-value="0" v-model="payment_method.cashfree_payment_method" :checked="payment_method.cashfree_payment_method">
                                        </div>
                                    </div>
                                    <div v-if="payment_method.cashfree_payment_method == 1" class="form-group">
                                        <label for="cashfree_mode">{{ __('cashfree_payment_mode') }} <small>[ {{ __('sandbox') }} / {{ __('live') }} ]</small></label>
                                        <select name="cashfree_mode" id="cashfree_mode" :required="payment_method.cashfree_payment_method == 1" v-model="payment_method.cashfree_mode" class="form-control form-select">
                                            <option value="">{{ __('select_mode') }}</option>
                                            <option value="sandbox">{{ __('sandbox') }} (  {{ __('testing') }})</option>
                                            <option value="production">{{ __('production') }} (  {{ __('live') }})</option>
                                        </select>
                                    </div>

                                    <div v-if="payment_method.cashfree_payment_method == 1" class="form-group">
                                        <label for="cashfree_app_id">{{ __('app_id') }}</label>
                                        <input type="text" class="form-control" name="cashfree_app_id" id="cashfree_app_id" v-model="payment_method.cashfree_app_id" placeholder="Cashfree APP ID">
                                    </div>
                                    <div v-if="payment_method.cashfree_payment_method == 1" class="form-group">
                                        <label for="cashfree_secret_key">{{ __('secret_key') }} </label>
                                        <input type="text" class="form-control" name="cashfree_secret_key" v-model="payment_method.cashfree_secret_key" placeholder="Cashfree Secret Key">
                                    </div>
                                    <div v-if="payment_method.cashfree_payment_method == 1" class="form-group">
                                        <label for="cashfree_notification_url">{{ __('notification_url') }} <small>{{ __('set_webhook_url_for_cashfree') }}</small></label>
                                        <input type="text" class="form-control" name="cashfree_notification_url" v-model="payment_method.cashfree_notification_url" placeholder="Cashfree Webhook URL" disabled="">
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-6 mb-4">
                            <div class="card h-100">
                                <div class="card-header">
                                    <h4 class="card-title">{{ __('paytabs_payments') }}</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="paytabs_payment_method">{{ __('paytabs_payments') }}<small>[ {{ __('enable') }} / {{ __('disable') }} ] </small></label><br>
                                        <div class='form-check form-switch'>
                                            <input class='form-check-input' id="paytabs_payment_method" type='checkbox' true-value="1" false-value="0" v-model="payment_method.paytabs_payment_method" :checked="payment_method.paytabs_payment_method">
                                        </div>
                                    </div>
                                    <div v-if="payment_method.paytabs_payment_method == 1" class="form-group">
                                        <label for="paytabs_mode">{{ __('paytabs_payment_mode') }} <small>[ {{ __('sandbox') }} / {{ __('live') }} ]</small></label>
                                        <select name="paytabs_mode" id="paytabs_mode" :required="payment_method.paytabs_payment_method == 1" v-model="payment_method.paytabs_mode" class="form-control form-select">
                                            <option value="">{{ __('select_mode') }}</option>
                                            <option value="sandbox">{{ __('sandbox') }} (  {{ __('testing') }})</option>
                                            <option value="production">{{ __('production') }} (  {{ __('live') }})</option>
                                        </select>
                                    </div>

                                    <div v-if="payment_method.paytabs_payment_method == 1" class="form-group">
                                        <label for="paytabs_profile_id">{{ __('profile_id') }}</label>
                                        <input type="text" class="form-control" name="paytabs_profile_id" id="paytabs_profile_id" v-model="payment_method.paytabs_profile_id" placeholder="Paytabs Profile ID">
                                    </div>
                                    <div v-if="payment_method.paytabs_payment_method == 1" class="form-group">
                                        <label for="paytabs_secret_key">{{ __('secret_key') }} </label>
                                        <input type="text" class="form-control" name="paytabs_secret_key" v-model="payment_method.paytabs_secret_key" placeholder="Paytabs Secret Key">
                                    </div>
                                    <div v-if="payment_method.paytabs_payment_method == 1" class="form-group">
                                        <label for="paytabs_notification_url">{{ __('notification_url') }} <small>{{ __('set_webhook_url_for_paytabs') }}</small></label>
                                        <input type="text" class="form-control" name="paytabs_notification_url" v-model="payment_method.paytabs_notification_url" placeholder="Paytabs Webhook URL" disabled="">
                                    </div>

                                </div>
                            </div>
                        </div>

                        
                        <div class="form-group">
                            <b-button type="submit" id="btn_update" variant="primary" :disabled="isLoading" v-if="$can('manage_payment_methods')"> {{ __('update') }}
                                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                            </b-button>
                        </div>

                    </div>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: function () {
        return {
            isLoading:false,
            payment_method: {
                payment_method_settings: 0,
                cod_payment_method: 0,
                cod_mode:"",

                paypal_payment_method: 0,
                paypal_mode:"",
                paypal_currency_code:"",
                paypal_business_email:"",
                paypal_notification_url: this.$baseUrl+"/customer/ipn",

                payumoney_payment_method: 0,
                payumoney_mode:"",
                payumoney_merchant_key: "",
                payumoney_merchant_id: "",
                payumoney_salt: "",
                razorpay_payment_method: 0,
                razorpay_key: "",
                razorpay_secret_key: "",
                paystack_payment_method: 0,
                paystack_public_key: "",
                paystack_secret_key: "",
                paystack_currency_code:"",
                flutterwave_payment_method: 0,
                flutterwave_public_key: "",
                flutterwave_secret_key: "",
                flutterwave_encryption_key: "",
                flutterwave_currency_code:"",

                stripe_payment_method: 0,
                stripe_publishable_key: "",
                stripe_secret_key: "",

                stripe_webhook_secret_key: "",
                stripe_webhook_url: this.$baseUrl+"/webhook/stripe",
                stripe_currency_code: "",
                stripe_mode: "",

                paytm_payment_method: 0,
                paytm_mode: "",
                paytm_merchant_key: "",
                paytm_merchant_id: "",
                ssl_commerce_payment_method: 0,
                ssl_commerece_mode: "",
                ssl_commerece_store_id: "",
                ssl_commerece_secret_key: "",
                direct_bank_transfer: 0,
                account_name: "",
                account_number: "",
                bank_name: "",
                bank_code: "",
                notes: "",

                midtrans_payment_method: 0,
                midtrans_mode: "",
                midtrans_server_key: "",
                midtrans_notification_url: this.$baseUrl+"/midtrans/callback",
                midtrans_return_url: this.$websiteUrl+"/web-payment-status",

                phonepay_payment_method: 0,
                phonepay_mode: "",
                //phonepay_api_key: "",
                //phonepay_salt_index: "",
                //phonepay_app_id: "",
                phonepay_merchant_id: "",
                phonepay_client_id: "",
                phonepay_client_version: "",
                phonepay_client_secret: "",
                phonepay_payment_endpoint_url: this.$baseUrl+"/phonepe/callback",

                cashfree_payment_method: 0,
                cashfree_mode: "",
                cashfree_app_id: "",
                cashfree_secret_key: "",
                cashfree_notification_url: this.$baseUrl+"/cashfree/callback",

                paytabs_payment_method: 0,
                paytabs_mode: "",
                paytabs_profile_id: "",
                paytabs_secret_key: "",
                paytabs_notification_url: this.$baseUrl+"/paytabs/callback",
            },
            record: null
        }
    },
    created: function () {
        this.getPaymentMethods()
    },
    methods: {
        getPaymentMethods() {
            axios.get(this.$apiUrl + '/payment_methods').then((response) => {
                if(response.data.data) {
                    this.record = response.data.data;

                    this.payment_method.payment_method_settings = this.record.payment_method_settings ?? 0;
                    this.payment_method.cod_payment_method = this.record.cod_payment_method??0;
                    this.payment_method.cod_mode = this.record.cod_mode??"";
                    this.payment_method.paypal_payment_method = this.record.paypal_payment_method;
                    this.payment_method.paypal_mode = this.record.paypal_mode??"";
                    this.payment_method.paypal_currency_code = this.record.paypal_currency_code??"";
                    this.payment_method.paypal_business_email = this.record.paypal_business_email;
                    this.payment_method.paypal_notification_url = this.record.paypal_notification_url??"";

                    this.payment_method.payumoney_payment_method = this.record.payumoney_payment_method;
                    this.payment_method.payumoney_mode = this.record.payumoney_mode??"";
                    this.payment_method.payumoney_merchant_key = this.record.payumoney_merchant_key;
                    this.payment_method.payumoney_merchant_id = this.record.payumoney_merchant_id;
                    this.payment_method.payumoney_salt = this.record.payumoney_salt;
                    this.payment_method.razorpay_payment_method = this.record.razorpay_payment_method;
                    this.payment_method.razorpay_key = this.record.razorpay_key;
                    this.payment_method.razorpay_secret_key = this.record.razorpay_secret_key;
                    this.payment_method.paystack_payment_method = this.record.paystack_payment_method;
                    this.payment_method.paystack_public_key = this.record.paystack_public_key;
                    this.payment_method.paystack_secret_key = this.record.paystack_secret_key;
                    this.payment_method.paystack_currency_code = this.record.paystack_currency_code??"";

                    this.payment_method.flutterwave_payment_method = this.record.flutterwave_payment_method;
                    this.payment_method.flutterwave_public_key = this.record.flutterwave_public_key;
                    this.payment_method.flutterwave_secret_key = this.record.flutterwave_secret_key;
                    this.payment_method.flutterwave_encryption_key = this.record.flutterwave_encryption_key;
                    this.payment_method.flutterwave_currency_code = this.record.flutterwave_currency_code??"";
                    this.payment_method.midtrans_payment_method = this.record.midtrans_payment_method;

                    this.payment_method.stripe_payment_method = this.record.stripe_payment_method;
                    this.payment_method.stripe_publishable_key = this.record.stripe_publishable_key;
                    this.payment_method.stripe_secret_key = this.record.stripe_secret_key;
                    this.payment_method.stripe_webhook_secret_key = this.record.stripe_webhook_secret_key;
                    this.payment_method.stripe_webhook_url = this.record.stripe_webhook_url ?? "";
                    this.payment_method.stripe_currency_code = this.record.stripe_currency_code;
                    this.payment_method.stripe_mode = this.record.stripe_mode;

                    this.payment_method.paytm_payment_method = this.record.paytm_payment_method;
                    this.payment_method.paytm_mode = this.record.paytm_mode ?? "";
                    this.payment_method.paytm_merchant_key = this.record.paytm_merchant_key;
                    this.payment_method.paytm_merchant_id = this.record.paytm_merchant_id;

                    this.payment_method.ssl_commerce_payment_method = this.record.ssl_commerce_payment_method;
                    this.payment_method.ssl_commerece_mode = this.record.ssl_commerece_mode??"";
                    this.payment_method.ssl_commerece_store_id = this.record.ssl_commerece_store_id;
                    this.payment_method.ssl_commerece_secret_key = this.record.ssl_commerece_secret_key;
                    this.payment_method.direct_bank_transfer = this.record.direct_bank_transfer;
                    this.payment_method.account_name = this.record.account_name;
                    this.payment_method.account_number = this.record.account_number;
                    this.payment_method.bank_name = this.record.bank_name;
                    this.payment_method.bank_code = this.record.bank_code;
                    this.payment_method.notes = this.record.notes;

                    this.payment_method.midtrans_payment_method = this.record.midtrans_payment_method;
                    this.payment_method.midtrans_mode = this.record.midtrans_mode;
                    this.payment_method.midtrans_server_key = this.record.midtrans_server_key;

                    this.payment_method.phonepay_payment_method = this.record.phonepay_payment_method;
                    this.payment_method.phonepay_mode = this.record.phonepay_mode;
                    // this.payment_method.phonepay_api_key = this.record.phonepay_api_key;
                    this.payment_method.phonepay_merchant_id = this.record.phonepay_merchant_id;
                    // this.payment_method.phonepay_salt_index = this.record.phonepay_salt_index;
                    // this.payment_method.phonepay_app_id = this.record.phonepay_app_id;
                    this.payment_method.phonepay_client_id = this.record.phonepay_client_id;
                    this.payment_method.phonepay_client_version = this.record.phonepay_client_version;
                    this.payment_method.phonepay_client_secret = this.record.phonepay_client_secret;
                    this.payment_method.phonepay_payment_endpoint_url = this.record.phonepay_payment_endpoint_url;

                    this.payment_method.cashfree_payment_method = this.record.cashfree_payment_method;
                    this.payment_method.cashfree_mode = this.record.cashfree_mode;
                    this.payment_method.cashfree_app_id = this.record.cashfree_app_id;
                    this.payment_method.cashfree_secret_key = this.record.cashfree_secret_key;

                    this.payment_method.paytabs_payment_method = this.record.paytabs_payment_method;
                    this.payment_method.paytabs_mode = this.record.paytabs_mode;
                    this.payment_method.paytabs_profile_id = this.record.paytabs_profile_id;
                    this.payment_method.paytabs_secret_key = this.record.paytabs_secret_key;
                }
            });
        },
        saveRecord: function(){
            this.isLoading = true;
            let payment_methodObject = this.payment_method;
            let formData = new FormData();
            for (let key in payment_methodObject) {
                if(payment_methodObject[key] == false){
                    formData.append(key, 0);
                }else if(payment_methodObject[key] == true){
                    formData.append(key, 1);
                }else{
                    formData.append(key, payment_methodObject[key]);
                }
            }


            let vm = this;
            if (this.payment_method.cod_payment_method == 1 ||
                this.payment_method.paypal_payment_method == 1 ||
                this.payment_method.razorpay_payment_method == 1 ||
                this.payment_method.paystack_payment_method == 1 ||
                this.payment_method.stripe_payment_method == 1 ||
                this.payment_method.paytm_payment_method == 1 ||
                this.payment_method.midtrans_payment_method == 1 ||
                this.payment_method.phonepay_payment_method == 1 || 
                this.payment_method.cashfree_payment_method == 1 ||
                this.payment_method.paytabs_payment_method == 1) {
                    

            let url = this.$apiUrl + '/payment_methods/save';
       
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function() {
                            vm.$swal.close();
                            vm.getPaymentMethods();
                            vm.$router.push({path:'/payment_methods'});
                            vm.isLoading = false;
                        }, 100);
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
                vm.isLoading = false;
            });
     
} else {
  this.showMessage("error", "At lease one payment method is should enable");
      vm.isLoading = false;

        }
        }
    }
}
</script>
