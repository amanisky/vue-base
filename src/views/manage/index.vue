<template>
<d2-container>
    <demo-page-header slot="header" ref="header" :activeName="activeName" @submit="handleSubmit" />
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户结算" name="user">
            <demo-page-user :table-data="userCommissionData" :loading="loading" @view="handleViewDialog" />
        </el-tab-pane>
        <el-tab-pane label="员工结算" name="staff">
            <demo-page-staff :table-data="staffCommissionData" :loading="loading" @view="handleViewDialog" />
        </el-tab-pane>
        <el-tab-pane label="外围商务结算" name="periphery">
            <demo-page-periphery :table-data="peripheryCommissionData" :loading="loading" @view="handleViewDialog" />
        </el-tab-pane>
        <el-tab-pane label="商家结算" name="basiness">
            <demo-page-basiness :table-data="basinessCommissionData" :loading="loading" @view="handleViewDialog" />
        </el-tab-pane>
    </el-tabs>
    <demo-page-view ref="viewDialog" :viewDialogVisible="viewDialogVisible" :currentData="currentData" @submit="handleSettlement" @close="handleCloseDialog" />
    <demo-page-footer slot="footer" ref="footer" :current="page.current" :size="page.size" :sizes="page.sizes" :total="page.total" @change="handlePaginationChange" />
</d2-container>
</template>

<script>
import {
    FinancialRemittanceCommissionManageUser,
    FinancialRemittanceCommissionManageStaff,
    FinancialRemittanceCommissionManagePeriphery,
    FinancialRemittanceCommissionManageBasiness,
    FinancialRemittanceCommissionManageUserDetail,
    FinancialRemittanceCommissionManageStaffDetail,
    FinancialRemittanceCommissionManagePeripheryDetail,
    FinancialRemittanceCommissionManageBasinessDetail,
    FinancialRemittanceCommissionManageUserSettlement,
    FinancialRemittanceCommissionManageStaffSettlement,
    FinancialRemittanceCommissionManagePeripherySettlement,
    FinancialRemittanceCommissionManageBasinessSettlement
} from '@/api/financial-remittance/commission/manage'
export default {
    // name 值和本页的 $route.name 一致才可以缓存页面
    name: 'financial-remittance-commission-manage',
    data() {
        return {
            table: [],
            loading: false,
            activeName: 'user',
            viewDialogVisible: false,
            userCommissionData: [],
            staffCommissionData: [],
            peripheryCommissionData: [],
            basinessCommissionData: [],
            currentIndex: 0,
            currentData: {},
            form: {
                keyword: ''
            },
            page: {
                current: 1,
                size: 20,
                total: 0,
                sizes: [5, 20, 50, 100, 200]
            }
        }
    },
    created() {
        this.requestUserData()
    },
    methods: {
        handleClick(tab, event) {
            this.page = {
                ...this.page,
                current: 1
            }
            if (this.activeName == 'user') {
                this.requestUserData()
            } else if (this.activeName == 'staff') {
                this.requestStaffData()
            } else if (this.activeName == 'periphery') {
                this.requestPeripheryData()
            } else if (this.activeName == 'basiness') {
                this.requestBasinessData()
            }
        },
        handlePaginationChange(val) {
            this.page = val
            if (this.activeName == 'user') {
                this.requestUserData()
            } else if (this.activeName == 'staff') {
                this.requestStaffData()
            } else if (this.activeName == 'periphery') {
                this.requestPeripheryData()
            } else if (this.activeName == 'basiness') {
                this.requestBasinessData()
            }
        },
        handleSubmit(form) {
            this.form = form
            this.handleClick()
        },
        // 用户结算列表
        requestUserData() {
            this.loading = true
            FinancialRemittanceCommissionManageUser({
                query: this.form.keyword,
                pageNum: this.page.current,
                pageSize: this.page.size
            }).then(res => {
                this.loading = false

                this.userCommissionData = res.list
                this.page = {
                    ...this.page,
                    total: res.total
                }
            }).catch(err => {
                this.loading = false
                // this.$notify({
                //     title: '用户结算数据请求异常'
                // })
            })
        },
        // 员工结算列表
        requestStaffData() {
            this.loading = true
            FinancialRemittanceCommissionManageStaff({
                query: this.form.keyword,
                pageNum: this.page.current,
                pageSize: this.page.size
            }).then(res => {
                this.loading = false

                this.staffCommissionData = res.list
                this.page = {
                    ...this.page,
                    total: res.total
                }
            }).catch(err => {
                this.loading = false
                // this.$notify({
                //     title: '用户结算数据请求异常'
                // })

            })
        },
        // 外围员工结算列表
        requestPeripheryData() {
            this.loading = true
            FinancialRemittanceCommissionManagePeriphery({
                query: this.form.keyword,
                pageNum: this.page.current,
                pageSize: this.page.size
            }).then(res => {
                this.loading = false

                this.peripheryCommissionData = res.list
                this.page = {
                    ...this.page,
                    total: res.total
                }
            }).catch(err => {
                this.loading = false
                // this.$notify({
                //     title: '用户结算数据请求异常'
                // })

            })
        },
        // 商家结算列表
        requestBasinessData() {
            this.loading = true
            FinancialRemittanceCommissionManageBasiness({
                query: this.form.keyword,
                pageNum: this.page.current,
                pageSize: this.page.size
            }).then(res => {
                this.loading = false

                this.basinessCommissionData = res.list
                this.page = {
                    ...this.page,
                    total: res.total
                }
            }).catch(err => {
                this.loading = false
                // this.$notify({
                //     title: '用户结算数据请求异常'
                // })

            })
        },
        // 结算弹框
        handleViewDialog(data) {
            this.viewDialogVisible = true
            this.currentIndex = data.index
            if (data.action == 'user') {
                this.$nextTick(() => {
                    this.handleGetUserCommission(data.userId)
                })
            } else if (data.action == 'staff') {
                this.$nextTick(() => {
                    this.handleGetStaffCommission(data.userId)
                })
            } else if (data.action == 'periphery') {
                this.$nextTick(() => {
                    this.handleGetPeripheryCommission(data.userId)
                })
            } else if (data.action == 'basiness') {
                this.$nextTick(() => {
                    this.handleGetBasinessCommission(data.userId)
                })
            }
        },
        // 获取用户结算金额信息
        handleGetUserCommission(userId) {
            FinancialRemittanceCommissionManageUserDetail({
                userId
            }).then(res => {
                /*this.currentData = {
                    ...res,
                    toBeWithdrawFee: res.toBeWithdrawFee.toFixed(2)
                }*/
                this.currentData = res
                this.$refs.viewDialog.restFree = res.toBeWithdrawFee.toFixed(2)
                
            }).catch(err => {
                // this.$message({
                //     type: 'error',
                //     message: '获取结算信息失败'
                // })

            })
        },
        // 获取员工结算金额信息
        handleGetStaffCommission(userId) {
            FinancialRemittanceCommissionManageStaffDetail({
                userId
            }).then(res => {
                this.currentData = res
                this.$refs.viewDialog.restFree = res.toBeWithdrawFee.toFixed(2)
                
            }).catch(err => {
                // this.$message({
                //     type: 'error',
                //     message: '获取结算信息失败'
                // })

            })
        },
        // 获取外围员工结算金额信息
        handleGetPeripheryCommission(userId) {
            FinancialRemittanceCommissionManagePeripheryDetail({
                userId
            }).then(res => {
                this.currentData = res
                this.$refs.viewDialog.restFree = res.toBeWithdrawFee.toFixed(2)
                
            }).catch(err => {
                // this.$message({
                //     type: 'error',
                //     message: '获取结算信息失败'
                // })

            })
        },
        // 获取商家结算金额信息
        handleGetBasinessCommission(userId) {
            FinancialRemittanceCommissionManageBasinessDetail({
                userId
            }).then(res => {
                this.currentData = res
                this.$refs.viewDialog.restFree = res.toBeWithdrawFee.toFixed(2)
                
            }).catch(err => {
                // this.$message({
                //     type: 'error',
                //     message: '获取结算信息失败'
                // })
    
            })
        },
        // 结算操作
        handleSettlement(data) {
            if (this.activeName == 'user') {
                this.handleUserSettlement(data)
            } else if (this.activeName == 'staff') {
                this.handleStaffSettlement(data)
            } else if (this.activeName == 'periphery') {
                this.handlePeripherySettlement(data)
            } else if (this.activeName == 'basiness') {
                this.handleBasinessSettlement(data)
            }
        },
        // 用户结算操作
        handleUserSettlement(data){
            FinancialRemittanceCommissionManageUserSettlement(data).then(res => {
                /*const index = this.currentIndex
                let toBeWithdrawFee = this.userCommissionData[index].toBeWithdrawFee - data.fee
                const oldValue = this.userCommissionData[index]
                this.$set(this.userCommissionData, index, {
                    ...oldValue,
                    toBeWithdrawFee
                })*/
                this.$nextTick(() => {
                    this.$refs.viewDialog.handleFormReset()
                    this.requestUserData()
                })
                this.viewDialogVisible = false

                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
            }).catch(err => {
                this.viewDialogVisible = false
                /*this.$message({
                    type: 'error',
                    message: '操作失败'
                })*/
        
            })
        },
        // 员工结算操作
        handleStaffSettlement(data){
            FinancialRemittanceCommissionManageStaffSettlement(data).then(res => {
                /*const index = this.currentIndex
                let toBeWithdrawFee = this.staffCommissionData[index].toBeWithdrawFee - data.fee
                const oldValue = this.staffCommissionData[index]
                this.$set(this.staffCommissionData, index, {
                    ...oldValue,
                    toBeWithdrawFee
                })*/
                this.$nextTick(() => {
                    this.$refs.viewDialog.handleFormReset()
                    this.requestStaffData()
                })

                this.viewDialogVisible = false

                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
            }).catch(err => {
                this.viewDialogVisible = false
                /*this.$message({
                    type: 'error',
                    message: '操作失败'
                })*/
      
            })
        },
        // 外围员工结算操作
        handlePeripherySettlement(data){
            FinancialRemittanceCommissionManagePeripherySettlement(data).then(res => {
                /*const index = this.currentIndex
                let toBeWithdrawFee = this.peripheryCommissionData[index].toBeWithdrawFee - data.fee
                const oldValue = this.peripheryCommissionData[index]
                this.$set(this.peripheryCommissionData, index, {
                    ...oldValue,
                    toBeWithdrawFee
                })*/
                this.$nextTick(() => {
                    this.$refs.viewDialog.handleFormReset()
                    this.requestPeripheryData()
                })

                this.viewDialogVisible = false

                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
            }).catch(err => {
                this.viewDialogVisible = false
                /*this.$message({
                    type: 'error',
                    message: '操作失败'
                })*/
            
            })
        },
        // 商家结算操作
        handleBasinessSettlement(data){
            FinancialRemittanceCommissionManageBasinessSettlement(data).then(res => {
                /*const index = this.currentIndex
                let toBeWithdrawFee = this.basinessCommissionData[index].toBeWithdrawFee - data.fee
                const oldValue = this.basinessCommissionData[index]
                this.$set(this.basinessCommissionData, index, {
                    ...oldValue,
                    toBeWithdrawFee
                })*/
                
                this.$nextTick(() => {
                    this.$refs.viewDialog.handleFormReset()
                    this.requestBasinessData()
                })

                this.viewDialogVisible = false

                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
            }).catch(err => {
                this.viewDialogVisible = false
                /*this.$message({
                    type: 'error',
                    message: '操作失败'
                })*/
    
            })
        },
        // 关闭弹框
        handleCloseDialog() {
            this.viewDialogVisible = false
        }
    },
    components: {
        'DemoPageHeader': () =>
            import('./components/page-header'),
        'DemoPageUser': () =>
            import('./components/page-user'),
        'DemoPageStaff': () =>
            import('./components/page-staff'),
        'DemoPagePeriphery': () =>
            import('./components/page-periphery'),
        'DemoPageBasiness': () =>
            import('./components/page-basiness'),
        'DemoPageView': () =>
            import('./components/page-view'),
        'DemoPageFooter': () =>
            import('./components/page-footer')
    }
}
</script>
