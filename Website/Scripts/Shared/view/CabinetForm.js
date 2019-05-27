Ext.define('SCMS.view.CabinetFormView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cabinetformview',

    FORM_ACTION: 'CREATE', // CREATE, UPDATE, VIEW
    FORM_DATA: {}, // Id,
    bodyPadding: 10,
    autoHeight: true,

    anchor: '100%',
    selectOnFocus: true,
    labelWidth: 150,

    formType: 'mapeditorform',
    showAngle: false,
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
            { xtype: 'hiddenfield', PropertyField: "Coordinate" },
            { xtype: 'hiddenfield', PropertyField: "RoadShape" },
            { xtype: 'hiddenfield', PropertyField: "SnapPoint" },
            {
                PropertyField: "Title",
                needFocus: true
            },
            {
                PropertyField: "GroupNumber"
            }]
        }];

        this.callParent();
    }
});
