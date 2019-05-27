Ext.define('TIMS.Global', {
    singleton: true,
    EditorShapeLayer: 'EDITOR_SHAPE',
    EditorShapePropertyName: 'Shape',
    EditorShapePath: Document.Global.SYSTEM_PATH.Library + '/data/editor_shape',
    EditorShapeDraftPath: Document.Global.SYSTEM_PATH.Library + '/data/editor_shape/draft',
    EditorShapePublicPath: Document.Global.SYSTEM_PATH.Library + '/data/editor_shape/public',

    /**
     * Return application root path
     * @param {} path 
     * @returns {} 
     */
    getAppPath: function (path) {
        return document.getElementById("ApplicationRoot").href + path;
    },
    getIconCls: function (data, clsType) {
        var iconCls = null;
        switch (data.Type) {
            case 'layer':
                iconCls = clsType == 'fa' ? 'fa fa-database' : 'x-icon-database';
                break;
            case 'formbuilder':
                iconCls = clsType == 'fa' ? 'fa fa-columns' : 'x-icon-form';
                break;
            case 'template':
                iconCls = clsType == 'fa' ? 'fa fa-clone' : 'x-icon-template';
                break;
            case 'datamanager':
                iconCls = clsType == 'fa' ? 'fa fa-cogs' : 'x-icon-datamanager';
                break;
        }
        return iconCls;
    },
    /**
     * Return glyph icon for features
     * @param {} item 
     * @returns {} 
     */
    getGlypthIcon: function (item) {
        var icon = _i('database');
        if (item) {
            switch (item.toLowerCase()) {
                case 'dashboard':
                    icon = _i('desktop');
                    break;
                case 'layers':
                case 'manage':
                    icon = _i('database');
                    break;
                case 'explore':
                    icon = _i('map');
                    break;
                case 'report':
                    icon = _i('pie-chart');
                    break;
                case 'home':
                    icon = _i('home');
                    break;
                case 'admin':
                    icon = _i('cog');
                    break;

                case 'document':
                    icon = _i('cog');
                    break;
                case 'tra':
                    icon = _i('road');
                    break;
                case 'wat':
                    icon = _i('tint');
                    break;
                case 'tel':
                    icon = _i('sitemap');
                    break;
                case 'ele':
                    icon = _i('bolt');
                    break;
                case 'user':
                    icon = _i('user');
                    break;
                case 'editor':
                    icon = _i('pencil-square');
                    break;
                case 'streetview':
                    icon = _i('street-view');
                    break;

            }
        }
        return icon;
    },
    /**
     * Navigate to pages
     * @param {} type 
     * @returns {} 
     */
    gotoSection: function (type) {
        if (type) {
            type = type.toLowerCase();
            switch (type) {
                case 'home':
                    window.location = Document.Global.getApplicationRoot();
                    break;
                case 'manage':
                    window.location = Document.Global.getApplicationRoot() + 'Manager';
                    break;
                case 'admin':
                    window.location = Document.Global.getApplicationRoot() + 'Admin';
                    break;
                case 'report':
                    window.location = Document.Global.getApplicationRoot() + 'Reports';
                    break;
                case 'explore':
                    window.location = Document.Global.getApplicationRoot() + 'Explore';
                    break;
                case 'editor':
                    window.location = Document.Global.getApplicationRoot() + 'Editor';
                    break;
            }
        }
        else {
            Ext.Msg.alert(_t('Thông báo'), _t('Đường dẫn không hợp lệ, vui lòng kiểm tra lại'));
        }
    },
    /**
     * Sorter for a list using "Order" property
     * @param {} list 
     * @returns {} 
     */
    sortFunc: function (list) {
        return Ext.Array.sort(list, function (a, b) {
            var orderA = Ext.decode(a.Content || "{}");
            var orderB = Ext.decode(b.Content || "{}");
            orderA = orderA.order || orderA.Order || 0;
            orderB = orderB.order || orderB.Order || 0;
            if (orderA && orderB) {
                if (orderA > orderB) {
                    return 1;
                }
                else if (orderA < orderB) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
            else {
                return 0;
            }
        });
    },
    /**
     * Default drawing style on map
     */
    drawStyleDefault: {
        StrokeWidth: 5,
        StrokeColor: 'FF1800',
        FillColor: 'FF1800',
        FontColor: 'ffffff',
        StrokeOpacity: 0.5,
        FillOpacity: 0.5,
        BackgroundColor: '0089e0',
        DaskArray: null
    },
    CameraInterval: 1000,
    CameraWidth: 400,
    CameraHeight: 300,
    /**
     * Create dynamic menu items
     * @param {} headPanel 
     * @param {} currentPage 
     * @param {} filters 
     * @returns {} 
     */
    createButtonLayers: function (headPanel, currentPage, filters) {
        VDMS.Web.Library.AJAX.FolderAjax.SearchQuery(Document.Global.getSystemPath().Feature + "/TIMS",
            false,
            '',
            null,
            false,
            1,
            -1,
            filters || [],
            null,
            ['Content'],
            function(data) {
                if (data && data.value) {
                    data = data.value;
                    if (data && data.length > 0 && data[1] && data[1][0]) {
                        var list = TIMS.Global.sortFunc(data[1][0]);

                        var sections = [];

                        for (var i = 0; i < list.length; i++) {
                            var section = list[i];
                            var content = Ext.decode(section.Content || "{}");
                            var type = content.Type || section.Title;
                            var item = {
                                glyph: TIMS.Global.getGlypthIcon(type),
                                tooltip: _t(section.Title),
                                text: _t(section.Title),
                                type: type,
                                pressed: type == currentPage,
                                itemId: type
                            };

                            if (type.toUpperCase() == 'DASHBOARD') {
                                item.menu = [
                                    {
                                        text: _t('Xem dạng tổng quan'),
                                        group: 'viewTypeDasboard',
                                        iconCls: 'x-document-view-centerToolbar-menuViewByTile',
                                        cls: 'app-menu-item-large',
                                        name: 'gridViewDashBoard',
                                        handler: function(item, e, opts) {
                                            window.location = Document.Global.getApplicationRoot() + 'dashboard#portlet';
                                        }
                                    }, {
                                        text: _t('Xem dạng danh sách'),
                                        iconCls: 'x-document-view-centerToolbar-menuViewByList',
                                        cls: 'app-menu-item-large',
                                        group: 'viewTypeDasboard',
                                        name: 'listViewDashBoard',
                                        handler: function(item, e, opts) {
                                            window.location = Document.Global.getApplicationRoot() + 'dashboard#list';
                                        }
                                    }
                                ];
                            } else if (type.toUpperCase() == 'REPORT') {
                                item.menu = [{
                                    text: _t('Lập báo cáo'),
                                    group: 'viewTypeDasboard',
                                    iconCls: 'x-document-view-centerToolbar-menuViewByTile',
                                    cls: 'app-menu-item-large',
                                    name: 'gridViewDashBoard',
                                    handler: function (item, e, opts) {
                                        window.location = Document.Global.getApplicationRoot() + 'Reports';
                                    }
                                }, {
                                    text: _t('Xem báo cáo'),
                                    iconCls: 'x-document-view-centerToolbar-menuViewByList',
                                    cls: 'app-menu-item-large',
                                    group: 'viewTypeDasboard',
                                    handler: function (item, e, opts) {
                                        window.location = Document.Global.getApplicationRoot() + 'Reports/ReportList';
                                    }
                                }];
                            } else {
                                item.listeners = {
                                    click: function(btn) {
                                        if (!btn.pressed) {
                                            TIMS.Global.gotoSection(btn.type);
                                        }
                                    }
                                }
                            }
                            sections.push(item);
                        }
                        headPanel.fireEvent('addHeadItem', headPanel, sections);
                    }
                }
            })
        },

        createFeaterItems: function (currentPage, filters,fnCallback) {
            VDMS.Web.Library.AJAX.FolderAjax.SearchQuery(VDMS_DATA.SystemPaths.Rows[0].Feature + "/TIMS",
                false,
                '',
                null,
                false,
                1,
                -1,
                filters,
                null,
                ['Content'],
                function(data) {
                    var sections = [];
                    if (data && data.value) {
                        data = data.value;
                        if (data && data.length > 0 && data[1] && data[1][0]) {
                            var list = TIMS.Global.sortFunc(data[1][0]);

                            sections = [];
                            for (var i = 0; i < list.length; i++) {
                                var section = list[i];
                                var item = {
                                    glyph: TIMS.Global.getGlypthIcon(section.Title),
                                    tooltip: _t(section.Description),
                                    text: _t(section.Description || section.Name),
                                    type: section.Title,
                                    pressed: section.Title == currentPage,
                                    itemId: section.Title,
                                    listeners:
                                    {
                                        click: function(btn) {
                                            if (!btn.pressed) {
                                                TIMS.Global.gotoSection(btn.type);
                                            }
                                        }
                                    }
                                };
                                if (section.Title != 'Admin') {
                                    sections.push(item);
                                }

                            }
                            //  headPanel.fireEvent('addHeadItem', headPanel, sections);
                        }
                    }

                    if (fnCallback) {
                        fnCallback.call(this, sections);
                    }
                });
        },
        createEditorMarker: function (mapPanel, geoJson, markerOpts, data, opts, callback)
        {
            var map = mapPanel.map;
            var marker = map.createMarkerFrom(geoJson, markerOpts);
            marker.data = data;
            marker.editMode = true;

            // create buffer
            if (opts.showBuffer)
            {
                var radius = opts.bufferRadius;
                marker.getOptions().buffer = radius;
                var pos = marker.getPosition();

                marker.buffer = new vbd.Circle({
                    center: pos,
                    radius: radius,
                    map: map,
                    //fillColor: '#FFFDA3',
                    fillOpacity: 0.4,
                    strokeWidth: 0
                });

                if (map.getZoom() < 16)
                {
                    map.setZoom(16);
                }
                map.setCenter(pos);

                if (map.findRoadSegment)
                {
                    marker.findRoadSegment = function (markerPos)
                    {
                        var geo = new jsts.geom.Point(new jsts.geom.Coordinate(markerPos.Longitude, markerPos.Latitude)).buffer(radius / 100000);
                        var geojsonPolygon = new jsts.io.GeoJSONWriter().write(geo);

                        var getData = function (nodeInfo)
                        {
                            if (nodeInfo && nodeInfo.Properties)
                            {
                                for (var j = 0; j < nodeInfo.Properties.length; j++)
                                {
                                    var prop = nodeInfo.Properties[j];
                                    nodeInfo[prop['Name']] = prop['Value'];
                                }
                            }
                            return nodeInfo;
                        }
                    }
                    map.roadSegmentMarkers = [];
                    map.selectedRoadSegment = null;

                    if (marker.snapPoint) {
                        marker.snapPoint.setMap(null);
                        marker.snapPoint = null;
                    }

                    if (mapPanel.roadInfoWindow) mapPanel.roadInfoWindow.close();

                    // Start find road segment intersects with marker
                    map.findRoadSegment(Ext.encode(geojsonPolygon), radius, function (res) {
                        if (res && res.length) {
                            for (var i = 0; i < res.length; i++) {
                                res[i] = getData(res[i]);
                                if (res[i]['CollectionSolrGeometry']) {
                                    var latLngs = [];
                                    var geo = Ext.decode(res[i]['CollectionSolrGeometry']);
                                    for (var j = 0; j < geo.coordinates.length; j++) {
                                        latLngs.push(new vbd.LatLng(geo.coordinates[j][1], geo.coordinates[j][0]));
                                    }

                                    var style = {
                                        strokeColor: '#0083FF',
                                        strokeWidth: 5,
                                        strokeOpacity: 0.7,
                                        strokeDasharray: null
                                    };

                                    var roadPolyline = new vbd.Polyline({ path: latLngs, strokeColor: style.strokeColor, strokeOpacity: style.strokeOpacity, strokeWidth: style.strokeWidth, strokeDasharray: style.strokeDasharray });
                                    roadPolyline.data = res[i];
                                    roadPolyline.setMap(map);
                                    // keep in array for later used
                                    map.roadSegmentMarkers.push(roadPolyline);

                                    if (data && data['RoadSegment'] != null && res[i]['Guid'] == data['RoadSegment']) {
                                        roadPolyline.setStrokeColor('#F90A0F');
                                    }

                                    // SELECT ROAD SEGMENT
                                    vbd.event.addListener(roadPolyline, 'click', function (m) {
                                        // Set active
                                        if (map.selectedRoadSegment) {
                                            map.selectedRoadSegment.setStrokeColor('#0083FF');
                                        }
                                        m.Me.setStrokeColor('#F90A0F');
                                        map.selectedRoadSegment = m.Me;

                                        // Show info

                                        var roadSegmentData = m.Me.data;
                                        if (roadSegmentData) {
                                            if (map.infoWindowObj) {
                                                map.infoWindowObj.close();
                                            }
                                            var roadInfoHtml = '';
                                            roadInfoHtml += '<div class="roadSegmentInfo">';
                                            roadInfoHtml += '    <span class="roadName"><strong>{0}</strong></span>';
                                            roadInfoHtml += '    <br>';
                                            roadInfoHtml += '    <p class="roadDetail">';
                                            //roadInfoHtml += '        <span class="roadDirection"><i class="fa fa-exchange" aria-hidden="true"></i> ' + _t('Chiều đường') + ': {1}</span>';
                                            roadInfoHtml += '        <span class="roadLane"><i class="fa fa-road" aria-hidden="true"></i> ' + _t('Số lane đường') + ': {2}</span>';
                                            roadInfoHtml += '    </p>';
                                            roadInfoHtml += '</div>';
                                            map.infoWindowObj = new vbd.InfoWindow({
                                                content: Ext.String.format(roadInfoHtml, roadSegmentData.Title, roadSegmentData.Direction, roadSegmentData.Lanes),
                                                position: m.LatLng
                                            });
                                            map.infoWindowObj.open(map);
                                            //if (mapPanel.roadInfoWindow)
                                            //{
                                            //    mapPanel.roadInfoWindow.close();
                                            //}
                                            //mapPanel.roadInfoWindow = Ext.create('Ext.window.Window',
                                            //{
                                            //    width: 250,
                                            //    height: 150,
                                            //    title: roadSegmentData.Title,
                                            //    bodyPadding: 10,
                                            //    defaults: {
                                            //        labelWidth: 120,
                                            //        anchor: '100%'
                                            //    },
                                            //    items: [
                                            //        //{
                                            //        //    xtype: 'displayfield',
                                            //        //    fieldLabel: '<i class="fa fa-exchange" aria-hidden="true"></i> ' + _t('Chiều đường'),
                                            //        //    value: roadSegmentData.Direction
                                            //        //},
                                            //        {
                                            //            xtype: 'displayfield',
                                            //            fieldLabel: '<i class="fa fa-road" aria-hidden="true"></i> ' + _t('Số lane đường'),
                                            //            value: roadSegmentData.Lanes
                                            //        }
                                            //    ]
                                            //}).showBy(mapPanel, 'tl-tl');
                                        }

                                        // snap to street
                                        var arrRoadSegments = map.selectedRoadSegment.getPath().toArray();
                                        var snapPoint = vbd.Util.ClosePointPolyline(markerPos, arrRoadSegments);
                                        if (snapPoint && snapPoint.LatLng) {
                                            //marker.setPosition(snapPoint.LatLng);
                                            //if (marker.angleIcon)
                                            //{
                                            //    marker.angleIcon.setPosition(snapPoint.LatLng);
                                            //}

                                            //if (marker.buffer)
                                            //{
                                            //    marker.buffer.setCenter(snapPoint.LatLng);
                                            //}

                                            if (marker.snapPoint) {
                                                marker.snapPoint.setMap(null);
                                                marker.snapPoint = null;
                                            }
                                            marker.snapPoint = new vbd.Marker({
                                                position: snapPoint.LatLng,
                                                draggable: true,
                                                //crossOnDrag: false,
                                                icon: {
                                                    url: './images/snap-point.png',
                                                    size: new vbd.Size(16, 16),
                                                    anchor: new vbd.Point(8, 8)
                                                }
                                            });

                                            marker.snapPoint.setMap(map);

                                            if (opts && opts.onSelectRoad) {
                                                opts.onSelectRoad(map.selectedRoadSegment);
                                            }
                                        }
                                    });
                                }
                            }

                            // Auto select the only line
                            //if (res.length == 1 && map.roadSegmentMarkers && map.roadSegmentMarkers.length)
                            //{
                            //    if (map.selectedRoadSegment)
                            //    {
                            //        map.selectedRoadSegment.setStrokeColor('#EB9F00');
                            //    }
                            //    map.roadSegmentMarkers[0].setStrokeColor('#F90A0F');
                            //    map.selectedRoadSegment = map.roadSegmentMarkers[0];
                            //}
                        }
                    });
                }

                marker.findRoadSegment(pos);

                vbd.event.addListener(marker, 'dragend', function (m) {
                    marker.findRoadSegment(m.Me.getPosition());
                    //Phong: set lại position khi marker được kéo sang vị trí khác
                    mapPanel.map.menuIsOpen = true;
                    mapPanel.fireEvent('onMarkerDragend', mapPanel, m);
                });
            }

            if (marker.data && marker.data.SnapPoint) {
                if (marker.snapPoint) {
                    marker.snapPoint.setMap(null);
                    marker.snapPoint = null;
                }
                var geoJson = Ext.decode(marker.data.SnapPoint);
                marker.snapPoint = new vbd.Marker({
                    position: new vbd.LatLng(geoJson.coordinates[1], geoJson.coordinates[0]),
                    draggable: true,
                    //crossOnDrag: false,
                    icon: {
                        url: './images/snap-point.png',
                        size: new vbd.Size(16, 16),
                        anchor: new vbd.Point(8, 8)
                    }
                });

                marker.snapPoint.setMap(map);

            }
        }

        // create angle icon
        if (opts.showAngle) {
            this.showMarkerDirection(map, marker, true, opts.onAngleChange);
        }

        marker.setMap(map);

        vbd.event.addListener(marker, 'drag', function (m) {
            // Update position of angleIcon & buffer when marker position changing
            if (marker.angleIcon) marker.angleIcon.setPosition(m.Me.getPosition());
            if (marker.buffer) marker.buffer.setCenter(m.Me.getPosition());
        });
        if (marker.angleIcon) {
            vbd.event.addListener(marker.angleIcon, 'dragend', function (m) {
                mapPanel.fireEvent('onMarkerDragend', mapPanel, m);
            });
        }
        if (marker.buffer) {
            vbd.event.addListener(marker.buffer, 'dragend', function (m) {
                mapPanel.fireEvent('onMarkerDragend', mapPanel, m);
            });
        }
        return marker;
    },

    // Draw angle icon
    showMarkerDirection: function (map, marker, editable, onChange) {
        marker.angleIcon = new vbd.Marker({
            position: marker.getPosition(),
            draggable: true,
            //crossOnDrag: false,
            icon: {
                url: 'images/camera_angle_green.png',
                size: new vbd.Size(48, 48),
                anchor: new vbd.Point(24, 28)
            }
        });

        marker.angleIcon.setMap(map);

        var img = marker.angleIcon.getIcon().img;

        var RAD2DEG = 180 / Math.PI;
        var angleIcon = $(img);

        if (marker.data) {
            if (marker.data.DirectionAngle) {
                angleIcon.css('-webkit-transform', 'rotate(' + marker.data.DirectionAngle + 'deg)');
            }
            else {
                VDMS.Web.Library.AJAX.FolderAjax.GetPropertyValueByName(marker.data.Layer,
                    marker.data.Id,
                    'DirectionAngle',
                    function (res) {
                        if (res && res.value) {
                            angleIcon.css('-webkit-transform', 'rotate(' + res.value + 'deg)');
                        }
                        //else
                        //{
                        //    angleIcon.css('-webkit-transform', 'rotate(90deg)');
                        //}
                    });
            }
        }

        if (editable) {
            angleIcon.centerX = angleIcon.offset().left + angleIcon.width() / 2;
            angleIcon.centerY = angleIcon.offset().top + angleIcon.height() / 2;

            var offset, dragging = false;

            vbd.event.addListener(marker.angleIcon, 'drag', function (m) {
                if (marker) marker.setPosition(m.Me.getPosition());
                if (marker.buffer) marker.buffer.setCenter(m.Me.getPosition());
            });

            vbd.event.addListener(marker.angleIcon, 'click', function (m) {
                // disable edit angleIcon
                dragging = true;
                //angleIcon.attr('src', 'images/camera_angle_green.png');
                offset = Math.atan2(angleIcon.centerY - m.evt.pageY, m.evt.pageX - angleIcon.centerX);
            });

            vbd.event.addListener(marker.angleIcon, 'dragend', function (m) {
                marker.findRoadSegment(m.Me.getPosition());
            });

            vbd.event.addListener(map,
                'click',
                function (m) {
                    var mainForm = Ext.ComponentQuery.query('#mainForm');
                    if (mainForm && mainForm.length) {
                        dragging = false;
                        //angleIcon.attr('src', 'images/camera_angle_green.png');
                    }
                });

            $(document).mousemove(function (e) {
                if (dragging) {
                    var newOffset = Math.atan2(angleIcon.centerY - e.pageY, e.pageX - angleIcon.centerX);
                    var r = (offset - newOffset) * RAD2DEG;
                    if (r < 0) r = 360 + r;

                    angleIcon.css('-webkit-transform', 'rotate(' + r + 'deg)');

                    //convert r to 0 -> 360

                    if (onChange) {
                        onChange(r);
                    }
                }
            });
        }
    },

    /**
     * Snap to Street
     * @param {} coords 
     * @param {} afterSnapFunc 
     * @returns {} 
     */
    snapToStreet: function (coords, afterSnapFunc) // [Longitude, Latitude]
    {
        AJLocationSearch.SnapToStreet(coords, function (data) {
            if (!data.error) {
                data = data.value;

                if (typeof (afterSnapFunc) === 'function') {
                    afterSnapFunc(data);
                }
            }
        });
    },

    //Duy Thanh
    dynamicSort: function (property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    },
    cmToPixels: function (cm) {
        var d = $("<div/>").css({ position: 'absolute', top: '-1000cm', left: '-1000cm', height: '1000cm', width: '1000cm' }).appendTo('body');
        var px_per_cm = d.height() / 1000;
        d.remove();
        return Math.round(cm * px_per_cm);
    },

    getWidgetData: function (content) {
        if (content) {
            content = typeof content === "string" ? JSON.parse(content) : content;

            if (content.inherit) {
                var parent = VDMS.Web.Library.AJAX.FolderAjax.GetContent(content.inherit).value;

                if (parent) {
                    var parentContent = this.getWidgetData(JSON.parse(parent.Content));
                    return this.applyWidgetData(parentContent, content);
                }
                else {
                    delete content.inherit;
                }
            }
        }

        return content;
    },

    fixUserConfig: function (config, layerName) {
        if (!config) return true;

        config = typeof config === "string" ? JSON.parse(config) : config;

        if (config.data) {
        }

        var cleanFunc = function (b) {
            for (var i in b) {
                if (Ext.isEmpty(b[i]) || (Ext.isObject(b[i]) && Ext.Object.isEmpty(b[i]))) {
                    delete b[i];
                    continue;
                }

                if (Ext.isObject(b[i]) && !Ext.isFunction(b[i])) {
                    cleanFunc(b[i]);
                }
            }
        }
        if (!config.inherit) {
            cleanFunc(config);
        }

        return JSON.stringify(config);
    },

});