Ext.define('Document.controller.UserProfile',
{
    override: 'Document.controller.UserProfile',

    onAfterRender: function (win, eOpts) {
        VDMS.Web.Library.AJAX.UserAjax.GetCurrentUser(function (userInfo) {
            if (userInfo && userInfo.value) {
                userInfo = userInfo.value;
                if (!Ext.isEmpty(userInfo.UserName)) {
                    var txtUserName = win.down('[name="txtUserName"]');
                    if (txtUserName) {
                        txtUserName.setValue(userInfo.UserName);
                        txtUserName.readOnly = true;
                    }

                    var txtEmail = win.down('[name="txtEmail"]');
                    if (txtEmail) {
                        txtEmail.setValue(userInfo.Email);
                    }

                    var txtFirstName = win.down('[name="txtFirstName"]');
                    if (txtFirstName) {
                        txtFirstName.setValue(userInfo.FirstName);
                    }

                    var txtLastName = win.down('[name="txtLastName"]');
                    if (txtLastName) {
                        txtLastName.setValue(userInfo.LastName);
                    }

                    var dtBirthDay = win.down('[name="dtBirthDay"]');
                    if (dtBirthDay) {
                        dtBirthDay.setValue(userInfo.BirthDay);
                    }

                    var cbGender = win.down('[name="cbGender"]');
                    if (cbGender) {
                        cbGender.setValue(userInfo.Gender);
                    }

                    var txtOccupation = win.down('[name="txtOccupation"]');
                    if (txtOccupation) {
                        txtOccupation.setValue(userInfo.Occupation);
                    }

                    var txtAddress = win.down('[name="txtAddress"]');
                    if (txtAddress) {
                        txtAddress.setValue(userInfo.Address);
                    }

                    var txtPhone = win.down('[name="txtPhone"]');
                    if (txtPhone) {
                        txtPhone.setValue(userInfo.PhoneNumber);
                    }

                }
            }
        });

    },

    onButtonSaveClick: function (btn, e, opts) {
        var userprofile = btn.up('userprofile');

        if (userprofile != null) {
            var form = userprofile.down('form[name="formDetail"]');

            if (form && form.getForm().isValid()) {
                var txtUserName = form.down('[name="txtUserName"]');
                var txtEmail = form.down('[name="txtEmail"]');
                var txtFirstName = form.down('[name="txtFirstName"]');
                var txtLastName = form.down('[name="txtLastName"]');
                var dtBirthDate = form.down('[name="dtBirthDay"]');
                var cbGender = form.down('[name="cbGender"]');
                var txtOccupation = form.down('[name="txtOccupation"]');
                var txtAddress = form.down('[name="txtAddress"]');
                var txtPhone = form.down('[name="txtPhone"]');
                var avatarField = form.down('[name="avatarField"]');

                userprofile.getEl().mask(_t('Đang xử lý') + '...');

                var username = txtUserName.getValue();
                var email = txtEmail.getValue();
                var phone = txtPhone.getValue();

                var userInfo = {
                    FirstName: txtFirstName.getValue(),
                    LastName: txtLastName.getValue(),
                    Gender: cbGender.getValue() + '',
                    Birthday: dtBirthDate.getValue(),
                    Occupation: txtOccupation.getValue(),
                    Address: txtAddress.getValue()
                };

                VDMS.Web.Library.AJAX.UserAjax.UpdateUser(username, email, phone, userInfo, function (rsUpdate) {
                    userprofile.getEl().unmask();

                    if (rsUpdate && rsUpdate.value) {
                        Ext.MessageBox.show({
                            title: _t('Thông báo'),
                            msg: _t('Cập nhật thành công'),
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                    else {
                        Ext.MessageBox.show({
                            title: _t('Thông báo'),
                            msg: _t('Cập nhật thất bại') + '!',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }

                    var win = btn.up('window');
                    if (win) {
                        win.close();
                    }
                });

            }
        }
    }
});