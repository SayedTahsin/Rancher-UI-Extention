import { CoreStoreSpecifics, CoreStoreConfig } from '@shell/core/types';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const NAMESPACE = 'my-extension';

const myStoreFactory = (): CoreStoreSpecifics => {
  return {
    state() {
      return {
        myData: [],
        loading: false,
      };
    },
    getters,
    mutations,
    actions,
  };
};

const config: CoreStoreConfig = { namespace: NAMESPACE };

export default {
  specifics: myStoreFactory(),
  config
};
