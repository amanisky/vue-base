<template>
<el-table :data="currentTableData" v-loading="loading" size="mini" stripe @selection-change="handleSelectionChange">
    <!--
    <el-table-column type="selection" width="50"></el-table-column>
    -->
    <el-table-column prop="name" label="员工姓名" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="phone" label="手机号" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="bankCardNo" label="收款银行卡号" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="totalCommission" label="累计结算奖金" align="center"></el-table-column>
    <el-table-column prop="toBeWithdrawFee" label="待提现奖金/账户余额" align="center"></el-table-column>
    <!-- <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
            <el-button @click="handleView(scope.row, scope.$index)" size="mini" type="primary" :disabled="!scope.row.bankCardNo || Number(scope.row.toBeWithdrawFee) < 1">提现</el-button>
        </template>
    </el-table-column> -->
</el-table>
</template>

<script>
export default {
    props: {
        tableData: {
            default: () => []
        },
        loading: {
            default: false
        }
    },
    data() {
        return {
            currentTableData: [],
            multipleSelection: []
        }
    },
    watch: {
        tableData: {
            handler(val) {
                this.currentTableData = val
            },
            immediate: true
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        // 结算弹框
        handleView(row, index) {
            this.$emit('view', {
                ...row,
                action: 'staff',
                index
            })
        }
    }
}
</script>
