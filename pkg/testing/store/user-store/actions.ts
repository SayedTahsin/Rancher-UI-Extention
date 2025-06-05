import $axios from "../../composables/axios";

export default {
  async fetchMyData({ commit }: any) {
    commit('setLoading', true);
    try {
    const resp = await $axios.get("https://randomuser.me/api/");
      commit('userData', resp.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      commit('setLoading', false);
    }
  },
};
