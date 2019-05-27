Ext.define('Document.view.UserProfile', {
    override: 'Document.view.UserProfile',
   
    items:
        [
            {
                xtype: 'form',
                border: false,
                itemId: 'formDetail',
                name: 'formDetail',
                bodyPadding: 10,
                layout: 'anchor',
                defaults:
                    {
                        anchor: '100%',
                        labelWidth: 150
                    },
                buttons:
                    [
                        {
                            text: _t('Lưu'),
                            name: 'btnSave'
                        }
                    ],
                // The fields
                defaultType: 'textfield',
                items:
                    [
                        {
                            xtype: 'textfield',
                            name: 'txtUserName',
                            emptyText: _t('Nhập username'),
                            fieldLabel: _t('Tên tài khỏan'),
                            readOnly: true,
                            fieldStyle: 'background-color: #FF5',
                            allowBlank: false
                        },
                        {
                            fieldLabel: _t('Email'),
                            emptyText: _t("Nhập email..."),
                            regex: new RegExp(/^([\w\-\'\-]+)(\.[\w-\'\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/),
                            name: 'txtEmail',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            name: 'txtPhone',
                            emptyText: _t('Nhập số điện thoại'),
                            fieldLabel: _t('Điện thoại')
                        },
                        {
                            xtype: 'fieldset',
                            title: _t('Thông tin bổ sung'),
                            collapsible: false,
                            defaultType: 'textfield',
                            defaults: { anchor: '100%' },
                            layout: 'anchor',
                            hidden: true,
                            items:
                                [
                                    {
                                        xtype: 'textfield',
                                        name: 'txtFirstName',
                                        emptyText: _t('Nhập tên và tên đệm'),
                                        fieldLabel: _t('Tên và tên đệm')
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'txtLastName',
                                        emptyText: _t('Nhập họ'),
                                        fieldLabel: _t('Họ')
                                    },
                                    {
                                        xtype: 'datefield',
                                        name: 'dtBirthDay',
                                        emptyText: _t('Nhập ngày sinh'),
                                        fieldLabel: _t('Ngày sinh'),
                                        value: Ext.Date.subtract(new Date(), Ext.Date.YEAR, 30),
                                        maxValue: new Date()
                                        //minValue: new Date(0)
                                    },
                                    {
                                        xtype: 'combobox',
                                        name: 'cbGender',
                                        emptyText: _t('Chọn giới tính'),
                                        fieldLabel: _t('Giới tính'),
                                        store: Ext.create('Ext.data.Store',
                                            {
                                                fields: ['GenderId', 'GenderName'],
                                                data:
                                                    [
                                                        { "GenderId": "Nam", "GenderName": "Nam" },
                                                        { "GenderId": "Nữ", "GenderName": "Nữ" },
                                                        { "GenderId": "Khác", "GenderName": "Khác" }
                                                    ]
                                            }),
                                        queryMode: 'local',
                                        displayField: 'GenderName',
                                        valueField: 'GenderId',
                                        forceSelection: true,
                                        autoSelect: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'txtOccupation',

                                        emptyText: _t('Nhập nghề nghiệp'),
                                        fieldLabel: _t('Nghề nghiệp')
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'txtAddress',

                                        emptyText: _t('Nhập địa chỉ'),
                                        fieldLabel: _t('Địa chỉ')
                                    }
                                ]
                        },

                    ]
            }
        ],
    initComponent: function () {
        this.callParent();
    }
});