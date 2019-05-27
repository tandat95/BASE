Ext.define('TIMS.controller.MapEditorForm', {
    extend: 'Ext.app.Controller',

    CREATE: 'CREATE',
    UPDATE: 'UPDATE',

    init: function ()
    {
        this.control
        ({
            '[formType="mapeditorform"]':
            {
                afterrender: function (view)
                {
                    var me = this;
                    if (view.mapPanel && view.FORM_DATA.geoLocation)
                    {
                        var map = view.mapPanel.map;
                        var markerOpts = {
                            customMarker: Ext.String.format('<img src="{0}" class="blinkmarker"/>', 'images/blink2.gif'),
                            width: 12,
                            height: 12,
                            offsetX: 0,
                            offsetY: 5,
                            draggable: true
                        };

                        view.currentMarker = SCMS.Global.createEditorMarker(view.mapPanel, view.FORM_DATA.geoLocation, markerOpts, view.FORM_DATA.record,
                        {
                            showBuffer: true,
                            bufferRadius: 100,
                            showAngle: view.showAngle,
                            showRoad: true,
                            onAngleChange: function (r)
                            {
                                if (view.down('[PropertyField="DirectionAngle"]'))
                                {
                                    view.down('[PropertyField="DirectionAngle"]').setValue(parseInt(r));
                                }
                            },
                            onSelectRoad: function (selectedRoadSegment)
                            {
                                var snapPoint = view.currentMarker.snapPoint;
                                var arrRoadSegments = selectedRoadSegment.getPath().toArray();
                                // calculate angle
                                var min = -1, vt = 0;
                                for (var i = 0; i < arrRoadSegments.length - 1; i++)
                                {
                                    var cp = vbd.Util.ClosePointPolyline(snapPoint.getPosition(), [arrRoadSegments[i], arrRoadSegments[i + 1]]);

                                    if (min < 0 || cp.distance < min)
                                    {
                                        min = cp.distance;
                                        vt = i;
                                    }
                                    if (cp.distance == 0)
                                    {
                                        vt = i;
                                        break;
                                    }
                                }

                                var p1 = new jsts.geom.Coordinate(arrRoadSegments[vt].Longitude, arrRoadSegments[vt].Latitude);
                                var p2 = new jsts.geom.Coordinate(arrRoadSegments[vt + 1].Longitude, arrRoadSegments[vt + 1].Latitude);
                                //var lineSeg = new jsts.geom.LineSegment(p1, p2);
                                //lineSeg.angle();
                                var r = 90 - (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI);
                                //if (r < 0) r = 360 + r;
                                view.down('#directionAngleField').setValue(r);
                            }
                        });
                    }

                    if (!view.FORM_DATA.geoLocation)
                    {
                        me.showHelp('createMarker', true);
                    }

                    if (view.showAngle)
                    {
                        me.showHelp('adjustAngle', false);
                    }

                    Document.Global.keyCombination.push(
                    {
                        id: view.id + '-event',
                        keys: [83], //Ext.EventObject.S
                        isUseCtrl: true,
                        isUseAlt: false,
                        isUseShift: false,
                        func: function ()
                        {
                            if (Ext.WindowMgr.getActive().down('[formType="mapeditorform"]') === view)
                            {
                                var btnSaveAll = view.down('#btnSaveAll');
                                btnSaveAll = btnSaveAll ? btnSaveAll : view.down('#btnEditable');

                                if (btnSaveAll)
                                {
                                    btnSaveAll.fireEvent('click', btnSaveAll);
                                    return false;
                                }
                            }

                            return false;
                        }
                    },
                    {
                        id: view.id + '-event',
                        keys: [83], //Ext.EventObject.S
                        isUseCtrl: true,
                        isUseAlt: false,
                        isUseShift: true,
                        func: function ()
                        {
                            if (Ext.WindowMgr.getActive().down('[formType="mapeditorform"]') === view)
                            {
                                var btnSaveAndNew = view.down('#btnSaveAndNew');
                                btnSaveAndNew = btnSaveAndNew ? btnSaveAndNew : view.down('#btnEditable');

                                if (btnSaveAndNew)
                                {
                                    btnSaveAndNew.fireEvent('click', btnSaveAndNew);
                                    return false;
                                }
                            }

                            return false;
                        }
                    },
                    {
                        id: view.id + '-event',
                        keys: [34], //Ext.EventObject.PAGE_DOWN
                        isUseCtrl: false,
                        isUseAlt: false,
                        isUseShift: false,
                        func: function ()
                        {
                            var activeForm = Ext.WindowMgr.getActive().down('[formType="mapeditorform"]');
                            if (activeForm === view)
                            {
                                var mainTab = activeForm.down('#mainTab');
                                if (mainTab)
                                {
                                    var activeTab = mainTab.getActiveTab();
                                    if (activeTab)
                                    {
                                        var curTabIndex = mainTab.items.indexOf(activeTab);
                                        curTabIndex++;
                                        if (curTabIndex === mainTab.items.length)
                                        {
                                            curTabIndex = 0;
                                        }

                                        mainTab.setActiveTab(curTabIndex);
                                    }
                                }
                                return false;
                            }

                            return true;
                        }
                    },
                    {
                        id: view.id + '-event',
                        keys: [33], //Ext.EventObject.PAGE_UP
                        isUseCtrl: false,
                        isUseAlt: false,
                        isUseShift: false,
                        func: function ()
                        {
                            var activeForm = Ext.WindowMgr.getActive().down('[formType="mapeditorform"]');
                            if (activeForm === view)
                            {
                                var mainTab = activeForm.down('#mainTab');
                                if (mainTab)
                                {
                                    var activeTab = mainTab.getActiveTab();
                                    if (activeTab)
                                    {
                                        var curTabIndex = mainTab.items.indexOf(activeTab);
                                        curTabIndex--;
                                        if (curTabIndex === -1)
                                        {
                                            curTabIndex = mainTab.items.length - 1;
                                        }

                                        mainTab.setActiveTab(curTabIndex);
                                    }
                                }
                                return false;
                            }

                            return true;
                        }
                    },
                    {
                        id: view.id + '-event',
                        keys: [112], //Ext.EventObject.F1
                        isUseCtrl: false,
                        isUseAlt: false,
                        isUseShift: false,
                        func: function ()
                        {
                            if (Ext.WindowMgr.getActive().down('[formType="mapeditorform"]') === view)
                            {
                                view.fireEvent('showHelp', view);
                                return false;
                            }

                            return true;
                        }
                    });

                    // init event
                    view.getMarkerOnMap = this.getMarkerOnMap;
                },
                beforedestroy: function (view)
                {
                    var map = view.mapPanel.map;
                    if (view.currentMarker)
                    {
                        if (view.currentMarker.buffer)
                        {
                            view.currentMarker.buffer.setMap(null);
                        }
                        if (view.currentMarker.angleIcon)
                        {
                            view.currentMarker.angleIcon.setMap(null);
                        }

                        if (view.currentMarker.snapPoint)
                        {
                            view.currentMarker.snapPoint.setMap(null);
                        }

                        view.currentMarker.setMap(null);
                        view.currentMarker = null;
                    }

                    if (map.selectedRoadSegment)
                    {
                        map.selectedRoadSegment.setMap(null);
                        map.selectedRoadSegment = null;
                    }

                    if (map.roadSegmentMarkers)
                    {
                        for (var i = 0; i < map.roadSegmentMarkers.length; i++)
                        {
                            map.roadSegmentMarkers[i].setMap(null);
                        }
                    }
                    map.roadSegmentMarkers = [];

                    if (view.mapPanel.roadInfoWindow)
                    {
                        view.mapPanel.roadInfoWindow.close();
                    }
                    $(document).unbind('mousemove');

                    Document.Global.removeKeyCombination(view.id + '-event');
                },
                updatePosition: function (view, pt)
                {
                    if (view.currentMarker)
                    {
                        view.currentMarker.setPosition(pt);
                        if (view.currentMarker.angleIcon)
                        {
                            view.currentMarker.angleIcon.setPosition(pt);
                        }

                        if (view.currentMarker.buffer)
                        {
                            view.currentMarker.buffer.setCenter(pt);
                        }


                        if (view.currentMarker.findRoadSegment) view.currentMarker.findRoadSegment(pt);
                    }
                    else
                    {
                        var markerOpts = {
                            customMarker: Ext.String.format('<img src="{0}"/>', 'images/blink2.gif'),
                            width: 12,
                            height: 12,
                            offsetX: 5,
                            offsetY: 5,
                            draggable: true
                        };

                        view.currentMarker = SCMS.Global.createEditorMarker(view.mapPanel, pt.toGeoJSON().geometry, markerOpts, view.FORM_DATA.record,
                        {
                            showBuffer: true,
                            bufferRadius: 100,
                            showAngle: view.showAngle,
                            showRoad: true,
                            onAngleChange: function (r)
                            {
                                if (view.down('[PropertyField="DirectionAngle"]'))
                                {
                                    view.down('[PropertyField="DirectionAngle"]').setValue(parseInt(r));
                                }
                            }
                        });
                    }
                    if (view.FORM_DATA.geoLocation)
                    {
                        view.FORM_DATA.geoLocation.coordinates[0] = view.currentMarker.getPosition().lng();
                        view.FORM_DATA.geoLocation.coordinates[1] = view.currentMarker.getPosition().lat();
                    }
                    //win.FORM_DATA.geoLocation
                },
                showHelp: function (form)
                {
                    var data = [
                        ['<b>' + _t('Tổng quát') + '</b>', ''],
                        [_t('Xem hướng dẫn'), 'F1'],
                    ];

                    if (form.down('#mainTab'))
                    {
                        data.push(['-----------------', '-----------------']);
                        data.push([_t('Chuyển sang tab tiếp theo'), 'PAGEDOWN']);
                        data.push([_t('Chuyển về tab trước'), 'PAGEUP']);
                    }

                    if (form.showAngle)
                    {
                        data.push([_t('Điều chỉnh góc/hướng'), _t('Nhấn chuột vào biểu tượng <img src="images/camera_angle_green.png"/> để điều chỉnh góc.')]);
                        data.push(['', _t('Nhấn chuột lên bản đồ để ngưng điều chỉnh.')]);
                        data.push(['-----------------', '-----------------']);
                    }
                    data.push([_t('Lưu dữ liệu'), 'CTRL + S']);
                    //data.push([_t('Lưu dữ liệu và tạo dữ liệu mới'), 'CTRL + SHIFT + S']);
                    //data.push([_t('Tắt nhập liệu'), 'ESC']);

                    Ext.create('Ext.window.Window',
                    {
                        title: _t('Danh sách phím tắt (Esc để đóng)'),
                        glyph: 0xf11c,
                        width: 600,
                        height: 500,
                        modal: true,
                        layout: 'fit',
                        items: {
                            xtype: 'grid',
                            store: Ext.create('Ext.data.ArrayStore',
                            {
                                fields: ['Function', 'Shortcut'],
                                data: data
                            }),
                            columns: {
                                defaults:
                                {
                                    sortable: false,
                                    menuDisabled: true,
                                    hideable: false,
                                    draggable: false,
                                    groupable: false
                                },
                                items:
                                [
                                    { header: _t('Chức năng'), dataIndex: 'Function', flex: 1 },
                                    { header: _t('Phím tắt'), dataIndex: 'Shortcut', flex: 2 }
                                ]
                            }
                        }
                    }).show();
                },
                doSave: this.onSaveForm,
                isUpToDate: this.isUpToDate,
                getFormData: this.getFormData,
                buildFormSucceed: this.buildFormSucceed
            },
            '[formType="mapeditorform"] #btnSaveAll':
            {
                click: function (btn) {
                    var form = btn.up('[formType="mapeditorform"]');
                    if (form && form.FORM_DATA && form.FORM_DATA.geoLocation) {
                        var isValidGeo = SCMS.Web.Library.Ajax.SCMSFileAjax.CheckOverlap(JSON.stringify(form.FORM_DATA.geoLocation)).value;
                        if (!isValidGeo)
                        {
                            Ext.Msg.show({
                                title: _t('Thông báo'),
                                msg: _t('Đối tượng đang vẽ không thuộc vùng quận huyện, tỉnh thành nào!'),
                                icon: Ext.Msg.WARNING,
                                buttons: Ext.Msg.OK
                            });

                            return;
                        }
                        var trafficlightform = btn.up('[formType="mapeditorform"]');
                        trafficlightform.isContinue = false;
                        this.onSaveClick(btn);
                    }
                }
            },
            '[formType="mapeditorform"] #btnEditable':
            {
                click: this.onSaveClick
            },
            '[formType="mapeditorform"] #btnSaveAndNew':
            {
                click: function (btn)
                {
                    if (form && form.FORM_DATA && form.FORM_DATA.geoLocation)
                    {
                        var isValidGeo = SCMS.Web.Library.Ajax.SCMSFileAjax.CheckOverlap(JSON.stringify(form.FORM_DATA.geoLocation)).value;
                        if (!isValidGeo)
                        {
                            Ext.Msg.show({
                                title: _t('Thông báo'),
                                msg: _t('Đối tượng đang vẽ không thuộc vùng quận huyện, tỉnh thành nào!'),
                                icon: Ext.Msg.WARNING,
                                buttons: Ext.Msg.OK
                            });

                            return;
                        }
                        var trafficlightform = btn.up('[formType="mapeditorform"]');
                        trafficlightform.isContinue = true;
                        this.onSaveClick(btn);
                    }
                }
            },
            '[formType="mapeditorform"] [PropertyField="DirectionAngle"]': {
                afterrender: function (field)
                {
                    setTimeout(function ()
                    {
                        var view = field.up('[formType="mapeditorform"]');
                        var angleLabel = view.down('#UpdatingAngleLabel');
                        if (angleLabel)
                        {
                            angleLabel.setText(field.getValue() + '°');
                        }

                        // update numberfield
                        var angleNumberField = view.down('#directionAngleField');
                        if (angleNumberField)
                        {
                            angleNumberField.setValue(field.getValue());
                        }
                    }, 50);
                },
                change: this.onDirectionAngleChange
            },
            '[formType="mapeditorform"] #directionAngleField': {
                change: this.onDirectionAngleFieldChange
            },
            '[formType="mapeditorform"] #reverseDirectionAngle': {
                click: this.onReverseDirectionAngle
            }
        });
    },

    onReverseDirectionAngle: function (btn)
    {
        var view = btn.up('[formType="mapeditorform"]');
        var field = view.down('#directionAngleField');
        var value = field.getValue();
        if (value > 180) field.setValue(value - 180);
        else field.setValue(value + 180);
    },

    onDirectionAngleFieldChange: function (field)
    {
        var view = field.up('[formType="mapeditorform"]');
        var newValue = field.getValue();
        var slider = view.down('[PropertyField="DirectionAngle"]');
        if (slider)
        {
            slider.setValue(newValue);
        }

        if (view.currentMarker && view.currentMarker.angleIcon)
        {
            var angleIcon = $(view.currentMarker.angleIcon.getIcon().img);
            angleIcon.css('-webkit-transform', 'rotate(' + newValue + 'deg)');
        }
    },
    onDirectionAngleChange: function (field, newValue, thumb, eOpts)
    {
        var view = field.up('[formType="mapeditorform"]');
        if (view.currentMarker && view.currentMarker.angleIcon)
        {
            var angleIcon = $(view.currentMarker.angleIcon.getIcon().img);
            angleIcon.css('-webkit-transform', 'rotate(' + newValue + 'deg)');
        }

        // update label
        var angleLabel = view.down('#UpdatingAngleLabel');
        if (angleLabel)
        {
            angleLabel.setText(newValue + '°');
        }

        // update numberfield
        var angleNumberField = view.down('#directionAngleField');
        if (angleNumberField)
        {
            angleNumberField.setValue(newValue);
        }
    },

    onSaveForm: function (view, onFinish)
    {
        var me = this;


        var forms = view.query('bindingform');
        var gridForms = view.query('bindinggridform');

        if (view.isSaving)
        {
            return;
        }

        if (!this.isFormValid(view, forms))
        {
            if (typeof (onFinish) === 'function')
            {
                onFinish(view, {
                    success: false,
                    message: 'Có dữ liệu chưa được nhập hoặc không hợp lệ.',
                    isStopForm: false
                });
            }

            return;
        };
        // save Cookies
        var storeDatas = view.query('[storeData=true]');

        for (var i = 0; i < storeDatas.length; i++)
        {
            if (!Ext.isEmpty(storeDatas[i].value))
            {
                Ext.util.Cookies.set("a3_" + storeDatas[i].name, storeDatas[i].value);
            }
        }

        view.isSaving = true;
        var layers = {};

        //Get value from Forms
        for (var i = 0; i < forms.length; i++)
        {
            var saveForm = forms[i];
            var layer = saveForm.FORM_DATA.Layer;
            var id = saveForm.FORM_DATA.Id;
            var values = saveForm.getValues();
            var props = saveForm.FORM_DATA.Properties;

            //Check if form has any value input
            if (Ext.Array.clean(Ext.Object.getValues(values)).length)
            {
                if (layers[layer] && layers[layer].length)
                {
                    if (layers[layer][0].id === id)
                    {
                        layers[layer][0].data = Ext.merge(layers[layer][0].data, values);
                    }
                    else
                    {
                        layers[layer].push({
                            action: id ? view.FORM_ACTION : 'CREATE',
                            id: id,
                            data: values,
                            props: props
                        });
                    }
                }
                else
                {
                    layers[layer] = [
                    {
                        action: id ? view.FORM_ACTION : 'CREATE',
                        id: id,
                        data: values,
                        props: props
                    }];
                }
            }
        }

        var runCount = 0;
        var resultList = [];
        // save data for each layer
        for (var layerName in layers)
        {
            if (layers.hasOwnProperty(layerName))
            {
                if (layers[layerName] && layers[layerName].length)
                {
                    for (var l = 0; l < layers[layerName].length; l++)
                    {
                        var rawData = layers[layerName][l];

                        var saveData = me.prepareData(view, layerName, rawData, rawData.data["Title"]);
                        runCount++;

                        if (saveData.action === 'CREATE')
                        {
                            SCMS.Web.Library.Ajax.SCMSFileAjax.CreateFileWithGeoInfo(JSON.stringify(view.FORM_DATA.geoLocation), view.FORM_DATA.parentNode.Path, '', rawData.data["Title"], rawData.data["Title"], view.FORM_DATA.Layer, saveData.data, function (res)
                            {
                                if (res && res.value)
                                {
                                    resultList.push({
                                        success: true,
                                        message: 'Thành công',
                                        data: res.value
                                    });
                                }
                                else
                                {
                                    resultList.push({
                                        success: false,
                                        message: res.error
                                    });
                                }
                            });
                        }
                        else if (saveData.action === 'UPDATE')
                        {
                            if (saveData.id)
                            {
                                SCMS.Web.Library.Ajax.SCMSFileAjax.UpdateFileSimpleWithGeoInfo(JSON.stringify(view.FORM_DATA.geoLocation), view.FORM_DATA.Id, view.FORM_DATA.Layer, saveData.data, true, function (res)
                                {
                                    if (res && res.value)
                                    {
                                        resultList.push({
                                            success: true,
                                            message: 'Thành công',
                                            data: res.value
                                        });
                                    }
                                    else
                                    {
                                        resultList.push({
                                            success: false,
                                            message: res.error
                                        });
                                    }
                                });
                            }
                            else
                            {
                                resultList.push({
                                    success: false,
                                    message: layerName + ': Cập nhật dữ liệu không có khóa chính.'
                                });
                            }
                        }
                    }
                }
            }
        }
        var runCheckMax = 0;
        function checkResult()
        {
            runCheckMax++;
            if (resultList.length === runCount || runCheckMax === 200)
            {
                view.isSaving = false;

                if (typeof (onFinish) === 'function')
                {
                    var resultStatus = Ext.Array.pluck(resultList, 'success');
                    if (resultStatus.indexOf(false) > -1)
                    {
                        var htmlError = '';
                        for (var m = 0; m < resultList.length; m++)
                        {
                            if (!resultList[m].success)
                            {
                                htmlError += resultList[m].message.Message + '</br>';
                            }
                        }

                        onFinish(view, {
                            success: false,
                            message: '<b style="color: red;">' + _t('Gặp lỗi trong quá trình cập nhật') + '. ' + _t('Chi tiết') + ': </b></br>' + htmlError,
                            isStopForm: true
                        });
                    }
                    else
                    {
                        if (resultList.length === runCount)
                        {
                            onFinish(view, {
                                success: true,
                                message: 'Thành công',
                                data: Ext.Array.pluck(resultList, 'data')
                            });
                        }
                        else
                        {
                            onFinish(view, {
                                success: false,
                                message: '<b style="color: red;">' + _t('Gặp lỗi trong quá trình cập nhật') + '. ' + _t('Chi tiết') + ': </b></br>' + _t('Quá trình xử lý lâu, vui lòng thử lại'),
                                isStopForm: true
                            });
                        }
                    }
                }
            }
            else
            {
                setTimeout(function ()
                {
                    checkResult();
                }, 300);
            }
        }

        checkResult();
    },

    onSaveClick: function (btnSaveAll)
    {
        var me = this;

        var view = btnSaveAll.up('[formType="mapeditorform"]');

        btnSaveAll.setGlyph(0xf110);
        btnSaveAll.setIconCls('fa-pulse');

        me.onSaveForm(view, function (view, res)
        {
            btnSaveAll.setIconCls('');
            btnSaveAll.setGlyph(0xf0c7);

            view.fireEvent('afterSave', view, res);
        });
    },

    prepareData: function (view, layerName, rawData, defaultName)
    {
        var dtData = new Ajax.Web.DataTable();
        dtData.addColumn("FieldName", "System.String");
        dtData.addColumn("FieldValue", "System.Object");
        dtData.addColumn("FieldType", "System.String");
        dtData.addColumn("IsIndex", "System.Boolean");
        dtData.addColumn("FieldFormat", "System.String");


        //Default Value
        dtData.addRow(
        {
            "FieldName": 'StaticField_Name',
            "FieldValue": defaultName,
            "FieldType": "3",
            "IsIndex": true,
            "FieldFormat": ''
        });

        dtData.addRow(
        {
            "FieldName": 'StaticField_Title',
            "FieldValue": defaultName,
            "FieldType": "3",
            "IsIndex": true,
            "FieldFormat": ''
        });

        dtData.addRow(
        {
            "FieldName": 'StaticField_Description',
            "FieldValue": defaultName,
            "FieldType": "3",
            "IsIndex": false,
            "FieldFormat": ''
        });

        if (view.currentMarker)
        {
            var latlng = view.currentMarker.getPosition();
            rawData.data[view.FORM_DATA.geometryField] = ["", "", "", "", "", js_beautify(latlng.toWKT()), ""].join('|');

            // Get GeoInfo
            var data = AJLocationSearch.GetGeoInfoByPoint(latlng.Longitude + '', latlng.Latitude + '');

            if (data != null && data.value != null)
            {
                data = data.value;
                var arData = data.split(/\s*,\s*/);
                dtData.addRow(
                {
                    "FieldName": 'Street',
                    "FieldValue": (arData.length > 3) ? arData[arData.length - 4] : '',
                    "FieldType": "3",
                    "IsIndex": false,
                    "FieldFormat": ''
                });
                dtData.addRow(
                {
                    "FieldName": 'Ward',
                    "FieldValue": (arData.length > 2) ? arData[arData.length - 3] : '',
                    "FieldType": "3",
                    "IsIndex": false,
                    "FieldFormat": ''
                });
                dtData.addRow(
                {
                    "FieldName": 'District',
                    "FieldValue": (arData.length > 1) ? arData[arData.length - 2] : '',
                    "FieldType": "3",
                    "IsIndex": false,
                    "FieldFormat": ''
                });
                dtData.addRow(
                {
                    "FieldName": 'Province',
                    "FieldValue": (arData.length > 0) ? arData[arData.length - 1] : '',
                    "FieldType": "3",
                    "IsIndex": false,
                    "FieldFormat": ''
                });
            }
        }

        if (view.mapPanel && view.mapPanel.map && view.mapPanel.map.selectedRoadSegment)
        {
            var roadSegment = view.mapPanel.map.selectedRoadSegment;

            rawData.data['RoadShape'] = ["", "", "", "", "", js_beautify(roadSegment.toWKT()), ""].join('|');
            rawData.data['RoadSegment'] = roadSegment.data ? roadSegment.data['Guid'] : null;

            var snapPoint = vbd.Util.ClosePointPolyline(view.currentMarker.getPosition(), roadSegment.getPath().toArray());
            rawData.data['SnapPoint'] = ["", "", "", "", "", js_beautify(snapPoint.LatLng.toWKT()), ""].join('|');
        }

        for (var name in rawData.data)
        {
            if (rawData.data.hasOwnProperty(name))
            {
                var value = rawData.data[name];
                var rec = null;
                var fieldFormat = '';

                for (var i = 0; i < rawData.props.length; i++)
                {
                    if (name.toUpperCase() === rawData.props[i].ColumnName.toUpperCase())
                    {
                        switch (rawData.props[i].DataType)
                        {
                            case 1: //Bool
                                value = Boolean(value);
                                break;
                            case 2: //Int
                                if (value != null && value !== "")
                                {
                                    value = parseInt(value);
                                }
                                break;
                            case 5: //Datetime
                                if (value)
                                {
                                    var date = value;
                                    if (!Ext.isDate(value))
                                    {
                                        date = Ext.Date.parseDate(value, 'd/m/Y', true);
                                    }

                                    value = Ext.util.Format.date(date, 'd/m/Y');
                                }
                                else
                                    value = '';

                                fieldFormat = 'dd/MM/yyyy';
                                break;
                            case 3: //String
                            case 6: //LargeString
                            case 7: //Map
                            case 8: //Text
                            case 9: //Binary
                            case 10: //List
                                break;
                        }

                        rec = {
                            "FieldName": rawData.props[i].ColumnName,
                            "FieldValue": value,
                            "FieldType": rawData.props[i].DataType + '',
                            "IsIndex": Boolean(rawData.props[i].IsIndex),
                            "FieldFormat": fieldFormat
                        }
                        break;
                    }
                }
                if (rec) dtData.addRow(rec);
            }
        }

        rawData.data = dtData;
        return rawData;
    },

    getFormData: function (form, onFinish)
    {
        var me = this;

        var forms = form.query('bindingform');
        var gridForms = form.query('bindinggridform');

        var layers = {};

        //Get value from Forms
        for (var i = 0; i < forms.length; i++)
        {
            var saveForm = forms[i];
            var layer = saveForm.FORM_DATA.Layer;
            var id = saveForm.FORM_DATA.Id;
            var values = saveForm.getValues();
            var props = saveForm.FORM_DATA.Properties;

            //Check if form has any value input
            if (Ext.Array.clean(Ext.Object.getValues(values)).length)
            {
                if (layers[layer] && layers[layer].length)
                {
                    if (layers[layer][0].id === id)
                    {
                        layers[layer][0].data = Ext.merge(layers[layer][0].data, values);
                    }
                    else
                    {
                        layers[layer].push({
                            action: id ? form.FORM_ACTION : 'CREATE',
                            id: id,
                            data: values,
                            props: props
                        });
                    }
                }
                else
                {
                    layers[layer] = [
                    {
                        action: id ? form.FORM_ACTION : 'CREATE',
                        id: id,
                        data: values,
                        props: props
                    }];
                }
            }
        }

        //Check if value change to empty
        if (form.FORM_DATA.OriginData)
        {
            for (var val in form.FORM_DATA.OriginData)
            {
                if (form.FORM_DATA.OriginData.hasOwnProperty(val))
                {
                    if (!layers[val])
                    {
                        var data = Ext.clone(form.FORM_DATA.OriginData[val]);
                        for (var d in data)
                        {
                            if (data.hasOwnProperty(d))
                            {
                                data[d] = null;
                            }
                        }
                        layers[val] = data;
                    }
                }
            }
        }

        form.FORM_DATA.GetFormDataValue = layers;
        return layers;
    },

    isFormValid: function (view, forms)
    {
        if (!view.currentMarker)
        {
            Ext.Msg.alert(_t('Thông báo'), _t('Vui lòng chọn vị trí của dữ liệu.'));
            return false;
        }

        if (view.mapPanel)
        {
            var map = view.mapPanel.map;

            //if (map.roadSegmentMarkers && map.roadSegmentMarkers.length && !map.selectedRoadSegment)
            //{
            //    Ext.Msg.alert(_t('Thông báo'), _t('Vui lòng chọn đoạn đường phù hợp.'));
            //    return false;
            //}
        }

        for (var i = 0; i < forms.length; i++)
        {
            if (!forms[i].isValid())
            {
                var tabPanel = forms[i].up('tabpanel');
                var formTab = forms[i].tab ? forms[i] : forms[i].up('[name="fieldsTab"]');
                if (tabPanel && formTab)
                {
                    tabPanel.setActiveTab(formTab);
                }
                return false;
            }
        }

        return true;
    },

    buildFormSucceed: function (form)
    {
        var field = form.down('[needFocus="true"]');
        if (field)
        {
            //TKV - Fix for Extjs 5.1.2, window show below viewport
            setTimeout(function ()
            {
                field.focus();
            }, 200);
        }
    },

    getMarkerOnMap: function (view)
    {
        return view.currentMarker;
    },

    showHelp: function (type, isCloseAll)
    {
        if (isCloseAll)
        {
            $.noty.closeAll();
        }
        switch (type)
        {
            case 'createMarker':
                Document.Global.Message('', '<p>' + _t('Nhấn phải chuột lên bản đồ và chọn "Tạo dữ liệu tại vị trí này" để xác định vị trí') + '</p>', -1, {
                    type: 'warning',
                    layout: 'bottomRight'
                });
                break;
            case 'adjustAngle':
                var msgHtml = '<p>';
                msgHtml += _t('Nhấn chuột vào biểu tượng <img src="images/camera_angle_green.png"/> để điều chỉnh góc.') + ' ' + _t('Nhấn chuột lên bản đồ để ngưng điều chỉnh.');
                msgHtml += '</p>';
                Document.Global.Message('', msgHtml, -1, {
                    type: 'information',
                    layout: 'bottomRight'
                });
                break;
        }
    }
});