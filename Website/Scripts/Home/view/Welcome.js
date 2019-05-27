Ext.define('Home.view.Welcome', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.app-welcome',

    cls: 'app-welcome',
    layout: {
        type: 'border'
    },

    initComponent: function ()
    {
        var me = this;
        var homePath = Document.Global.getSystemPath().Feature + '/tims';
        var titleView =
            {
                xtype: 'panel',
                region: 'north',
                itemId: 'mainTitle',
                tpl: '<div class="col-md-12 text-center app-welcome-title">' +
                    '   <h2>{title}</h2>' +
                    '   <h2>{subtitle}</h2>' +
                    '</div>',
                data: {
                    title: 'TITLE',
                    subtitle: 'EDIT IT ON WELCOM PAGE'
                }
            };

        var unitsView = {
            region: 'center',
            layout: 'card',
            autoScroll: true,
            itemId: 'mainContainer',
            homePath: homePath,
            items: [{
                xtype: 'viewquerycomponent',
                itemId: 'containerList',
                cls: 'app-container-list',
                queryInfo:
                {
                    Data:
                    {
                        method: 'SearchQuery',
                        path: homePath,
                        isInTree: false,
                        layer: ['CONTAINER'],
                        detail: false,
                        searchKey: '',
                        filterQuery: null,
                        sortby: {
                            SortInfo: [
                            {
                                Field: "Title",
                                Direction: 0
                            }]
                        }
                    }
                },
                tpl: [
                    '<div class="list-menu" id="frmListMenu">',
                    '   <div class="container app-welcome-view">',
                    '       <ul class="">',
                    '           <tpl for=".">',
                    '           <li class="col-md-4 app-welcome-item {Child}" title="{Title}">',
                    '               <a class="thumbnail">',
                    '                   <div class="img-wrap">',
                    '                       <img src="{Icon}">',
                    '                   </div>',
                    '                   <h5>{Title}</h5>',
                    '               </a>',
                    '           </li>',
                    '           </tpl>',
                    '       </ul>',
                    '   </div>',
                    '</div>'
                ],
                trackOver: true,
                remoteSort: false,
                overItemCls: 'app-welcome-item-over',
                itemSelector: '.app-welcome-item',
                prepareData: function (data)
                {
                    //Get config from content
                    var contentConfig = {};

                    if (data && data.Content)
                    {
                        try
                        {
                            contentConfig = JSON.parse(data.Content);
                        }
                        catch (e)
                        {
                            console.error(e);
                        }
                    }


                    //Get icon
                    var icon;
                    var child = 'leaf';

                    if (contentConfig && contentConfig.Icon)
                    {
                        icon = contentConfig.Icon;
                    }
                    else
                    {
                        //TKV:hack for random icon
                        //var icons = ['3D_view', 'archive', 'armchair', 'badge', 'bank', 'banknote', 'bar_chart1', 'bar_chart2', 'book2', 'book3', 'bookmark1', 'bookmark2', 'books1', 'books2', 'cabinet', 'car', 'cassette', 'certificate2', 'check', 'clipboard1', 'clipboard2', 'cloud1', 'cloud2', 'cloud3', 'coffee', 'compass', 'copy', 'credit_card', 'cross', 'database', 'details_small_view', 'download2', 'download3', 'dribbble', 'ecology', 'edit', 'email1', 'eye2', 'file', 'folder', 'gear1', 'gear2', 'globe', 'grid_large_view', 'grid_small_view', 'hammer', 'help', 'home1', 'home2', 'imac', 'image_file', 'inbox1', 'inbox2', 'inbox3', 'inbox4', 'info', 'lifebuoy', 'line_chart', 'livejournal', 'location1', 'location2', 'lock1', 'lock2', 'log_out', 'macbook', 'map1', 'map2', 'multi_files', 'options', 'photo1', 'photo2', 'pie_chart1', 'print', 'shuffle', 'speech_bubble1', 'speech_bubble5', 'tent', 'trash', 'truck', 'upload2', 'user1', 'user3', 'user4', 'wrench_screwdriver'];
                        //icon = icons[Math.floor(Math.random() * icons.length)];
                        if (data.Type === 'folder')
                        {
                            icon = 'grid_large_view';
                            child = 'parent';
                        }
                        else
                        {
                            icon = 'help';
                        }
                    }

                    //Build path for icon /images/icon-app/dashboard.png
                    icon = Ext.String.format('{0}{1}{2}.{3}', Document.Global.getApplicationRoot(), 'images/icon-app/', icon, 'png');

                    data.IconType = data.Type;
                    data.Icon = icon;
                    data.Child = child;

                    return data;
                }
            },
            {
                itemId: 'containerItem',
                layout: 'fit',
                items: []
            }]
        };

        me.items = [titleView, unitsView];

        this.callParent();
    }
});