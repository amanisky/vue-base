<template>
    <div>
        <!--<el-form-->
                <!--:inline="true"-->
                <!--size="mini">-->
            <!--<el-form-item :label="`已选数据下载 [ ${multipleSelection.length} ]`">-->
                <!--<el-button-group>-->
                    <!--<el-button-->
                            <!--type="primary"-->
                            <!--size="mini"-->
                            <!--:disabled="multipleSelection.length === 0"-->
                            <!--@click="handleDownloadXlsx(multipleSelection)">-->
                        <!--xlsx-->
                    <!--</el-button>-->
                    <!--<el-button-->
                            <!--type="primary"-->
                            <!--size="mini"-->
                            <!--:disabled="multipleSelection.length === 0"-->
                            <!--@click="handleDownloadCsv(multipleSelection)">-->
                        <!--csv-->
                    <!--</el-button>-->
                <!--</el-button-group>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <template>
            <el-table
                    ref="employeesTable"
                    :data="emData"
                    tooltip-effect="dark"
                    size="mini"
                    @selection-change="handleSelectionChange"
                    stripe
                    v-loading="loading"
                    :default-sort = "{prop: 'code',order: 'descending'}">
                <!--<el-table-column-->
                        <!--type="selection"-->
                        <!--width="55"-->
                <!--/>-->
                <!--<el-table-column-->
                        <!--label="序号"-->
                        <!--align="center"-->
                        <!--width="50"-->
                        <!--type="index"-->
                <!--/>-->
                <el-table-column
                        label="名称"
                        width="200"
                        prop="name"
                        :show-overflow-tooltip="true"
                />
                <el-table-column
                        label="描述"
                        prop="description"
                        :show-overflow-tooltip="true"
                />
                <el-table-column
                        label="编码"
                        width="200"
                        prop="code"
                        :show-overflow-tooltip="true"
                />
                <el-table-column
                        label="排序"
                        align="center"
                        prop="id"
                        width="200"
                        sortable
                        :show-overflow-tooltip="true"
                />
                <el-table-column
                        label="操作"
                        width="380"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="changeRole(scope.row)">关联角色</el-button>
                        <el-button size="mini" type="primary" @click="changeUser(scope.row)">关联用户</el-button>
                        <el-button size="mini" type="primary" @click="changeBtn(scope.row)">修改</el-button>
                        <el-button size="mini" type="warning" @click="removeBtn(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                multipleSelection: [],
                downloadColumns: [
                    {label: '名称', prop: 'name'},
                    {label: '描述', prop: 'description'},
                    {label: '编码', prop: 'code'},
                    {label: '排序', prop: 'id'}
                ]
            }
        },
        props: {
            emData: {
                default: () => []
            },
            loading: {
                default: false
            }
        },
        created() {

        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleDownloadXlsx(data) {
                this.$export.excel({
                    title: 'D2Admin 表格示例',
                    columns: this.downloadColumns,
                    data: this.downloadDataTranslate(data)
                })
                    .then(() => {
                        this.$message('导出表格成功')
                    })
            },
            handleDownloadCsv(data) {
                this.$export.csv({
                    title: 'D2Admin 表格示例',
                    columns: this.downloadColumns,
                    data: this.downloadDataTranslate(data)
                })
                    .then(() => {
                        this.$message('导出CSV成功')
                    })
            },
            downloadDataTranslate(data) {
                return data.map(row => ({
                    ...row,
                    type: row.type ? '禁用' : '正常',
                    used: row.used ? '已使用' : '未使用'
                }))
            },
            changeRole(val){
                this.$emit('changeRole', val)
            },
            changeUser(val){
                this.$emit('changeUser', val)
            },
            changeBtn(val) {
                this.$emit('changeEmInfo', val)
            },
            removeBtn(val) {
                this.$confirm('确定删除该信息吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit('removeEm', val)
                })
            }
        }
    }
</script>

<style scoped>
</style>
