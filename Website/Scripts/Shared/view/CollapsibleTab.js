Ext.define("Shared.view.CollapsibleTabPanel", {
    extend: 'Ext.tab.Panel',
    alias: 'widget.collapsibletab',

    expandTool: undefined,

    collapsible: false,

    expandedTab: true,

    expandGlyph: '',
    collapseGlyph: '',

    expandTab: function ()
    {
        this.expandedTab = true;
        if (this.expandTool.setType)
        {
            this.expandTool.setType('expand-top');
        }
        else if (this.expandTool.collapseGlyph)
        {
            var btn = this.down('#' + this.expandTool.itemId);
            if (btn && btn.setGlyph)
            {
                btn.setGlyph(this.expandTool.collapseGlyph);
            }
        }

            if (this.orgTabPosition && this.orgTabPosition != this.tabPosition)
            {
                this.setTabPosition(this.orgTabPosition);
            }

            if (this.expandTool.direction == 'top' || this.tabPosition.direction == 'bottom')
            {
                this.setHeight(this.getMaxHeight());
            }
            else
            {
                this.setWidth(this.lastWidth);
            }
        return true;
    },

    collapseTab: function ()
    {
        this.expandedTab = false;
        if (this.expandTool.setType)
        {
            this.expandTool.setType('expand-bottom');
        }
        else if (this.expandTool.expandGlyph)
        {
            var btn = this.down('#' + this.expandTool.itemId);
            if (btn && btn.setGlyph)
            {
                btn.setGlyph(this.expandTool.expandGlyph);
            }
        }

            if (this.expandTool.direction != this.tabPosition)
            {
                if (!this.orgTabPosition) this.orgTabPosition = this.tabPosition;
                this.setTabPosition(this.expandTool.direction);
            }

            if (this.expandTool.direction == 'top' || this.tabPosition.direction == 'bottom')
            {
                this.setHeight(this.getTabBar().getHeight());
            }
            else
            {
                this.lastWidth = this.getWidth();
                this.setWidth(this.getTabBar().getWidth());
            }
        return true;
    },

    toggleTabCollapse: function ()
    {
        if (!this.getActiveTab())
            this.setActiveTab(0);
        return (this.expandedTab) ? this.collapseTab() : this.expandTab();
    },

    constructor: function (config)
    {
        var me = this;

        this.callParent(arguments);

        var l = this.getTabBar().items.length > 0;

        for (var i = 0; i < l; i++)
        {
            this.getTabBar().getComponent(i).on('click', function (tab)
            {
                if (!me.expandedTab || !me.getActiveTab() || me.getActiveTab().title === tab.title)
                {
                    me.toggleTabCollapse();
                }
                return true;
            });
        }
        if (!me.expandTool)
        {
            me.expandTool = Ext.create('Ext.panel.Tool', {
                type: 'expand-bottom',
                uiCls: ['top'],
                handler: me.toggleTabCollapse,
                componentCls: 'expander',
                scope: me
            });
        }
        else if (!me.expandTool.handler)
        {
            me.expandTool.handler = me.toggleTabCollapse;
            me.expandTool.scope = me;
        }

        if (!me.expandTool.direction) me.expandTool.direction = me.tabPosition;

        var hasTabs = l > 0;
        if (hasTabs)
        {
            this.getTabBar().add({xtype: 'tbfill'});
            this.getTabBar().add(me.expandTool);//addTool
        }


        //Add the event if added at runtime
        this.getTabBar().on('add', function (tab, component)
        {
            var hasTabs = this.items.length > 1;

            if (!hasTabs)
            {
                this.suspendEvents();
                this.add({xtype: 'tbfill'});
                this.add(me.expandTool);
                this.resumeEvents();
            }

            if (component != me.expandTool)
            {
                component.on('click', function (tab)
                {
                    if (!me.expandedTab || !me.getActiveTab() || me.getActiveTab().title === tab.title)
                    {
                        me.toggleTabCollapse();
                    }
                    return true;
                }, me);
            }

        });

        this.getTabBar().on('afterrender', function (tab, component)
        {
            if (me.collapsed)
            {
                me.collapseTab();
            }
        });

    }
});