<template>
  <div>Vue文件环境测试<img :src="myimg" alt=""></div>
</template>

<script>
import myimg from "../assets/images/timg.jpg";
export default {
  data() {
    return {
      myimg,
    };
  },
};
</script>

<style>
</style>