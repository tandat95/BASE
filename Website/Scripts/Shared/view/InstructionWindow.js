Ext.define('SCMS.view.Instruction', {
    extend: 'Ext.window.Window',
    alias: 'widget.instruction',
    title: _t('Hướng dẫn'),

    resizable: true,
    autoScroll: true,
    collapsible: true,
    titleCollapse: true,
    collapseMode: 'header',
    collapseDirection: 'bottom',
    animCollapse: false,
    collapseFirst: false,
    expandOnShow: false,

    width: '90%',
    height: '90%',
    defaultAlign: 'c-c',

    bodyPadding: 10,

    tools: [
    {
        itemId: 'insRefresh',
        type: 'refresh'
    },
    {
        type: 'help',
        itemId: 'insHelp'
    }],

    initComponent: function ()
    {
        var me = this;
        if (!me.listeners || !me.listeners.collapse)
        {
            me.listeners = {
                collapse: function (window, opts)
                {
                    if (me.defaultAlign == 'c-c')
                    {
                        window.alignTo(Ext.getBody(), 'bl-bl');
                    } else
                    {
                        window.alignTo(Ext.getBody(), me.defaultAlign);
                    }
                }
            }
        }

        this.callParent();
    }

});