<template>
    <div class="city-picker">
        <label class="province" :class="isChrome">
          <select
            :value="provinceValue"
            @change="onchange('province', $event.target.value)">
            <option value="" v-text="placeholder.province"></option>
            <option v-for="(text, value) in provinceList"
                :value="value"
                :selected="value===provinceValue"
                v-text="text">
            </option>
          </select>
        </label>

        <label class="city" :class="isChrome">
          <select
            :value="cityValue"
            @change="onchange('city', $event.target.value)">
            <option value="" v-text="placeholder.city"></option>
            <option v-for="(text, value) in cityList"
                :value="value"
                :selected="value===cityValue"
                v-text="text">
            </option>
          </select>
        </label>

        <label class="district" v-show="!twoSelect" :class="isChrome">
          <select
            :value="districtValue"
            @change="onchange('district', $event.target.value)">
            <option value="" v-text="placeholder.district"></option>
            <option v-for="(text, value) in districtList"
                :value="value"
                :selected="value===districtValue"
                v-text="text">
            </option>
          </select>
        </label>
    </div>
</template>

<script>
/**
 * @file area-picker
 * @author tangciwei(tangciwei@qq.com)
 *
 * @since 2016-12-15
 */

import Vue from 'vue';
import REGION_DATA from 'china-area-data';

let provinceList = REGION_DATA['86'];
// 根据字符串获取name值；
let getValue = (list, name) => {
    if (name) {
        for (let k in list) {
            if (list.hasOwnProperty(k)) {
                if (list[k].indexOf(name) !== -1) {
                    return k;
                }
            }
        }
    }
};

export default {
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
            default() {
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
    data() {
        return {
            is: 'city-picker',
            // 可改变值
            provinceValue: '',
            cityValue: '',
            districtValue: '',
            // 列表
            provinceList,
            cityList: {},
            districtList: {}
        };
    },
    computed: {
        isChrome() {
            return {
                'is-chrome': window.navigator.userAgent.indexOf('Chrome') !== -1;
            };
        }
    },
    // 解析数据
    created() {
        let provinceValue = getValue(provinceList, this.province);

        if (provinceValue) {
            this.provinceValue = provinceValue;
            this.cityList = REGION_DATA[provinceValue];

            let cityValue = getValue(this.cityList, this.city);
            if (cityValue) {
                this.cityValue = cityValue;
                this.districtList = REGION_DATA[cityValue];

                let districtValue = getValue(this.districtList, this.district);
                if (districtValue) {
                    this.districtValue = districtValue;
                }
            }
        }
    },
    methods: {
        onchange(type, val) {
            if (type === 'province') {
                this.provinceValue = val;

                this.cityList = {};
                this.cityValue = '';
                this.districtList = {};
                this.districtValue = '';

                if (val) {
                    this.cityList = REGION_DATA[val];

                }
            }
            else if (type === 'city') {
                this.cityValue = val;

                this.districtList = {};
                this.districtValue = '';

                if (val) {
                    this.districtList = REGION_DATA[val];

                }
            }
            else if (type === 'district') {
                this.districtValue = val;
            }

            this.$emit('onchange', {
                province: {
                    value: this.provinceValue,
                    text: this.provinceValue
                        ? provinceList[this.provinceValue]
                        : ''
                },
                city: {
                    value: this.cityValue,
                    text: this.cityValue
                        ? this.cityList[this.cityValue]
                        : ''
                },
                district: {
                    value: this.districtValue,
                    text: this.districtValue
                        ? this.districtList[this.districtValue]
                        : ''
                }
            });
        }
    }
};
</script>
<style lang="less" scoped rel="stylesheet/less">
    label{
        position: relative;
        float: left;
        box-sizing: border-box;
        width: 195px;
        height: 40px;
        overflow: hidden;
        // 三角形
        &:after, &:before{
            content: ' ';
            position: absolute;
            top: 14px;
            right: 10px;

            width: 0;
            height: 0;

            border: 6px solid transparent;
            border-left: 6px solid #fff;
        }
        &:before{
            border-left-color: #ccc;
            right: 8px;
        }
    }
    label + label{
        margin-left: 10px;
    }
    select{
        appearance:none;
        background:transparent;
        border:none;

        padding-left:20px;
        width: 195px;
        height:100%;

        border: 1px solid #ccc;
        border-radius: 2px;

        font-size: 14px;
        color: #7a7a7a;
        line-height: 38px;
        cursor: pointer;
    }
</style>
