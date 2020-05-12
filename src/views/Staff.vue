<template>
  <div class="home">
    <button @click="addItem">新增</button>
    <table>
      <thead>
        <th>姓名</th>
        <th>部门</th>
        <th>职位</th>
        <th>入职日期</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="(staff, index) in pageData.list" :key="staff.id">
          <td>{{staff.name}}</td>
          <td>{{staff.department}}</td>
          <td>{{staff.position}}</td>
          <td>{{staff.date}}</td>
          <td>
            <button @click="editItem(index)">编辑</button>
            <button @click="deleteItem(index)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>总数:{{pageData.total}}</div>
    <div>activeItem:{{activeItem}}</div>
    <div>state:{{state.form}}</div>
    <div class="dialog-detail" v-show="isShowDetail">
      <div class="form-item">
        <span class="label">姓名:</span>
        <input type="text" v-model="state.form.name">
      </div>
      <div class="form-item">
        <span class="label">部门:</span>
        <input type="text" v-model="state.form.department">
      </div>
      <div class="form-item">
        <span class="label">职位:</span>
         <input type="text" v-model="state.form.position">
      </div>
      <div class="form-item">
        <span class="label">入职日期:</span>
         <input type="text" v-model="state.form.date">
      </div>
      <div class="btn-group">
        <button @click="confirmItem(state.form)">确认</button>
        <button @click="cancelEdit">取消</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import { reactive } from 'vue';
import { usePageData } from '../components/PageData'; 
import { fetchStaff } from '../api';
export default {
  name: 'Staff',
  setup() {
    const state = reactive({
      form: {
        name: '',
        department: '',
        position: '',
        date: ''
      }
    })
    const pageData = usePageData(fetchStaff, state.form);
    return {
      state,
      ...pageData,
    }
  }
}
</script>
<style scoped>
table {
  margin: 0 auto;
}
th, td {
  border: solid 1px #ccc;
  padding: 5px
}
.dialog-detail {
  margin: 50px auto;
  padding: 20px;
  width: 300px;
  border: solid 1px #eee;
}
.form-item {
  margin: 5px 0;
}
.form-item .label {
  display: inline-block;
  text-align: left;
  width: 70px;
  margin-right: 5px;
}
</style>