---
title: 关于
nav: 
  title: 响应式
  order: 1
---

## 介绍

`SpeedForm`底层数据由`@speedform/reactive`提供响应式系统驱动，它可以让你在表单开发中更加灵活、快速地处理数据。

- `@speedform/reactive`底层的响应式系统由[helux](https://heluxjs.github.io/helux/guide)驱动，`helux`是一个具备派生计算、依赖收集、信号的响应式状态管理库，它的设计理念与`SpeedForm`的设计理念高度契合，为`SpeedForm`提供了强大的数据驱动能力。
- `@speedform/reactive`是在`helux`的基础上，封装了用来提供更加易用友好的状态库管理。
- 作为`SpeedForm`的底层依赖，了解和掌握`@speedform/reactive`的原理和使用方法，可以让你更加深入理解`SpeedForm`的设计理念和使用方法。


## 安装

`SpeedForm`依赖于`@speedform/reactive`，安装`SpeedForm`后就已经安装了`@speedform/reactive`，也可以独立安装使用`@speedform/reactive`。

```shell

pnpm add @speedform/reactive
npm install @speedform/reactive
yarn add @speedform/reactive

```
