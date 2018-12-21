<template>
    <el-form
            :inline="true"
            :model="form"
            :rules="rules"
            ref="form"
            size="mini"
            style="margin-bottom: -18px;">
        <el-row type="flex" justify="space-between">
            <el-col :span="16">
                <el-form-item prop="name">
                    <el-input
                            v-model="form.name"
                            placeholder="用户组名称模糊检索"
                            style="width: 200px;"/>
                </el-form-item>

                <el-form-item>
                    <el-button
                            type="primary"
                            @click="handleFormSubmit(false,'head')">
                        <d2-icon name="search"/>
                        查询
                    </el-button>
                </el-form-item>

                <el-form-item>
                    <el-button
                            @click="handleFormReset">
                        <d2-icon name="refresh"/>
                        重置
                    </el-button>
                </el-form-item>
                
            </el-col>
            <el-form-item>
                <el-button
                        type="success"
                        @click="addEm">
                    <d2-icon name="plus"/>
                    新增
                </el-button>
            </el-form-item>
        </el-row>

    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: ''
                },
                rules: {
                    // name: [{required: true, message: '请输入编码或名称', trigger: 'blur'}]
                }
            }
        },
        methods: {
            handleFormSubmit(validated = true, from) {
                if (validated) {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            this.$emit('submit', this.form, from)
                        } else {
                            return false
                        }
                    })
                } else {
                    this.$emit('submit', this.form, from)
                }
            },
            handleFormReset() {
                this.$refs.form.resetFields()
                // this.$emit('submit', this.form)
            },
            addEm() {
                this.$emit('addLayer')
            }
        }
    }
</script>
