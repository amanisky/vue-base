<template>
    <el-dialog :title="dialogTitle" :visible.sync="emDialogVisible" custom-class="employees-dialog" @close="reset">
        <el-form :model="dialogForm" :rules="rules" style="padding: 0 40px 0 0" ref="dialogForm">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="dialogForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
                <el-input v-model="dialogForm.description" auto-complete="off" placeholder="请输入描述" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }"></el-input>
            </el-form-item>
            <el-form-item label="编码" :label-width="formLabelWidth" prop="code">
                <el-input v-model="dialogForm.code" auto-complete="off" placeholder="请输入编码"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelDialog">取 消</el-button>
            <el-button type="primary" @click="showDialog">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        { min: 1, max: 20, message: '姓名长度在 1 到 20 个字符' }
                    ],
                    description: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                        { min: 1, max: 100, message: '描述长度在 1 到 100 个字符' }
                    ],
                    code: [{required: true, message: '请输入编码', trigger: 'blur'}]
                },
                formLabelWidth: '120px',
                currentValue: false,
                disabled: false,
                emDialogVisible: false
            }
        },
        props: {
            dialogForm: {
                default: {
                    code: '',
                    description: '',
                    id: 0,
                    name: ''
                }
            },
            dialogTitle: '',
            changeNum: 0,
        },
        methods: {
            showDialog(validated = true) {
                if (validated) {
                    this.$refs.dialogForm.validate((valid) => {
                        if (valid) {
                            this.$emit('keepData', this.dialogForm)
                        } else {
                            return false
                        }
                    })
                } else {
                    this.$emit('keepData', this.dialogForm)
                }
            },
            cancelDialog() {
                this.emDialogVisible = false
                this.reset()
            },
            reset(){
                this.$refs.dialogForm.resetFields()
            }
        }
    }
</script>

<style scoped lang="scss">
    .employees-dialog {
        .el-input, .el-select {
            width: 100%;
        }
    }
</style>
