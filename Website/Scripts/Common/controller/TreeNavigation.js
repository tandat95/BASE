Ext.define('Common.controller.TreeNavigation', {
    extend: 'Ext.app.Controller',

    views: ['TreeNavigation'],

    init: function() {
        this.control({
            'common-tree-navigation': {
                afterrender: function (panel) {
                    this.buildItems(panel);
                },

                buildItems: function(panel) {
                    this.buildItems(panel);
                },

                addHeadItem: function(navigation, itemConfigs) {
                    if (Ext.isArray(itemConfigs)) {
                        navigation.itemHeads = navigation.itemHeads.concat(itemConfigs);
                    } else {
                        navigation.itemHeads.push(itemConfigs);
                    }

                    this.buildItems(navigation);
                }
            },
            'common-tree-navigation #navigationSearchField': {
                onSearch: this.onSearch,
                onClear: this.onSearchClear
            },
            'common-tree-navigation treelist': {
                itemclick: this.onNavigationTreeListItemClick
            }
        });
    },

    buildItems: function(panel) {
        var me = this;

        var defaultItemCfg = {
            text: "",
            leaf: true
        };

        var defaultFullItemCfg = Ext.apply({},
            {
                arrowVisible: true
            },
            defaultItemCfg);

        var defaultMiniItemCfg = Ext.apply({},
            {
                arrowVisible: false
            },
            defaultItemCfg);

        panel.removeAll();

        var addItems = [];
        if (panel.itemHeads && panel.itemHeads.length) {
            for (var i = 0; i < panel.itemHeads.length; i++) {
                var addItem = {};

                addItem = Ext.apply({}, panel.itemHeads[i], defaultFullItemCfg);

                if (addItem.text) {
                    addItem.text = _t(addItem.text);
                }

                addItems.push(addItem);
            }
        }

        panel.add({
            xtype: 'treelist',

            width: panel.modeView === 'mini' ? 64 : panel.defaultWidth,
            ui: "navigation",
            micro: panel.modeView === 'mini',

            expanderFirst: false,
            expanderOnly: false,

            store: {
                fields: [
                    {
                        name: "text"
                    }
                ],
                root: {
                    expanded: true,
                    children: addItems
                }
            }
        });

        var micro = panel.modeView === 'mini';
        panel.setWidth(micro ? 64 : panel.defaultWidth);
        panel.down('#navigationSearchField').setVisible(!micro);
        panel.down('#navigationSearchButton').setVisible(micro);
        //setTimeout(
        //    function() {
        //        me.updateCollapseButton(panel);
        //    },
        //    200);

        panel.fireEvent('afterbuilditems', panel);
    },
    onSearch: function(field, value) {
        var nav = field.up('common-tree-navigation');
        if (nav) {
            var tree = nav.down('treelist');
            if (tree) {
                tree.getStore().filterBy(function(x) {
                    if (x && x.data) {
                        if (x.data.FilterValue) {
                            return x.data.FilterValue.toLowerCase().indexOf(value.toLowerCase()) > -1;
                        } else {
                            return x.data.text.toLowerCase().indexOf(value.toLowerCase()) > -1;
                        }
                    }
                });
            }
        }
    },
    onSearchClear: function(field) {
        var nav = field.up('common-tree-navigation');
        if (nav) {
            var tree = nav.down('treelist');
            if (tree) {
                tree.getStore().clearFilter();
            }
        }
    },
    onToggleNavigationSize: function(btn, view) {
        var me = this,
            //view = btn.up('common-tree-navigation'),
            navTree = view.down('treelist'),
            micro = !navTree.getMicro(),
            width = micro ? 64 : panel.defaultWidth;


        view.down('#navigationSearchField').setVisible(!micro);
        view.down('#navigationSearchButton').setVisible(micro);

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();
            view.setWidth(width);
            navTree.setWidth(width);
            navTree.setMicro(micro);
            Ext.resumeLayouts();
        } else {
            navTree.setMicro(micro);
            view.setWidth(width);
            navTree.setWidth(width);
            navTree.el.addCls("nav-tree-animating");
            if (micro) {
                navTree.on({
                    afterlayoutanimation: function() {
                        navTree.setMicro(true);
                        navTree.el.removeCls("nav-tree-animating");
                    },
                    single: true
                });
            }
        }
        me.updateCollapseButton(view);
    },
    updateCollapseButton: function (view) {
        var me = this;
        var button = Ext.ComponentQuery.query('[name="main-navigation-btn"]');
        var navTree = view.down('treelist');
        if (navTree) {
            var micro = navTree.getMicro();
            var buttonX = view.getX() + view.getWidth();
            var buttonY;

            if (!micro) {
                buttonX = view.getX() + view.getWidth();
                buttonY = view.getY();
            } else {
                buttonY = view.getY();
            }
            if (!button.length) {
                // Create the button
                button = Ext.widget('button',
                    {
                        name: 'main-navigation-btn',
                        renderTo: Ext.getBody(),
                        floating: true,
                        glyph: _i('caret-right'),
                        iconCls: 'glyph-color-white' + (!micro ? ' collapsed' : ''),
                        collapseIconCls: 'glyph-color-white collapsed',
                        expandIconCls: 'glyph-color-white',
                        tooltip: _t('Thu gọn'),
                        cls: 'common-tree-navigation-toolbar',
                        width: 50,
                        height: 50,
                        border: 0,
                        focusable: false,
                        shadow: false,
                        handler: function(btn) {
                            var navTree = view.down('treelist'),
                                micro = !navTree.getMicro();
                            btn.setIconCls(micro ? btn.expandIconCls : btn.collapseIconCls);
                            btn.setGlyph(_i('caret-right'));
                            btn.setTooltip(micro ? _t('Mở rộng') : _t('Thu gọn'));
                            me.onToggleNavigationSize(btn, view);
                        }
                    });


                button.anchorTo(Ext.getBody(), 'tl-tl', [buttonX, buttonY]);
            } else {
                button = button[0];
                button.anchorTo(Ext.getBody(), 'tl-tl', [buttonX, buttonY]);
            }
        }
    },
    onNavigationTreeListItemClick: function (treeView, item) {
        var record = item.node;

        if (record) {
            var view = treeView.up('common-tree-navigation');
            view.fireEvent('itemclick', view, record);
        }
    },
});