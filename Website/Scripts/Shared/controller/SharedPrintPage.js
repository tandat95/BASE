Ext.define('Shared.controller.MapPrintPage', {
    extend: 'Ext.app.Controller',

    views: ['MapPrintPage'],

    init: function () {
        this.control({
            'mapprintpage #printContainer': {
                afterrender: function (panel) {

                    var window = panel.up('#printWindow');
                    panel.map = this.initMap(panel, window.paramsPrinter);

                    if (window) {
                        panel.drawTool = new CtrDraw(panel.map, window.drawOptions || {});
                        //panel.drawTool = window.drawTool;
                        if (window.currentItemSelected) {
                            var data = Ext.decode(window.currentItemSelected.Shape);
                            if (data) {
                                panel.drawTool.Init(data);
                                //setTimeout(function () { panel.map.zoomFit() }, 50);
                                if (data.leagen) {
                                    var mapId = panel.map.getContainer().getAttribute('id');
                                    panel.leagen = new Leagen(mapId, data.leagen);
                                    if (data.leagen.length > 0) {
                                        panel.leagen.update(data.leagen);
                                    }
                                }
                            }

                        }
                    }
                }
            },
            'mapprintpage #btnPrintMap': {
                click: function (btn) {
                    var printContainer = btn.up('mapprintpage').down('#printContainer').down('#mapPrintContainer');
                    var renderPanel = printContainer.down('#mapContainer');
                    var iframe = $('#printf');
                    if (iframe) {
                        iframe.remove();
                    };

                    iframe = $('<iframe id="printf" style="position: absolute; width: 9em; height: 9em; top: -99em; display: none"></iframe>')[0];

                    renderPanel.getEl().dom.appendChild(iframe);
                    var mapDom = printContainer.getEl().dom;
                    var content = mapDom.innerHTML;

                    var printDoc = (iframe.contentWindow || iframe.contentDocument);
                    if (printDoc.document) {
                        printDoc = printDoc.document;
                    }

                    var header = [
                        '<div style="width:' + $(mapDom).width() + '; height: ' + $(mapDom).height() + '; position: absolute;padding:10">',
                        content,
                        '</div>'
                    ];

                    var stylesheet = [
                        '<link href="/Content/Editor/editor.css" rel="stylesheet" media="print"/>'
                    ];

                    header = header.join('');
                    stylesheet = stylesheet.join('');

                    printDoc.write('<html><head>' + stylesheet);
                    printDoc.write("</head><body onload='this.focus();this.print()'>");
                    printDoc.write(header + "</body></html>");
                    printDoc.close();
                }
            },
            'mapprintpage #cbxKhoIn': {
                change: function (cbx, newValue, oldValue) {
                    var me = this;
                    var data = cbx.getSelectedRecord().data;
                    if (newValue) {
                        if (newValue === 'Custom') {

                        }
                        else {
                            if (data) {
                                var screenWidth = Ext.getBody().getViewSize().width;
                                var root = cbx.up('mapprintpage');
                                var window = root.up('#printWindow');
                                var renderPanel = root.down('#printContainer').down('#mapContainer');
                                var map = document.getElementById('map-' + renderPanel.id);

                                //window.setWidth(me.calculateCmSize(data.Width, cbx.width, 1));
                                //renderPanel.setWidth(data.Width);
                                map.style.width = data.Width;
                                map.style.height = me.calculateCmSize(data.Height, -1.5);
                                //renderPanel.map.resize();
                            }
                        }
                    }
                }
            },
            'mapprintpage #cbShowLogo': {
                afterrender: function (cb) {
                    var logoPanel = cb.up('mapprintpage').down('#mapPrintContainer').down('#panelLogo');

                    if (logoPanel) {
                        cb.logoHeight = logoPanel.height;
                    }
                },
                change: function (cb, newVal, oldVal) {
                    var logoPanel = cb.up('mapprintpage').down('#mapPrintContainer').down('#panelLogo');
                    if (logoPanel) {
                        logoPanel.setHidden(!newVal);
                        var mapPanel = cb.up('mapprintpage').down('#mapPrintContainer').down('#mapContainer');
                        if (mapPanel) {
                            mapPanel.setHeight(mapPanel.getHeight() + (newVal ? -(cb.logoHeight) : cb.logoHeight));
                            this.resizeMap(mapPanel, null, mapPanel.getHeight());
                        }
                    }
                }
            },
            'mapprintpage #txtMarginTop': {
                change: function (txt, newVal, oldVal) {
                    var panelMap = txt.up('mapprintpage').down('#mapPrintContainer').down('#panelMap');
                    //if (panelMap)
                    //{
                    //    panelMap.paddingTop = newVal;
                    //    this.setPaddingPrint(panelMap);
                    //}
                    var mapContainer = txt.up('mapprintpage').down('#mapPrintContainer').down('#mapContainer');
                    if (mapContainer) {
                        mapContainer.marginTop = newVal;
                        this.setPaddingPrint(mapContainer);
                    }
                    panelMap.doLayout();
                }
            },
            'mapprintpage #txtMarginLeft': {
                change: function (txt, newVal, oldVal) {
                    var panelMap = txt.up('mapprintpage').down('#mapPrintContainer').down('#panelMap');
                    //if (panelMap)
                    //{
                    //    panelMap.paddingLeft = newVal;
                    //    this.setPaddingPrint(panelMap);
                    //}
                    var mapContainer = txt.up('mapprintpage').down('#mapPrintContainer').down('#mapContainer');
                    if (mapContainer) {
                        mapContainer.marginLeft = newVal;
                        this.setPaddingPrint(mapContainer);
                    }
                    panelMap.doLayout();
                }
            },
            'mapprintpage #txtMarginBottom': {
                change: function (txt, newVal, oldVal) {
                    var panelMap = txt.up('mapprintpage').down('#mapPrintContainer').down('#panelMap');
                    //if (panelMap)
                    //{
                    //    panelMap.paddingBottom = newVal;
                    //    this.setPaddingPrint(panelMap);
                    //}
                    var mapContainer = txt.up('mapprintpage').down('#mapPrintContainer').down('#mapContainer');
                    if (mapContainer) {
                        mapContainer.marginBottom = newVal;
                        this.setPaddingPrint(mapContainer);
                    }
                    panelMap.doLayout();
                }
            },
            'mapprintpage #txtMarginRight': {
                change: function (txt, newVal, oldVal) {
                    var panelMap = txt.up('mapprintpage').down('#mapPrintContainer').down('#panelMap');
                    //if (panelMap)
                    //{
                    //    panelMap.paddingRight = newVal;
                    //    this.setPaddingPrint(panelMap);
                    //}
                    var mapContainer = txt.up('mapprintpage').down('#mapPrintContainer').down('#mapContainer');
                    if (mapContainer) {
                        mapContainer.marginRight = newVal;
                        this.setPaddingPrint(mapContainer);
                    }
                    panelMap.doLayout();
                }
            },
            'mapprintpage #sldWidth': {
                change: function (sld, newValue) {
                    var txtWidth = sld.up('mapprintpage').down('#txtWidth');
                    if (txtWidth) {
                        txtWidth.setValue(newValue);
                    }
                    var mapPrintContainer = sld.up('mapprintpage').down('#mapPrintContainer');
                    this.resizeMap(mapPrintContainer, newValue, null);
                }
            },
            'mapprintpage #txtWidth': {
                change: function (txt, newVal, oldVal) {
                    var sld = txt.up('mapprintpage').down('#sldWidth');
                    if (sld) {
                        sld.setValue(newVal);
                    }
                }
            },
            'mapprintpage #sldHeight': {
                change: function (sld, newVal) {
                    var txtWidth = sld.up('mapprintpage').down('#txtHeight');
                    if (txtWidth) {
                        txtWidth.setValue(newVal);
                    }
                    var mapPrintContainer = sld.up('mapprintpage').down('#mapPrintContainer');
                    this.resizeMap(mapPrintContainer, null, newVal);
                }
            },
            'mapprintpage #txtHeight': {
                change: function (txt, newVal, oldVal) {
                    var sld = txt.up('mapprintpage').down('#sldHeight');
                    if (sld) {
                        sld.setValue(newVal);
                    }
                }
            },
            'mapprintpage #cbxPaperSize': {
                select: function (cbx, record) {
                    if (record.data) {
                        var value = record.data;
                        var sldHeight = cbx.up('mapprintpage').down('#sldHeight');
                        var sldWidth = cbx.up('mapprintpage').down('#sldWidth');
                        var cbShowLogo = cbx.up('mapprintpage').down('#cbShowLogo');

                        sldWidth.setValue(VDMS.Global.cmToPixels(value.Width));
                        sldHeight.setValue(VDMS.Global.cmToPixels(value.Height) - cbShowLogo.logoHeight);
                    }
                }
            },
            'mapprintpage #sldZoomToReview': {
                change: function (sld, newVal) {
                    var txtZoomToReview = sld.up('mapprintpage').down('#txtZoomToReview');
                    if (txtZoomToReview) {
                        txtZoomToReview.setValue(newVal);
                    }
                    var mapPrintContainer = sld.up('mapprintpage').down('#mapPrintContainer');
                    this.zoomPrintPanel(mapPrintContainer, (newVal / 10));
                }
            },
            'mapprintpage #txtZoomToReview': {
                change: function (txt, newVal, oldVal) {
                    var sld = txt.up('mapprintpage').down('#sldZoomToReview');
                    if (sld) {
                        sld.setValue(newVal);
                    }
                }
            }
        });
    },

    initMap: function (panel, params) {
        if (panel && vietbando) {

            var printPanel = panel.down('#mapPrintContainer');
            var renderPanel = panel.down('#mapContainer');
            var panelMap = printPanel.down('#panelMap');
   
            var mapId = 'map-' + renderPanel.id;
            renderPanel.update('<div id="' + mapId + '" style="width: ' + (renderPanel.getWidth()) + 'px;height:' + (renderPanel.getHeight()) + 'px;position: absolute" ></div>');

            renderPanel.marginTop = 0;
            renderPanel.marginRight = 0;
            renderPanel.marginBottom = 0;
            renderPanel.marginLeft = 0;
            //Ace: Hack for print
            var resetRuleAndLogo = function () {
                var source = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAIAgMAAADB3li5AAAADFBMVEUAAAD///8AAAD5+fud3040AAAAAXRSTlMAQObYZgAAACxJREFUGNNjCGUgDQA1ZJKoA6ghM5REkMmQtYpEsJIMLWQ4jHTvvyQ9kP8CAKsIZ4v+qHD+AAAAAElFTkSuQmCC";
                var rule = $('#map-' + renderPanel.id + ' img[src="' + source + '"]').parent();
                if (rule && rule.length > 0) {
                    rule = rule[0];
                    rule.style.top = null;
                    rule.style.bottom = '15px';
                }
            };

            renderPanel.on('resize', function () {
                if (panel.map) {
                    panel.map.resize();
                    resetRuleAndLogo();
                }
            });

            if (vietbando) {
                vietbando.srcImg = '/CDN/API/ApiNew/images/';
            }

            /*Init base layer*/
            var layersOpts = [];
            for (var l in params.layers) {
                if (params.layers[l] instanceof vbd.Layer) {
                    var opts = params.layers[l].getOptions();
                    opts.map = null;
                    layersOpts.push(opts);
                }
            }

            // remove layer base
            layersOpts.shift();

            var baseLayer = new vietbando.Layer(
                {
                    url: Document.Global.MAP_URL.DEFAULT
                });

            //baseLayer.name = 'BaseLayer';
            baseLayer.name = 'BaseLayer';
            baseLayer.type = 'DEFAULT';


            /*Init map*/
            var mapProp = {
                minZoom: 2,
                center: params.center,
                zoom: params.zoom,
                maxZoom: 19,
                scaleControlOptions: new vietbando.ScaleControlOptions({ position: vbd.ControlPosition.BOTTOM_LEFT, offset: new vbd.Size(15, -5) }),
                layer: baseLayer
            };

            var map = new vbd.Map(document.getElementById(mapId), mapProp);

            for (var i = 0; i < layersOpts.length; i++) {
                var layer = new vbd.Layer(layersOpts[i]);
                layer.setMap(map);
            }

            vbd.event.addListener(map, 'zoomend', function () {
                resetRuleAndLogo();
            });
            vbd.event.addListener(map, 'boundchange', function () {
                resetRuleAndLogo();
            });
            renderPanel.map = map;
            return map;
        }
        else {
            console.log('Panel or Vietbando API is not ready.');
            return null;
        }
    },
    calculateCmSize: function (size, addition, opts) {
        //Size = 20cm
        size = parseFloat(size.split('cm')[0]);
        addition = (typeof addition === 'string' && addition.indexOf('cm')) ? parseFloat(addition.split('cm')[0]) : parseFloat(addition);
        size += addition;
        if (opts) {
            size += opts;
        }
        return size + 'cm';
    },
    resizeMap: function (mapPrintContainer, width, height) {
        if (mapPrintContainer) {
            var mapPanel = mapPrintContainer.down('#mapContainer');
            if (mapPanel && mapPanel.id != null) {
                var map = document.getElementById('map-' + mapPanel.id);
                if (width) {
                    map.style.width = width + 'px';
                    mapPanel.setWidth(width);
                    mapPrintContainer.setWidth(width);
                }
                if (height) {
                    map.style.height = height + 'px';
                    mapPanel.setHeight(height);
                    mapPrintContainer.setHeight(width);
                }
                mapPanel.map.resize();
            }
        }
    },
    setPaddingPrint: function (mapContainer) {
        var margin = Ext.String.format('{0} {1} {2} {3}', mapContainer.marginTop, mapContainer.marginRight, mapContainer.marginBottom, mapContainer.marginLeft);
        mapContainer.setMargin(margin);
    },
    zoomPrintPanel: function (mapPrintContainer, zoom) {
        if (mapPrintContainer && zoom) {
            var container = document.getElementById(mapPrintContainer.id);
            if (container) {
                container.style.zoom = zoom;
            }
        }
    }
});