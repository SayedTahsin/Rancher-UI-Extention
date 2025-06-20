import { importTypes } from "@rancher/auto-import";
import { IPlugin } from "@shell/core/types";
import extensionRouting from "./routing/test-routing";
import userStore from "./store/user-store";

// Init the package
export default function (plugin: IPlugin) {
  // Auto-import model, detail, edit from the folders
  importTypes(plugin);

  // Provide extension metadata from package.json
  // it will grab information such as `name` and `description`
  plugin.metadata = require("./package.json");

  // Load a product
  plugin.addProduct(require("./testing-config"));

  // Add Vuex store
  plugin.addDashboardStore(
    userStore.config.namespace,
    userStore.specifics,
    userStore.config
  );

  // Add Vue Routes
  plugin.addRoutes(extensionRouting);
}
