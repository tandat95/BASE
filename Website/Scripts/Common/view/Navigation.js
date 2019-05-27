Ext.define('Common.view.Navigation', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.common-navigation',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    itemViews:
    {
        logo: true,
        account: true
    },

    modeView: 'mini', //full

    itemHeads: [],
    itemEnds: [],

    bodyCls: 'common-navigation',

    initComponent: function ()
    {
        var me = this;

        this.callParent();
    }
});