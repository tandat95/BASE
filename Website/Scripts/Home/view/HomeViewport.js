Ext.define('Home.view.HomeViewport', {
    extend: 'Ext.container.Viewport',

    alias: 'widget.home-viewport',

    layout: {
        type: 'border'
    },

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'common-navigation',
            itemId: 'header',
            itemCls: 'header-medium-item',
            cls: 'top-header',
            region: 'north',
            modeView: 'full',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            itemHeads: [
                {
                    //width: 270,
                    //height: 50,
                    //margin: 0,
                    //padding: 0,
                    //iconCls: 'app-logo-medium',
                    //handler: function () {
                    //    TIMS.Global.gotoSection('home');
                    //}
                }],
            itemEnds: [],
            itemViews: {
                logo: false,
                account: true
            }
        },
        {
            region: 'center',
            bodyCls: 'app-background',
            itemId: 'contentWrapper',
            xtype: 'app-welcome'
        }]; //End items

        this.callParent();
    }
});