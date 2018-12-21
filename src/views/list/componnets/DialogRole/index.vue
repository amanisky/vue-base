<template>
    <el-dialog title="用户组关联角色" :visible.sync="roleDialogVisible" width="43%" center>
        <div style="text-align: center">
            <el-transfer
                    style="text-align: left; display: inline-block"
                    :titles="['未关联角色', '已关联角色']"
                    :button-texts="['取消', '关联']"
                    :target-order="'push'"
                    :props="{
                          key: 'index',
                          label: 'name'
                        }"
                    v-model="rolesyR"
                    :data="rolesW"
                    @left-check-change="leftCheckFn"
                    @right-check-change="rightCheckFn"
                    @change="changeFn">
            </el-transfer>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                roleDialogVisible: false,
                leftChecked: [],
                rightChecked: [],
                rolesyR: []
            }
        },
        props: {
            rolesW: {
                type: Array,
                default: () => {
                    return []
                }
            },
            rolesY: {
                type: Array,
                default: () => {
                    return []
                }
            },
            leftDefaultArry: {
                type: Array,
                default: () => {
                    return []
                }
            },
            rightDefaultArry: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        watch: {
            rolesY(val){
                this.rolesyR = val
            }
        },
        methods: {
            leftCheckFn(key1, key2) {
                this.leftChecked = key1
            },
            rightCheckFn(key1, key2) {
                this.rightChecked = key1
            },
            changeFn(val1, val2, val3) {
                if (val2 === 'left') {
                    this.$emit('rolesMinus', val3)
                } else {
                    this.$emit('rolesPlus', val3)
                }
            },
            resetDefault(){
                console.log(12312);
                // this.$emit('resetDefault')
            },
        }
    }
</script>
