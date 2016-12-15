# area-picker

## Description

> 地区选择组件vue2.0版

## Useage

```html
<area-picker></area-picker>
```

## Dependencies

- china-area-data

## Property

|property|type|require|default|description|
|---|---|---|---|---|
| province |string  |false| `''` | 省份名 |
| city |string  |false| `''` | 城市名 |
| district |string  |false| `''` |  地区名|
|twoSelect|boolean|false|false|是否只展示两列
| placeholder |Object  |false| `{"province":"请选择","city":"请选择","district":"请选择"}` | 提示 |


## Event
|type|description|
|---|---|
|onchange|有选择就会触发|

## Changelog

* 版本：0.0.1，日期：2016-12-15，描述：create

