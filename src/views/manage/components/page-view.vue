<template>
<el-dialog title="奖金结算" :visible.sync="viewDialogVisible" width="35%" center :before-close="handleClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
            <span>{{currentData.name}}</span>
        </el-form-item>
        <el-form-item label="账户名">
            <span>{{currentData.accountName}}</span>
        </el-form-item>
        <el-form-item prop="bankcardId" label="银行卡号">
            <el-select v-model="ruleForm.bankcardId" placeholder="请选择银行卡号">
                <el-option v-for="item in currentData.bankCardList" :key="item.bankCardId" :label="item.bankCardNo" :value="item.bankCardId">
                    <span>{{item.bankCardNo}}（{{item.bankName}}）</span>
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="银行服务费">
            <span>2.00 元</span>
        </el-form-item>
        <el-form-item prop="fee" label="结算金额">
            <el-row type="flex">
                <el-input v-model.trim="ruleForm.fee" placeholder="请输入金额" style="width: 200px" @blur="handleCommissionFree"></el-input>
                <div class="d2-ml-10 d2-mr-10">剩余 {{restFree}} 元可结算</div>
                <el-button type="text" @click="handleAllcommission">全部结算</el-button>
            </el-row>
        </el-form-item>
        <el-form-item prop="period" label="结算周期">
            <el-select v-model="ruleForm.period" placeholder="请选择结算周期">
                <el-option label="T+0" value="0"></el-option>
                <el-option label="T+1" value="1"></el-option>
                <el-option label="T+2" value="2"></el-option>
                <el-option label="T+3" value="3"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleFormSubmit">确定</el-button>
            <el-button @click="handleFormReset">取消</el-button>
        </el-form-item>
    </el-form>
</el-dialog>
</template>

<script>
export default {
    props: {
        currentData: {
            default: () => {}
        },
        viewDialogVisible: {
            default: false
        }
    },
    data() {
        const validateMoney = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('请输入结算金额'))
            } else if (Number(value) <= 1) {
                callback(new Error('结算金额必须大于1'))
            } else if (Number(value) > this.currentData.toBeWithdrawFee) {
                callback(new Error('结算金额不能大于可结算金额'))
            } else {
                callback()
            }
        }
        return {
            restFree: this.currentData.toBeWithdrawFee,
            ruleForm: {
                bankcardId: this.currentData,
                fee: '',
                period: ''
            },
            rules: {
                bankcardId: [{
                    required: true,
                    message: '请选择银行卡号',
                    trigger: 'change'
                }],
                fee: [{
                    required: true,
                    validator: validateMoney,
                    trigger: 'change'
                }],
                period: [{
                    required: true,
                    message: '请选择结算周期',
                    trigger: 'change'
                }]
            }
        }
    },
    methods: {
        // 全部结算
        handleAllcommission() {
            //this.$refs.ruleForm.resetFields()
            let fee = this.currentData.toBeWithdrawFee - 0
            fee = fee < 0 ? 0 : fee
            this.ruleForm = {
                ...this.ruleForm,
                fee: fee.toFixed(2)
            }

            this.restFree = '0.00'

            /*this.$nextTick(() => {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        return true
                    } else {
                        return false
                    }
                })
            })*/
        },
        handleCommissionFree(event) {
            let val = event.target.value
            if (Number(val) > 1 && Number(val) <= this.currentData.toBeWithdrawFee) {
                const restFree = this.currentData.toBeWithdrawFee - val
                this.restFree = restFree.toFixed(2)
            }
        },
        // 结算信息提交
        handleFormSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$emit('submit', {
                        ...this.ruleForm,
                        userId: this.currentData.userId
                    })
                } else {
                    return false
                }
            })
        },
        // 表单重置
        handleFormReset() {
            this.$refs.ruleForm.resetFields()
            this.$emit('close')
        },
        // 关闭弹框
        handleClose() {
            this.$refs.ruleForm.resetFields()
            this.$emit('close')
        }
    }
}
</script>
