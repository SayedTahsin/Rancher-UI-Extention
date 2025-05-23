import { importTypes } from '@rancher/auto-import';
import { IPlugin, CardLocation, TabLocation } from '@shell/core/types';

// Init the package
export default function(plugin: IPlugin): void {
  // Auto-import model, detail, edit from the folders
  importTypes(plugin);

  // Provide plugin metadata from package.json
  plugin.metadata = require('./package.json');

  plugin.addCard(
    CardLocation.CLUSTER_DASHBOARD_CARD,
    {},
    {
      component: () => import('./components/demo.vue')
    }
  );

  plugin.addTab( 
    TabLocation.RESOURCE_DETAIL,
    { resource: ['namespace'] }, 
    {
      name:       'NewTab',
      weight:     -5,
      tooltip:    'this is a tooltip message',
      component:  () => import('./components/demo.vue')
    }
  );
}
