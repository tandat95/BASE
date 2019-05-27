Ext.define('SCMS.controller.Instruction', {
    extend: 'Ext.app.Controller',

    views: ['Instruction'],

    init: function ()
    {
        this.control
        ({
            'instruction':
            {
                afterrender: function (view)
                {
                    if (view.DATA && view.DATA.Steps)
                    {
                        this.updateSteps(view, view.DATA.Steps);
                    }
                },
                updateSteps: this.updateSteps,
                reload: function()
                {
                    // should be overrided
                }
            },
            'instruction [name="btnStep"]':
            {
                click: function (btn)
                {
                    var me = this;
                    var view = btn.up('instruction');
                    var cfg = btn.wfConfig;
                    if (cfg && cfg.handler)
                    {
                        btn.setGlyph(0xf110);
                        btn.setIconCls('fa-pulse');
                        me.executeStep(view, cfg.handler, cfg, cfg.callback);
                    }
                }
            },
            'instruction #insRefresh':
            {
                click: function(btn)
                {
                    var view = btn.up('instruction');
                    view.fireEvent('reload', view);
                }
            }
        });
    },

    updateSteps: function (view, steps)
    {
        view.removeAll();
        for (var i = 0; i < steps.length; i++)
        {
            var config = JSON.parse(steps[i]);
            view.add({
                cls: 'ins-container',
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'center'
                },
                anchor: '100%',
                defaults: {
                    margin: '0 5 5 0'
                },
                items: [
                {
                    xtype: 'displayfield',
                    value: (i + 1) + '. ' + config.description,
                    flex: 2,
                    hidden: !config.description
                }, {
                    xtype: 'button',
                    name: 'btnStep',
                    text: config.text,
                    style: 'font-family:FontAwesome;',
                    wfConfig: config,
                    flex: 1
                }]
            });
        }

    },

    executeStep: function(view, handlerStr, cfg, callback)
    {
        var me = this;
        var parts = handlerStr.split('.');
        cfg.param["desc"] = cfg.description;
        switch (parts[0])
        {
            case "fireEvent": // Ex: "fireEvent.click.#btnAddForce"
                var targetBtn = Ext.ComponentQuery.query(parts[2]);
                if (targetBtn && targetBtn.length)
                {
                    targetBtn = Ext.applyIf(targetBtn[0], cfg);
                    targetBtn.pressed = true;
                    targetBtn.fireEvent(parts[1], targetBtn, true);
                }
                break;
            case "function": // Ex: "function.executeCommand.event-maincontainer"
                var container = Ext.ComponentQuery.query(parts[2]);
                if (container && container.length)
                {
                    container = container[0];
                    container.fireEvent(parts[1], container, view.DATA.Info, cfg.param, function ()
                    {
                        if (callback)
                        {
                            //container.fireEvent(callback, container, view.DATA.Info, cfg.param);
                            me.executeStep(view, callback, cfg);
                        }
                        else
                        {
                            view.fireEvent('reload', view);
                        }
                    });
                }
                break;
        }
    }
});
