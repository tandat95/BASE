function ContextMenu(mapObj, mnuWidth)
{
    this.mapObj = mapObj;
    this.divContainer = mapObj.getContainer();
    this.mnuWidth = mnuWidth;
    this.divMnu = null;

    this.open = open;
    this.close = close;
    this.bindClick = bindClick;

    function open(ptViewMnu, arrMnuItem, ptRealFn)
    {
        this.ptViewMnu = ptViewMnu;
        this.arrMnuItem = arrMnuItem;
        this.ptRealFn = ptRealFn;

        this.close();

        this.divMnu = document.createElement("div");
        this.divMnu.style.position = "absolute";
        this.divMnu.style.width = this.mnuWidth + "px";
        this.divMnu.style.zIndex = 99;

        var menuHeight = 30;
        var style = '';

        var strHtml = '<div class="vbd-menu context-menu-widget" style="width:' + this.mnuWidth + 'px;">';
        for (var i = 0; i < arrMnuItem.length; i++)
        {
            if (this.arrMnuItem[i][1] == '-')
            {
                strHtml += '<div class="dash"></div>';
                menuHeight += 10;
            }
            else
            {
                strHtml += '<div class="context-menu-entry kd-menulistitem ' + this.arrMnuItem[i][0] + '">'
                    + '<span class="context-menu-entry-icon ' + this.arrMnuItem[i][0] + '"></span>'
                    + '<span>' + arrMnuItem[i][1] + '</span><span>' + arrMnuItem[i][2] + '</span></div>';
                menuHeight += 20;
            }

        }
        strHtml += '</div>';

        this.divMnu.style.height = menuHeight + 'px';
        this.divMnu.innerHTML = strHtml;
        this.divContainer.appendChild(this.divMnu);

        //Bind Click
        for (var i = 0; i < this.arrMnuItem.length; i++)
            this.bindClick(this.arrMnuItem[i], this.ptRealFn);

        var ptContainerMnu = this.mapObj.getMouseOnMap(this.ptViewMnu.x, this.ptViewMnu.y);
        var mnuLeft = ptContainerMnu.x;
        var mnuTop = ptContainerMnu.y;
        if (mnuLeft + this.mnuWidth >= parseInt(this.divContainer.offsetWidth))
            mnuLeft -= (this.mnuWidth + 5);
        else
            mnuLeft += 15;
        if (mnuTop + menuHeight >= parseInt(this.divContainer.offsetHeight))
            mnuTop -= menuHeight;

        this.divMnu.style.left = mnuLeft + 'px';
        this.divMnu.style.top = mnuTop + 'px';
    }

    function close()
    {
        if (this.divMnu != null)
            $(this.divMnu).remove();
    }

    function bindClick(mnuItem, ptRealFn)
    {
        if (mnuItem[1] != '-' && mnuItem[3] != null)
        {
            $(('.context-menu-entry.' + mnuItem[0])).click(function ()
            {
                mnuItem[3](ptRealFn);
                return false;
            });
        }
    }
}