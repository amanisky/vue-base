<template>
    <el-dialog title="用户组关联用户" :visible.sync="userDialogVisible" width="43%" center>
        <div style="text-align: center">
            <el-transfer
                    style="text-align: left; display: inline-block"
                    :titles="['未关联用户', '已关联用户']"
                    :button-texts="['取消', '关联']"
                    :target-order="'push'"
                    :props="{
                        key: 'index',
                        label: 'name'
                    }"
                    v-model="useryR"
                    :data="userW"
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
                userDialogVisible: false,
                leftChecked: [],
                rightChecked: [],
                useryR: []
            }
        },
        props: {
            userW: {
                type: Array,
                default: () => {
                    return []
                }
            },
            userY: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        watch: {
            userY(val){
                // console.log(val)
                this.useryR = val
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
                    this.$emit('userMinus', val3)
                } else {
                    this.$emit('userPlus', val3)
                }
            }
        }
    }
</script>
