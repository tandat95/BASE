

Ext.define('Home.controller.HomeViewport', {
    extend: 'Ext.app.Controller',

    views: ['HomeViewport'],

    init: function ()
    {
        this.control
            ({
                'home-viewport':
                    {
                        beforerender: function (panel)
                        {
                            //var me = this;
                            //me.curentPage = 'Home';
                            //var header = panel.down('#header');
                            //if (header) {
                            //    TIMS.Global.createButtonLayers(header, me.curentPage);
                            //}

                        }

                    }
            });
    }
});