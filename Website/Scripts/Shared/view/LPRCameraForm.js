Ext.define('SCMS.view.CameraFormView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cameraformview',

    FORM_ACTION: 'CREATE', // CREATE, UPDATE, VIEW
    FORM_DATA: {}, // Id,
    bodyPadding: 10,
    autoHeight: true,

    anchor: '100%',
    selectOnFocus: true,
    labelWidth: 150,

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
        me.layout = 'fit';
        me.items = [{
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
              { xtype: 'hiddenfield', PropertyField: "RoadSegment" },
            { xtype: 'hiddenfield', PropertyField: "Location" },
            { xtype: 'hiddenfield', PropertyField: "RoadShape" },
            { xtype: 'hiddenfield', PropertyField: "SnapPoint" },
            {
                PropertyField: "Title",
                needFocus: true
            },
            {
                PropertyField: "GroupNumber"
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: _t('Hướng camera'),
                layout: 'hbox',
                defaults: fieldContainerDefaults,
                items: [{
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
                }, {
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
                //    cls: 'slider-label',
                //    itemId: 'UpdatingAngleLabel'
                //}
                ]
            },
            {
                PropertyField: "LaneNumber"
            }]
        }];

        this.callParent();
    }
});
