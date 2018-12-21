<template>
<el-form :model="ruleForm" :rules="rules" :inline="true" size="mini" ref="ruleForm" class="demo-ruleForm">
    <el-form-item prop="keyword" label="输入查询">
        <el-input v-model.trim="ruleForm.keyword" placeholder="账户名/用户名" v-if="activeName == 'user'"></el-input>
        <el-input v-model.trim="ruleForm.keyword" placeholder="账户名/员工姓名" v-else-if="activeName == 'staff'"></el-input>
        <el-input v-model.trim="ruleForm.keyword" placeholder="账户名/外围商务姓名" v-else-if="activeName == 'periphery'"></el-input>
        <el-input v-model.trim="ruleForm.keyword" placeholder="账户名/商家名称" v-else></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleFormSubmit">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="handleFormReset">重置</el-button>
    </el-form-item>
</el-form>
</template>

<script>
export default {
    props: {
        activeName: {
            default: () => []
        }
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            ruleForm: {
                keyword: ''
            },
            rules: {
                /*keyword: [{
                    required: true,
                    message: '请输入查询内容',
                    trigger: 'blur'
                }]*/
            }
        }

    },
    methods: {
        handleChangeFormSubmit(val) {
            this.$emit('submit', this.ruleForm)
        },
        handleFormSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$emit('submit', this.ruleForm)
                } else {
                    return false
                }
            })
        },
        handleFormReset() {
            this.$refs.ruleForm.resetFields()
            //this.$emit('submit', this.ruleForm)
        }
    }
}
</script>

<style lang="scss" scoped>
.el-form-item {
    margin-bottom: 0;
}
</style>
