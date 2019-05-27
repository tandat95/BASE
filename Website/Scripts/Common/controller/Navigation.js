Ext.define('Common.controller.Navigation', {
    extend: 'Ext.app.Controller',

    views: ['Navigation'],

    init: function () {
        this.control({
            'common-navigation': {
                afterrender: function (panel) {
                    this.buildItems(panel);
                },

                buildItems: function (panel) {
                    this.buildItems(panel);
                },

                addHeadItem: function (navigation, itemConfigs) {
                    if (Ext.isArray(itemConfigs)) {
                        navigation.itemHeads = navigation.itemHeads.concat(itemConfigs);
                    }
                    else {
                        navigation.itemHeads.push(itemConfigs);
                    }

                    this.buildItems(navigation);
                },
                addEndItem: function (navigation, itemConfigs) {
                    if (Ext.isArray(itemConfigs)) {
                        navigation.itemEnds = navigation.itemEnds.concat(itemConfigs);
                    }
                    else {
                        navigation.itemEnds.push(itemConfigs);
                    }
                    this.buildItems(navigation);
                }
            },
            'common-navigation #account': {
                afterrender: function (btn) {
                    var defaultCls = 'account-header-item';

                    var items = [{
                        text: $('#LoginName').html(),
                        cls: defaultCls,
                        glyph: _i('user'),
                        handler: function (btn) {
                            Ext.create('Ext.window.Window', {
                                title: _t('Edit account'),
                                modal: true,
                                width: 400,
                                layout: 'fit',
                                items: {
                                    xtype: 'userprofile'
                                }
                            }).show();
                        }
                    },
                    {
                        text: _t('Change password'),
                        cls: defaultCls,
                        glyph: _i('key'),
                        handler: function (btn) {
                            Ext.create('Ext.window.Window', {
                                title: _t('Change password'),
                                modal: true,
                                width: 400,
                                layout: 'fit',
                                items: {
                                    xtype: 'userpassword'
                                }
                            }).show();
                        }

                    },
                    {
                        text: _t('Sign out'),
                        cls: defaultCls,
                        glyph: _i('sign-out'),
                        handler: function () {
                            if ($("[id$=LoginStatus]").length > 0)
                                $("[id$=LoginStatus]")[0].click();

                            var submitURl = `${document.getElementById("ApplicationRoot").href}Account/LogOff`;
                            var form = $(`<form enctype="multipart/form-data" target="_self" class="form" method="post" action="${submitURl}" style="display:none"></form>`);
                            $('body').append(form);
                            form.submit();

                            setTimeout(function (e) {
                                form.remove();
                            }, 100);

                        }

                    }];

                    var menu = Ext.create('Ext.menu.Menu', {
                        items: items
                    });

                    if (Ext.versions.extjs.getMajor() >= 5) {
                        btn.setMenu(menu);
                    } else {
                        btn.menu = menu;
                    }
                },
                click: function (btn) {

                }
            }
        });
    },

    buildItems: function (panel) {
        var me = panel;

        var defaultItemCfg = {
            xtype: 'button',
            cls: 'common-navigation-button',
            iconAlign: 'left',
            textAlign: 'left',
            scale: 'medium'
        };

        var defaultFullItemCfg = Ext.apply({}, {
            arrowVisible: true
        }, defaultItemCfg);

        var defaultMiniItemCfg = Ext.apply({}, {
            arrowVisible: false
        }, defaultItemCfg);

        me.removeAll();
        //Logo
        if (me.itemViews.logo) {
            var headerLogo = {
                itemId: 'logo',
                icon: '../images/logo.png'
            };

            headerLogo = Ext.apply({}, headerLogo, defaultItemCfg);

            if (me.modeView === 'full') {

            }

            me.add(headerLogo);
        }
        //defaul 6 item
        //kiem tra user 
        //Items head
        if (me.itemHeads && me.itemHeads.length) {
            for (var i = 0; i < me.itemHeads.length; i++) {
                var addItem = {}

                if (me.modeView === 'mini') {
                    addItem = Ext.apply({}, me.itemHeads[i], defaultMiniItemCfg);
                    delete addItem.text;
                }
                else {
                    addItem = Ext.apply({}, me.itemHeads[i], defaultFullItemCfg);
                }

                if (addItem.text) {
                    addItem.text = _t(addItem.text);
                }

                me.add(addItem);
            }
        }

        //Spacefilll
        me.add({
            xtype: 'component',
            itemId: 'spacefill',
            flex: 1
        });

        //Items end
        if (me.itemEnds && me.itemEnds.length) {
            for (var i = 0; i < me.itemEnds.length; i++) {
                var addItem = {}

                if (me.modeView === 'mini') {
                    addItem = Ext.apply({}, me.itemEnds[i], defaultMiniItemCfg);
                    delete addItem.text;
                }
                else {
                    addItem = Ext.apply({}, me.itemEnds[i], defaultFullItemCfg);
                }

                me.add(addItem);
            }
        }

        //Account
        if (me.itemViews.account && $('#LoginName').html() != 'public') {
            var account = {
                itemId: 'account',
                tooltip: _t('Account'),
                glyph: _i('user')
            };

            account = Ext.apply({}, account, defaultItemCfg);

            if (me.modeView === 'full') {
                account.text = $('#LoginName').html();
            }

            me.add(account);
        }

        me.fireEvent('afterbuilditems', me);
    }
});