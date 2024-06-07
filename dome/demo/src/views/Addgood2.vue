<template lang="">
  <div>
    <!-- 表单数据 -->
    <el-card class="box-card">
       <div slot="header" class="clearfix">
    <span>添加商品</span>
    </div>
     <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="商品名称" prop="name">
    <el-input v-model="form.name" ></el-input>
  </el-form-item>
  <el-form-item label="商品价格" prop="price">
    <el-input v-model="form.price"></el-input>
  </el-form-item>
   <el-form-item label="商品数量">
    <el-input v-model="form.num"></el-input>
  </el-form-item>
  <el-form-item label="商品状态">
    <el-select v-model="form.status" placeholder="请选择商品状态">
            <el-option label="在售" :value="1"></el-option>
            <el-option label="热销" :value="2"></el-option>
            <el-option label="库存充足" :value="3"></el-option>
            <el-option label="预售" :value="4"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="商品介绍">
    <el-input type="textarea" v-model="form.remark"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm()">提交</el-button>
    <el-button>重置</el-button>
  </el-form-item>
</el-form>
   </el-card>
   <!-- 列表数据 -->
    <el-card style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span>商品数据列表</span>
      </div>
     <el-table
      :data="goodList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="num"
        label="商品数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品价格">
      </el-table-column>
         <el-table-column
        prop="status"
        label="商品状态">
      </el-table-column>
       </el-table-column>
         <el-table-column
        prop="remark"
        label="商品介绍">
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
 data() {
      return {
        form: {
          name: '',
           price: null,
           num: null,
          status: null,
          remark: ''
        },
         goodList: []
      }
    },
    methods: {
      //   onSubmit() {
      //   console.log('submit!');
      // },
       // 提交时要验证表单必填项有没有填写完整,没有的话需要提示用户填写完整
    submitForm() {
          axios({
            url: 'http://127.0.0.1:3000/add',
            method: 'post',
            data: this.form
          }).then((res) => {
            if (res.data.code == 200) {
              this.getGood()
            }
          })
    },
    getGood() {
      axios({
        url: 'http://127.0.0.1:3000/goods',
      }).then(res => {
        if (res.data.code == 200) {
          this.goodList = res.data.data
        }
      })
    },
  
    },
       // 请求数据方法需要再生命周期钩子中调用,例如created,mounted
  mounted() {
    this.getGood()
  }
}
</script>
<style lang="">
</style>