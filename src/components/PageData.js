import { onMounted, computed, watch, ref } from 'vue';
import { useStore } from 'vuex';
export const usePageData = (fetchApi, form) => {
  const initForm = Object.assign({}, form);
  const store = useStore();
  const pageData = computed(() => store.state.pageData);
  const activeIndex = computed(() => store.state.activeIndex);
  const activeItem = computed(() => store.getters.activeItem);
  let isShowDetail = ref(false);
  watch(activeItem, () => {
    if (!activeItem.value) return;
    for (let key in form) {
      form[key] = activeItem.value[key];
    }
  });
  const editItem = index => {
    isShowDetail.value = true;
    store.dispatch('SET_ACTIVE_ITEM', index);
  };
  const addItem = () => {
    isShowDetail.value = true;
    store.dispatch('SET_ACTIVE_ITEM', null);
  };
  const deleteItem = index => {
    store.dispatch('DELETE_ITEM', index);
  };
  const confirmItem = item => {
    isShowDetail.value = false;
    store.dispatch('CONFIRM_EDIT_ITEM', item);
    Object.assign(form, initForm);
  };
  const cancelEdit = () => {
    isShowDetail.value = false;
    store.dispatch('CLEAR_ACTIVE_ITEM');
    Object.assign(form, initForm);
  };
  onMounted(async () => {
    let resList = await fetchApi();
    store.dispatch('GET_PAGE_DATA', resList);
  });

  return {
    isShowDetail,
    pageData,
    activeIndex,
    activeItem,
    editItem,
    addItem,
    confirmItem,
    cancelEdit,
    deleteItem
  }
}


