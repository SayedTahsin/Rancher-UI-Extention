import { IPlugin } from "@shell/core/types";

export function init($plugin: IPlugin, store: any) {
  const YOUR_PRODUCT_NAME = "test-extension";
  const BLANK_CLUSTER = "_";
  const CUSTOM_PAGE_NAME = "sidebar-1";
  const { product, virtualType, basicType } = $plugin.DSL(
    store,
    YOUR_PRODUCT_NAME
  );

  product({
    icon: "linux",
    inStore: "management",
    weight: 100,
    showClusterSwitcher: false,
    to: {
      name: `${YOUR_PRODUCT_NAME}-c-cluster`,
      path: `/${YOUR_PRODUCT_NAME}/c/:cluster/dashboard`,
      params: {
        product: YOUR_PRODUCT_NAME,
        cluster: BLANK_CLUSTER,
        pkg: YOUR_PRODUCT_NAME,
      },
    },
  });

  virtualType({
    label: "custom-page",
    namespaced: false,
    name: CUSTOM_PAGE_NAME,
    route: {
      name: `${YOUR_PRODUCT_NAME}-c-cluster-${CUSTOM_PAGE_NAME}`,
      params: {
        product: YOUR_PRODUCT_NAME,
        cluster: BLANK_CLUSTER,
      },
    },
  });

  basicType([CUSTOM_PAGE_NAME]);
}
