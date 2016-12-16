'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _chinaAreaData = require('china-area-data');

var _chinaAreaData2 = _interopRequireDefault(_chinaAreaData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file area-picker
 * @author tangciwei(tangciwei@qq.com)
 *
 * @since 2016-12-15
 */

var provinceList = _chinaAreaData2.default['86'];
// 根据字符串获取name值；
var getValue = function getValue(list, name) {
    if (name) {
        for (var k in list) {
            if (list.hasOwnProperty(k)) {
                if (list[k].indexOf(name) !== -1) {
                    return k;
                }
            }
        }
    }
};

exports.default = {
    template: '\n        <div class="city-picker">\n            <label class="province">\n              <select\n                :value="provinceValue"\n                @change="onchange(\'province\', $event.target.value)">\n                <option value="" v-text="placeholder.province"></option>\n                <option v-for="(text, value) in provinceList"\n                    :value="value"\n                    :selected="value===provinceValue"\n                    v-text="text">\n                </option>\n              </select>\n            </label>\n\n            <label class="city">\n              <select\n                :value="cityValue"\n                @change="onchange(\'city\', $event.target.value)">\n                <option value="" v-text="placeholder.city"></option>\n                <option v-for="(text, value) in cityList"\n                    :value="value"\n                    :selected="value===cityValue"\n                    v-text="text">\n                </option>\n              </select>\n            </label>\n\n            <label class="district" v-show="!twoSelect">\n              <select\n                :value="districtValue"\n                @change="onchange(\'district\', $event.target.value)">\n                <option value="" v-text="placeholder.district"></option>\n                <option v-for="(text, value) in districtList"\n                    :value="value"\n                    :selected="value===districtValue"\n                    v-text="text">\n                </option>\n              </select>\n            </label>\n        </div>\n    ',
    props: {
        province: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        district: {
            type: String,
            default: ''
        },
        placeholder: {
            type: Object,
            default: function _default() {
                return {
                    province: '请选择',
                    city: '请选择',
                    district: '请选择'
                };
            }
        },
        // 只展示两级
        twoSelect: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            is: 'city-picker',
            // 可改变值
            provinceValue: '',
            cityValue: '',
            districtValue: '',
            // 列表
            provinceList: provinceList,
            cityList: {},
            districtList: {}
        };
    },

    // 解析数据
    created: function created() {
        var provinceValue = getValue(provinceList, this.province);

        if (provinceValue) {
            this.provinceValue = provinceValue;
            this.cityList = _chinaAreaData2.default[provinceValue];

            var cityValue = getValue(this.cityList, this.city);
            if (cityValue) {
                this.cityValue = cityValue;
                this.districtList = _chinaAreaData2.default[cityValue];

                var districtValue = getValue(this.districtList, this.district);
                if (districtValue) {
                    this.districtValue = districtValue;
                }
            }
        }
    },

    methods: {
        onchange: function onchange(type, val) {
            if (type === 'province') {
                this.provinceValue = val;

                this.cityList = {};
                this.cityValue = '';
                this.districtList = {};
                this.districtValue = '';

                if (val) {
                    this.cityList = _chinaAreaData2.default[val];
                }
            } else if (type === 'city') {
                this.cityValue = val;

                this.districtList = {};
                this.districtValue = '';

                if (val) {
                    this.districtList = _chinaAreaData2.default[val];
                }
            } else if (type === 'district') {
                this.districtValue = val;
            }

            this.$emit('onchange', {
                province: {
                    value: this.provinceValue,
                    text: this.provinceValue ? provinceList[this.provinceValue] : ''
                },
                city: {
                    value: this.cityValue,
                    text: this.cityValue ? this.cityList[this.cityValue] : ''
                },
                district: {
                    value: this.districtValue,
                    text: this.districtValue ? this.districtList[this.districtValue] : ''
                }
            });
        }
    }
};