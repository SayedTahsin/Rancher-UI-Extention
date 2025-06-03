import $axios from '@bytebuilders/ui-modules/src/plugins/axios'


export default {
  async fetchMyData({ commit }: any) {
    commit('setLoading', true);
    try {
      const resp = await $axios.get('https://randomuser.me/api/',{withCredentials: false});
      commit('setMyData', resp.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      commit('setLoading', false);
    }
  },
};
