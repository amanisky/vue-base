<template>
<div>
    <el-row type="flex" justify="end" class="d2-mb-20">
        <el-button @click="handleAllSwitchChange" size="mini" type="primary">批量结算</el-button>
    </el-row>
    <el-table :data="currentTableData" v-loading="loading" size="mini" stripe border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="order_no" label="订单编号"></el-table-column>
        <el-table-column prop="create_time" label="订单时间"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="business_name" label="商户名"></el-table-column>
        <el-table-column prop="consume_money" label="消费金额"></el-table-column>
        <el-table-column prop="recharge_service_fee" label="充值手续费"></el-table-column>
        <el-table-column prop="bank_service_fee" label="银行服务费"></el-table-column>
        <el-table-column prop="account_money" label="应到账金额"></el-table-column>
        <el-table-column label="结算状态">
            <template slot-scope="scope">
                <el-tag size="mini" type="danger" v-if="scope.row.status == 1">已结算</el-tag>
                <el-tag size="mini" type="info" v-else-if="scope.row.status == 2">待结算</el-tag>
                <el-tag size="mini" v-else>未结算</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
            <template slot-scope="scope">
                <el-button @click="handleSwitchChange(scope.row, scope.$index, 1)" size="mini" type="primary" v-if="scope.row.status != 1">结算</el-button>
                <el-button @click="handleView(scope.row, scope.$index)" size="mini" type="success">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
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
        handleSwitchChange(row, index) {
            this.$emit('switch', {
                data: {
                    id: row.id,
                    ids: [],
                    status: 1
                },
                action: 'single',
                status: 1,
                index
            })
        },
        handleAllSwitchChange() {
            let ids = []
            this.multipleSelection.forEach((item) => {
                ids.push(item.id)
            })
            this.$emit('switch', {
                data: {
                    id: 0,
                    ids: ids,
                    status: 1
                },
                action: 'more',
                status: 1
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            //this.$emit('selection', val)
        },
        handleView(row, index) {
            this.$emit('view', {
                ...row,
                index
            })
        }
    }
}
</script>
