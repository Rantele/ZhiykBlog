
<!--  -->
<template>
  <section class="page_404">
    <div class="container">
      <el-row :gutter="24" justify="center" style="margin-right:0px;margin-left: 0px;">
        <el-col :span="12">
          <div class="four_zero_four_bg">
            <h1 class="text-center ">404</h1>
          </div>
          <div class="contant_box_404">
            <h3 class="h2">
              Look like you're lost
            </h3>
            <p>the page you are looking for not avaible!</p>
            <a href="/" class="link_404">Go to Home</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'

</script>
<style lang='less' scoped>
.container {
  text-align: center;
}

.page_404 {
  padding: 40px 0;
  background: #fff;
  font-family: 'Arvo', serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {

  background-image: url('@/assets/dribbble.gif');
  height: 400px;
  background-position: center;
}


.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
  text-decoration: unset;
}

.contant_box_404 {
  margin-top: -50px;
}
</style>
