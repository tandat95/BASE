Ext.define('Shared.view.MapPrintPage', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.mapprintpage',
    layout: 'border',

    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                region: 'west',
                flex: .5,
                title: _t('In'),
                header: false,
                collapsible: true,
                split: true,
                defaults: {
                    margin: 10
                },
                items: [
                    {
                        itemId: 'cbShowLogo',
                        xtype: 'checkbox',
                        boxLabel: _t('Hiển thị logo'),
                        checked: true
                    }, {
                        xtype: 'panel',
                        title: _t('Căn lề '),
                        layout: {
                            type: 'vbox',
                        },
                        defaultType: 'numberfield',
                        items: [{
                            itemId: 'txtMarginTop',
                            fieldLabel: _t('Căn lề trên'),
                            value: 0,
                            step: 5,
                            maxValue: 1000,
                            minValue: 0
                        }, {
                            itemId: 'txtMarginLeft',
                            fieldLabel: _t('Căn lề trái'),
                            value: 0,
                            step: 5,
                            maxValue: 1000,
                            minValue: 0
                        }, {
                            itemId: 'txtMarginBottom',
                            fieldLabel: _t('Căn lề dưới'),
                            value: 0,
                            step: 5,
                            maxValue: 1000,
                            minValue: 0
                        }, {
                            itemId: 'txtMarginRight',
                            fieldLabel: _t('Căn lề phải'),
                            value: 0,
                            step: 5,
                            maxValue: 1000,
                            minValue: 0
                        }]
                    }, {
                        xtype: 'panel',
                        title: 'Kích thước bản đồ',
                        layout: {
                            type: 'vbox'
                        },
                        defaults: {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            width: '100%',
                            margin: '0 0 10 0'
                        },
                        items: [
                            {
                                xtype: 'combo',
                                itemId: 'cbxPaperSize',
                                fieldLabel: _t('Khổ giấy'),
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['Name', 'Width', 'Height'],
                                    data: [
                                        { "Name": "A4", "Width": "21", "Height": "29.7" },
                                        { "Name": "A3", "Width": "29.7", "Height": "42" },
                                        { "Name": "A2", "Width": "42", "Height": "59.4" }
                                    ]
                                }),
                                queryMode: 'local',
                                displayField: 'Name',
                                valueField: 'Name',
                                value: 'A4'
                            },
                            {
                                items: [
                                    {
                                        itemId: 'sldWidth',
                                        xtype: 'slider',
                                        fieldLabel: _t('Rộng'),
                                        value: 794,
                                        increment: 10,
                                        minValue: 0,
                                        maxValue: 10000,
                                        flex: .6,
                                        labelAlign: 'left',
                                        labelWidth: 30
                                    },
                                    {
                                        itemId: 'txtWidth',
                                        xtype: 'numberfield',
                                        flex: .3,
                                        value: 794,
                                        step: 10,
                                        maxValue: 10000,
                                        minValue: 0,
                                        margin: '0 10 0 10'
                                    },
                                    {
                                        xtype: 'label',
                                        flex: .1,
                                        text: 'px'
                                    }
                                ]
                            }, {
                                items: [
                                    {
                                        itemId: 'sldHeight',
                                        xtype: 'slider',
                                        fieldLabel: _t('Dài'),
                                        value: 1066,
                                        increment: 10,
                                        minValue: 0,
                                        maxValue: 10000,
                                        flex: .6,
                                        labelAlign: 'left',
                                        labelWidth: 30
                                    },
                                    {
                                        itemId: 'txtHeight',
                                        xtype: 'numberfield',
                                        flex: .3,
                                        value: 1066,
                                        step: 10,
                                        maxValue: 10000,
                                        minValue: 0,
                                        margin: '0 10 0 10'
                                    },
                                    {
                                        xtype: 'label',
                                        flex: .1,
                                        text: 'px',
                                    }
                                ]
                            }
                        ]
                    }, {
                        xtype: 'button',
                        itemId: 'btnPrintMap',
                        text: _t('In bản đồ'),
                    }, {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                itemId: 'sldZoomToReview',
                                xtype: 'slider',
                                fieldLabel: _t('Xem trước'),
                                value: 10,
                                increment: 1,
                                minValue: 0,
                                maxValue: 10,
                                flex: .8,
                                labelAlign: 'left',
                                labelWidth: 80
                            }, {
                                itemId: 'txtZoomToReview',
                                xtype: 'numberfield',
                                flex: .2,
                                value: 10,
                                step: 1,
                                maxValue: 10,
                                minValue: 0,
                                margin: '0 10 0 10'
                            }]
                    }]
            },
            {
                xtype: 'panel',
                region: 'center',
                itemId: 'printContainer',
                scrollable: true,
                layout: 'center',
                bodyStyle: 'background: #eee;margin : 0 auto',
                items: {
                    itemId: 'mapPrintContainer',
                    cls: 'mapPrintContainer',
                    width: TIMS.Global.cmToPixels(21),
                    height: TIMS.Global.cmToPixels(29.7),
                    style: 'border:1px solid green;',
                    //layout: 'border',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            itemId: 'panelLogo',
                            //region: 'north',
                            xtype: 'panel',
                            height: 57,
                            html: '<img src="/Content/images/logo_tims_print.png" width="200" height="60" style="float:left"/>',
                        },
                        {
                            itemId: 'panelMap',
                            //region: 'center',
                            items: [
                                {
                                    itemId: 'mapContainer',
                                    width: TIMS.Global.cmToPixels(21),
                                    height: TIMS.Global.cmToPixels(29.7) - 57,
                                }]
                        }]
                }
            }];
        this.callParent();
    }
})