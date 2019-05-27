Ext.define('Common.view.TreeNavigation', {
    extend: 'Ext.panel.Panel',
    ui: "navigation",

    alias: 'widget.common-tree-navigation',

    scrollable: "y",
    layout: 'fit',

    modeView: 'mini', //full

    itemHeads: [],

    bodyCls: 'common-tree-navigation',
    transOptions: {
        searchText: _t('Nhập từ khóa cần tìm')
    },

    initComponent: function () {
        var me = this;
        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                style: 'background-color:#32404e;',
                cls: 'common-tree-navigation-toolbar',
                height:50,
                items: [
                    {
                        xtype: 'searchfield',
                        itemId: 'navigationSearchField',
                        flex: 1,
                        emptyText: _t(me.transOptions && me.transOptions.searchText ? me.transOptions.searchText : 'Nhập từ khóa cần tìm')
                    },
                    {
                        glyph: _i('search'),
                        itemId: 'navigationSearchButton',
                        cls: 'navigation-toolbar-button',
                        iconCls: 'glyph-color-white',
                        width: 42,
                        hidden: true,
                        focusable: false
                    }
                ]
            }
        ];

        this.callParent();
    }
});