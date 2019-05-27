Ext.define('Home.controller.Welcome', {
    extend: 'Ext.app.Controller',

    views: ['Welcome'],

    refs: [{
        ref: 'containerItem',
        selector: 'app-welcome #containerItem'
    }],

    init: function () {
        this.control({
            'app-welcome': {
                afterrender: function (panel) {
                    var me = this;
                    var view = panel.down('#mainContainer');

                    // bindBreadcrumb
                    var itemInfo = {
                        Path: view.homePath
                    };
                    var parentPath = panel.down('#parentPath');
                    me.bindBreadcrumb(parentPath, itemInfo, view.homePath);
                }
            },
            'app-welcome #containerList': {
                afterrender: function (view) {

                },
                selectionchange: this.onDataViewSelectionchange,
                loaded: this.onContainerListLoaded
            },
            'app-welcome #parentPath': {
                pathClick: this.onPathClick
            }
        });
    },

    onContainerListLoaded: function (list, queryInfo) {
        list.store.sort({
            sorterFn: function (rec1, rec2) {
                if (!rec1 || !rec2) return 0;
                var content1 = rec1.get('Content');
                var content2 = rec2.get('Content');

                if (content1 && content2) {
                    if (typeof (content1) == 'string') content1 = JSON.parse(content1);
                    if (typeof (content2) == 'string') content2 = JSON.parse(content2);
                    var order1 = content1.order || content1.Order || 0;
                    var order2 = content2.order || content2.Order || 0;

                    if (order1 > order2) return 1;
                    if (order2 > order1) return -1;
                }
                return 0;
            },
            direction: 'ASC'
        });
    },
    
    onDataViewSelectionchange: function (dataview, recs, eOpts) {
        if (dataview && recs && recs.length) {
            var itemInfo = recs[0].getData();

            if (dataview.view && itemInfo) {
                var mainContainer = dataview.view.up('#mainContainer');
                this.selectView(mainContainer, itemInfo);
            }
        }
    },

    bindBreadcrumb: function (parentPath, itemInfo, rootPath) {
        if (!parentPath) return;
        var me = parentPath;

        if (itemInfo) {
            var path = itemInfo.Path;

            if (path) {
                VDMS.Web.Library.AJAX.FolderAjax.GetTitlePathByParentPath(path, function (res) {
                    if (res.value) {
                        me.removeAll();
                        res = res.value;
                        me.add({
                            XPath: rootPath,
                            cls: 'common-navigation-button glyph-color-white',
                            ui: 'plain',
                            glyph: _i('home'),
                            handler: function (sender, e) {
                                me.fireEvent('pathClick', me, sender.XPath);
                            }
                        });

                        for (var i = res.keys.length - 1; i >= 0; i--) {
                            if (res.keys[i].startsWith(rootPath.toLowerCase() + "/")) {
                                me.add(
                                    {
                                        XPath: res.keys[i],
                                        cls: 'common-navigation-button',
                                        ui: 'plain',
                                        text: '<span data-qtip="' + res.values[i] + '" style="font-weight: bold;font-size:12px;">' + Ext.String.ellipsis(res.values[i], 20, true) + '<span>',
                                        handler: function (sender, e) {
                                            me.fireEvent('pathClick', me, sender.XPath);
                                        }
                                    });
                            }
                        };
                    }
                });
            }
        }
    },

    loadContainerItem: function (itemInfo, isSwitchTo) {
        var me = this;
        var containerItem = me.getContainerItem();
        containerItem.removeAll();

        //Add component
        var contentConfig = JSON.parse(itemInfo.Content);
        switch (itemInfo.Type) {
            case 'iframe':
                if (typeof (itemInfo.Content) === 'string') {
                    containerItem.add({
                        xtype: "component",
                        autoEl: {
                            tag: "iframe",
                            style: 'border: 0;width: 100%;height: 100%;',
                            src: contentConfig.Url
                        }
                    });
                }
                break;
            case 'link':
                if (typeof (itemInfo.Content) === 'string') {
                    if (contentConfig.Target === 'new') {
                        window.open(contentConfig.Url);
                    }
                    else {
                        window.location.href = contentConfig.Url;
                    }
                }
                break;
            default:
                containerItem.add({
                    html: 'ITEM HAVE NO CONFIG'
                });
        }

        if (isSwitchTo) {
            var mainContainer = containerItem.up('#mainContainer');
            if (mainContainer) {
                mainContainer.getLayout().setActiveItem(containerItem);
            }
        }
    },

    selectView: function (view, itemInfo, notBindBreadcrumb) {
        var me = this;
        if (view && itemInfo) {
            if (itemInfo.Type === 'widget') {
            }
            else if (itemInfo.Type === 'iframe') {
                me.loadContainerItem(itemInfo, true);
            }
            else if (itemInfo.Type === 'link') {
                notBindBreadcrumb = true;
                me.loadContainerItem(itemInfo, false);
            }
            else if (itemInfo.Type === "layer") {
            }
            else if (itemInfo.Type === "folder" || itemInfo.Type === "file") {
                // load children
                var containerList = view.down('#containerList');
                if (containerList) {
                    containerList.queryInfo.Data.path = itemInfo.Path;
                    containerList.updateStoreConfig(containerList.queryInfo);

                    //Set default view
                    if (view.getLayout().getActiveItem() != containerList) {
                        view.getLayout().setActiveItem(containerList);
                    }
                }
            }

            if (!notBindBreadcrumb) {
                var parentPath = view.down('#parentPath');
                me.bindBreadcrumb(parentPath, itemInfo, view.homePath);
            }
        }
    },

    onPathClick: function (sender, path) {
        var me = this;
        var mainContainer = sender.up('#mainContainer');

        if (path.startsWith(mainContainer.homePath.toLowerCase())) {
            //Load view
            VDMS.Web.Library.AJAX.FolderAjax.GetContent(path,
                function (res) {
                    if (res && res.value) {
                        var res = res.value;
                        me.selectView(mainContainer, res);
                    }
                });
        }
    }
});