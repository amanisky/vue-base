<template>
    <d2-container>
        <page-header
                slot="header"
                @submit="getEmployeesData"
                @addLayer="openLayer"
                ref="header"
        />
        <page-main
                :em-data="employeesData"
                :loading="loading"
                @changeEmInfo="changeEmInfo"
                @removeEm="deleteInfo"
                @changeRole="getRoleInfo"
                @changeUser="getUserInfo"
        />
        <page-footer
                slot="footer"
                :current="pageData.page"
                :size="pageData.size"
                :total="pageAdd.total"
                @change="handlePaginationChange"
                ref="footer"
        />
        <dialog-box
                :dialogForm="dialogChangeForm"
                :dialogTitle="dialogTitle"
                :changeNum="isChange"
                @keepData="keepEmInfo"
                ref="dialogBox"
        />
        <dialog-role
                :rolesW="roleswData"
                :rolesY="rolesyData"
                @rolesPlus="rolesPlusFn"
                @rolesMinus="rolesMinusFn"
                ref="role"
        />
        <dialog-user
                :userW="userwData"
                :userY="useryData"
                @userPlus="userPlusFn"
                @userMinus="userMinusFn"
                ref="user"
        />
    </d2-container>
</template>

<script>
    import {groupGetData,groupDeletData,groupAddData,groupSearchById,groupChangeData} from '@/api/systems-management/authority/group/index'

    import {
        groupSearchRoleW,
        groupSearchRoleY,
        groupSearchRoleA,
        groupRoleAdd,
        groupRoleMinus,

        groupSearchUserW,
        groupSearchUserY,
        groupSearchUserA,
        groupUserAdd,
        groupUserMinus
    } from '@/api/systems-management/authority/group/index'


    export default {
        name: 'systems-management-authority-group-list',
        components: {
            'PageHeader': () => import('./componnets/PageHeader'),
            'PageMain': () => import('./componnets/PageMain'),
            'PageFooter': () => import('./componnets/PageFooter'),
            'DialogBox': () => import('./componnets/DialogBox'),
            'DialogRole': () => import('./componnets/DialogRole'),
            'DialogUser': () => import('./componnets/DialogUser')
        },
        data() {
            return {
                employeesData: [],
                loading: false,
                pageData: { //获取列表数据时传给后台的数据
                    page: 1,
                    size: 20,
                },
                pageAdd: {}, //传给分页的数据
                dialogChangeForm: { //修改或者添加数据时暂存的数据
                    code: '',
                    description: '',
                    id: 0,
                    name: ''
                },
                dialogTitle: '',
                isChange: 0, //判断是添加还是修改
                roleswData: [],
                rolesyData: [],
                userwData: [],
                useryData: [],
                groupLineData: {}, //点击关联的时候获取行数据
            }
        },
        created() {
            this.loading = true
            this.getEmployeesData()
        },
        methods: {
            getEmployeesData(form,from) {
                this.loading = true
                let sendData = form === form ? Object.assign(this.pageData, form) : this.pageData
                if(from === 'head'){
                    Object.assign(sendData,{page: 1})
                }
                groupGetData(sendData).then(res => {
                    setTimeout(()=>{
                        this.loading = false
                        this.employeesData = res.data
                    },500)
                    this.$set(this.pageAdd, 'pages', res.pages)
                    this.$set(this.pageAdd, 'total', res.total)
                })
            },
            deleteInfo(val) {
                groupDeletData(val).then(res => {
                    this.loading = true
                    this.getEmployeesData()
                })
            },
            handlePaginationChange(val) {
                this.$set(this.pageData, 'page', val.current)
                this.$set(this.pageData, 'size', val.size)
                this.$nextTick(() => {
                    this.$refs.header.handleFormSubmit(false,'footer')
                })
            },
            openLayer() {
                this.isChange = 0
                this.dialogTitle = '添加用户组'
                this.$refs.dialogBox.emDialogVisible = true
                this.dialogChangeForm = {
                    code: '',
                    description: '',
                    id: 0,
                    name: ''
                }
            },
            changeEmInfo(val) {
                this.isChange = 1
                this.dialogTitle = '修改用户组信息'
                this.$refs.dialogBox.emDialogVisible = true
                groupSearchById(val).then(res => {
                    this.dialogChangeForm = res
                })
            },
            keepEmInfo(val) {
                if (this.isChange) {
                    this.$confirm('确定修改该用户组信息吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        groupChangeData(this.dialogChangeForm).then(res => {
                            this.loading = true
                            this.getEmployeesData()
                            this.$refs.dialogBox.emDialogVisible = false
                        })
                    }).catch(() => {
                        this.$refs.dialogBox.emDialogVisible = false
                    })
                } else {
                    this.$confirm('确定填加该用户组吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        groupAddData(val).then(res => {
                            this.loading = true
                            this.getEmployeesData()
                            this.$refs.dialogBox.emDialogVisible = false
                        })
                    }).catch(() => {
                        this.$refs.dialogBox.emDialogVisible = false
                    })
                }
            },

            // 角色相关
            getRoleInfo(val){
                this.roleswData=[]
                this.rolesyData=[]
                this.groupLineData = val
                groupSearchRoleA({page: 1, size: 100}).then(res=>{
                    this.roleswData=[]
                    if(res.data.length > 0){
                        this.roleswData = res.data.map((item,index)=>{
                            return Object.assign(item, {index:index})
                        })
                    } else {
                        this.roleswData = []
                    }
                    this.leftDefaultIds=[]
                    groupSearchRoleY({groupId: val.id, page: 1, size: 100}).then(resy=>{
                        let indexArr = []
                        this.roleswData.forEach((item,index)=>{
                            resy.data.forEach(p => {
                                if(p.id === item.id){
                                    indexArr.push(index);
                                }
                            })
                            this.rolesyData = indexArr
                        })
                    })
                })
                this.$refs.role.roleDialogVisible = true
            },
            rolesPlusFn(val){
                let resultPlusIds = [];
                this.roleswData.forEach((item,index)=>{
                    val.forEach((p)=>{
                        if(p === index){
                            resultPlusIds.push(item.id)
                        }
                    })
                })
                //关联角色成功
                groupRoleAdd({groupId: this.groupLineData.id, roleIds: resultPlusIds}).then(res=>{
                })
            },
            rolesMinusFn(val){
                let resultMinusIds = [];
                this.roleswData.forEach((item,index)=>{
                    val.forEach((p)=>{
                        if(p === index){
                            resultMinusIds.push(item.id)
                        }
                    })
                })
                //已取消关联角色
                groupRoleMinus({groupId: this.groupLineData.id, roleIds: resultMinusIds}).then(res=>{
                })
            },

            //用户相关
            getUserInfo(val){
                this.userwData=[]
                this.useryData=[]
                this.groupLineData = val
                groupSearchUserA({page: 1, size: 100}).then(res=>{
                    if(res.data.length > 0){
                        this.userwData = res.data.map((item,index)=>{
                            return Object.assign(item, {index:index})
                        })
                    } else {
                        this.userwData = []
                    }
                    groupSearchUserY({groupId: val.id, page: 1, size: 100}).then(resy=>{
                        let indexArr = []
                        this.userwData.forEach((item,index)=>{
                            resy.data.forEach(p => {
                                if(p.id === item.id){
                                    indexArr.push(index);
                                }
                            })
                            this.useryData = indexArr
                        })
                    })
                })
                this.$refs.user.userDialogVisible = true
            },
            userPlusFn(val){
                let userResultPlusIds = [];
                this.userwData.forEach((item,index)=>{
                    val.forEach((p)=>{
                        if(p === index){
                            userResultPlusIds.push(item.id)
                        }
                    })
                })
                groupUserAdd({groupId: this.groupLineData.id, userIds: userResultPlusIds}).then(res=>{

                })
            },
            userMinusFn(val){
                let userResultMinusIds = [];
                this.userwData.forEach((item,index)=>{
                    val.forEach((p)=>{
                        if(p === index){
                            userResultMinusIds.push(item.id)
                        }
                    })
                })
                groupUserMinus({groupId: this.groupLineData.id, userIds: userResultMinusIds}).then(res=>{

                })
            }
        }
    }
</script>

<style scoped>

</style>
