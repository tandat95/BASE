Ext.define('SCMS.view.TrafficLightFormView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.trafficlightformview',

    FORM_ACTION: 'CREATE', // CREATE, UPDATE, VIEW
    FORM_DATA: { Layer: 'TRAFFICLIGHT' }, // Id,
    bodyPadding: 10,
    autoScroll: true,

    formType: 'mapeditorform',
    showAngle: true,
    initComponent: function ()
    {
        var me = this;

        var formDefaults =
        {
            anchor: '100%',
            //labelAlign: 'right',
            selectOnFocus: true,
            labelWidth: 150
        };

        var fieldContainerDefaults =
        {
            anchor: '100%',
            //labelAlign: 'right',
            selectOnFocus: true,
            labelWidth: 150
        };

        var doCapitalize = function (field)
        {
            var value = field.getValue();
            if (value)
            {
                //field.setValue(value.replace(/\w+/g, function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); }));
                var values = value.split(' ');
                for (var i = 0; i < values.length; i++)
                {
                    values[i] = values[i][0].toUpperCase() + values[i].slice(1).toLowerCase();
                }
                field.setValue(values.join(' '));
            }
        };

        /* Config form from here */
        var fields1 =
       {
           title: _t('Thông tin chung'),
           name: 'fieldsTab',
           xtype: 'bindingform',
           bodyPadding: 10,
           defaults: formDefaults,
           layout: 'anchor',

           //Default panel
           FORM_DATA:
           {
               Layer: me.FORM_DATA.Layer,
               LayerData: me.FORM_DATA.LayerData,
               Id: me.FORM_DATA.record ? me.FORM_DATA.record.Id : null
           },
           FORM_ACTION: me.FORM_ACTION,
           FORM_LAYOUT: [{ xtype: 'hiddenfield', PropertyField: "Coordinate" },
            {
                PropertyField: "Title",
                needFocus: true
            }, {
                PropertyField: "ProductModel",
                needFocus: true
            }, {
                PropertyField: "Description",
                needFocus: true
            },
            {
                PropertyField: "GroupNumber"
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: _t('Hướng đèn giao thông'),
                layout: 'hbox',
                defaults: fieldContainerDefaults,
                items: [
                {
                    PropertyField: "DirectionAngle",
                    fieldLabel: '',
                    flex: 3,
                    xtype: 'sliderfield',
                    value: 0,
                    increment: 1,
                    minValue: 0,
                    maxValue: 360
                }, {
                    xtype: 'numberfield',
                    flex: 1.5,
                    margin: '0 0 0 5',
                    itemId: 'directionAngleField',
                    increment: 5,
                    minValue: 0,
                    maxValue: 360
                },
                    {
                        xtype: 'button',
                        glyph: _i('exchange'),
                        margin: '0 0 0 5',
                        itemId: 'reverseDirectionAngle',
                        tooltip: _t('Reverse')
                    }
                //{
                //    xtype: 'label',
                //    margin: '0 0 0 10',
                //    flex: 3,
                //    //cls: 'slider-label',
                //    itemId: 'UpdatingAngleLabel'
                //}
                    
                ]
            },
            {
                PropertyField: "LaneDescription"
            },
            {
                PropertyField: "TechnologyDescription"
            }]
       };

        var fields2 =
      {
          title: _t('Thông tin đầu tín hiệu'),
          name: 'fieldsTab',
          xtype: 'bindingform',
          bodyPadding: 10,
          defaults: formDefaults,
          layout: 'anchor',

          //Default panel
          FORM_DATA:
          {
              Layer: me.FORM_DATA.Layer,
              LayerData: me.FORM_DATA.LayerData,
              Id: me.FORM_DATA.record ? me.FORM_DATA.record.Id : null
          },
          FORM_ACTION: me.FORM_ACTION,
          FORM_LAYOUT: [
            {
                PropertyField: "SignalHeadHousing",
                needFocus: true
            },
            {
                PropertyField: "SignalHeadHousingMaterial"
            },
            {
                PropertyField: "SignalHeadHood"
            },
            {
                PropertyField: "SignalHeadType"
            },
            {
                PropertyField: "SignalHeadColorAspect"
            }]
      };
        var fields3 =
      {
          title: _t('Thông tin đèn led'),
          name: 'fieldsTab',
          xtype: 'bindingform',
          bodyPadding: 10,
          defaults: formDefaults,
          layout: 'anchor',

          //Default panel
          FORM_DATA:
          {
              Layer: me.FORM_DATA.Layer,
              LayerData: me.FORM_DATA.LayerData,
              Id: me.FORM_DATA.record ? me.FORM_DATA.record.Id : null
          },
          FORM_ACTION: me.FORM_ACTION,
          FORM_LAYOUT: [
            {
                PropertyField: "LedDescription",
                needFocus: true
            },
            {
                PropertyField: "LedRetrofitDia"
            },
            {
                PropertyField: "LedActivation"
            },
            {
                PropertyField: "LedInstensive"
            },
            {
                PropertyField: "LedLightInstensive"
            },
            {
                PropertyField: "LedChainFailure"
            },
            {
                PropertyField: "LedWaveLength"
            },
            {
                PropertyField: "LedPCBProtection"
            },
            {
                PropertyField: "LedInterface"
            }]
      };

        var fields4 =
      {
          title: _t('Thông tin nguồn điện'),
          name: 'fieldsTab',
          xtype: 'bindingform',
          bodyPadding: 10,
          defaults: formDefaults,
          layout: 'anchor',

          //Default panel
          FORM_DATA:
          {
              Layer: me.FORM_DATA.Layer,
              LayerData: me.FORM_DATA.LayerData,
              Id: me.FORM_DATA.record ? me.FORM_DATA.record.Id : null
          },
          FORM_ACTION: me.FORM_ACTION,
          FORM_LAYOUT: [
            {
                PropertyField: "PowerInput",
                needFocus: true
            },
            {
                PropertyField: "PowerConsumption"
            },
            {
                PropertyField: "PowerSupply"
            },
            {
                PropertyField: "PowerFactor"
            },
            {
                PropertyField: "PowerProtection"
            }]
      };

        var fields5 = {
            title: _t('Thông tin bao đèn tín hiệu'),
            name: 'fieldsTab',
            xtype: 'bindingform',
            bodyPadding: 10,
            defaults: formDefaults,
            layout: 'anchor',

            //Default panel
            FORM_DATA:
            {
                Layer: me.FORM_DATA.Layer,
                LayerData: me.FORM_DATA.LayerData,
                Id: me.FORM_DATA.record ? me.FORM_DATA.record.Id : null
            },
            FORM_ACTION: me.FORM_ACTION,
            FORM_LAYOUT: [
                {
                    PropertyField: "EnclosureBody",
                    needFocus: true
                },
                {
                    PropertyField: "EnclosureViewingAngle"
                },
                {
                    PropertyField: "EnclosureVisibility"
                },
                {
                    PropertyField: "EnclosureTemperature"
                },
                {
                    PropertyField: "EnclosureDimming"
                },
                {
                    PropertyField: "EnclosureEnviroment"
                },
                {
                    PropertyField: "EnclosureMTBF"
                },
                {
                    PropertyField: "EnclosureMTTR"
                },
                {
                    PropertyField: "EnclosureTermination"
                }]
        }

        var tabItems = [fields1, fields2, fields3, fields4, fields5];
        me.layout = 'fit';
        me.items = [
            {
                xtype: 'tabpanel',
                itemId: 'mainTab',
                activeTab: 0,
                deferredRender: false,
                //tabPosition: 'right',
                //stateEvents: ['tabchange'],
                //activeTab: Ext.state.Manager.get('active_tab', 0),
                stateful: true,
                items: tabItems,
                listeners: {
                    'tabchange': function (panel)
                    {
                        var activeTab = panel.getActiveTab();
                        Ext.state.Manager.set('active_tab', panel.items.indexOf(activeTab));

                        var field = activeTab.down('[needFocus=true]');
                        if (field)
                        {
                            var form = field.up('form');
                            if (!form || form.xtype !== 'bindinggridform')
                            {
                                field.focus();
                            }
                            else
                            {
                                var grid = field.up('grid');
                                if (grid && grid.editingPlugin)
                                {
                                    var store = grid.getStore();
                                    if (store.getCount() > 0)
                                    {
                                        var record = store.getAt(store.getCount() - 1);
                                        grid.editingPlugin.startEdit(record);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ];
        this.callParent();
    }
});
