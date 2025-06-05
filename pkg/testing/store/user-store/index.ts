import { CoreStoreSpecifics, CoreStoreConfig } from '@shell/core/types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const YOUR_PRODUCT_NAME = 'test-extension';

const yourExtensionFactory = (): CoreStoreSpecifics => {
  return {
    state() {
      return { someStateVariable: '' };
    },

    getters: { ...getters },

    mutations: { ...mutations },

    actions: { ...actions },
  };
};
const config: CoreStoreConfig = { namespace: YOUR_PRODUCT_NAME };

export default {
  specifics: yourExtensionFactory(),
  config
};