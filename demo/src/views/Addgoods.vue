<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加某个商品</span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称:" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model.number="ruleForm.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model.number="ruleForm.num" placeholder="请输入商品数量"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="status">
          <el-select style="width: 100%;" v-model="ruleForm.status" placeholder="请选择商品状态">
            <el-option label="在售" :value="1"></el-option>
            <el-option label="热销" :value="2"></el-option>
            <el-option label="库存充足" :value="3"></el-option>
            <el-option label="预售" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品介绍" prop="remark">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="ruleForm.remark">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span>商品数据列表</span>
      </div>
      <el-table :data="goodList" style="width: 100%">
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="num" label="商品数量">
          <template slot-scope="scope">
            <span>{{ scope.row.num }} 件</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品价格">
          <template slot-scope="scope">
            <span>￥{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="商品状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1">在售</el-tag>
            <el-tag type="success" v-if="scope.row.status == 2">热销</el-tag>
            <el-tag type="success" v-if="scope.row.status == 3">库存充足</el-tag>
            <el-tag type="danger" v-if="scope.row.status == 4">预售</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="商品介绍" width="400"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// 导入请求工具,例如：JQuery中的Ajax、Fetch请求方法等等
import axios from 'axios'
export default {
  data() {
    // 商品名称校验规则
    var validateName = (rule, value, callback) => {
      if (value.trim().replace(/\s/g, '') != '') {
        callback()
      } else {
        callback(new Error('商品名称输入内容不能为空'))
      }
    };
    // 商品价格校验规则
    var validatePrice = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('商品价格输入内容不能为空'))
      }
    };
    // 商品数量校验规则
    var validateNum = (rule, value, callback) => {
      if (value) {
        callback()
      } else if (value == 0) {
        callback(new Error('商品数量不能为零'))
      } else {
        callback(new Error('商品数量输入内容不能为空'))
      }
    };
    // 商品介绍校验规则
    var validateRemark = (rule, value, callback) => {
      if (value.trim().replace(/\s/g, '') != '') {
        callback()
      } else {
        callback(new Error('商品介绍输入内容不能为空'))
      }
    };
    return {
      // 存放的数据
      ruleForm: {
        name: '',
        price: null,
        num: null,
        status: null,
        remark: ''
      },
      // 从后端请求回来的数据存放位置
      goodList: [],
      // 校验规则
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        price: [
          { validator: validatePrice, trigger: 'blur' }
        ],
        num: [
          { validator: validateNum, trigger: 'blur' }
        ],
        remark: [
          { validator: validateRemark, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    // 提交时要验证表单必填项有没有填写完整,没有的话需要提示用户填写完整
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            url: 'http://127.0.0.1:3000/add',
            method: 'post',
            data: this.ruleForm
          }).then((res) => {
            if (res.data.code == 200) {
              this.getGood()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '表单必填项没有填写完整'
          })
          return false;
        }
      });
    },
    // 清空表单填写内容
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 请求数据的方法
    getGood() {
      axios({
        url: 'http://127.0.0.1:3000/goods',
      }).then(res => {
        if (res.data.code == 200) {
          this.goodList = res.data.data
        }
      })
    }
  },
  // 请求数据方法需要再生命周期钩子中调用,例如created,mounted
  mounted() {
    this.getGood()
  }
}
</script>

<style lang="less"></style>
