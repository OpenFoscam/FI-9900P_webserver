$(function ()
{
    MasklayerHide();
    function Call(xml)
    {
        var lensLevel = $(xml).find("ratio").text() * 1;
        $("#selAvLensPara").val(lensLevel);
    }

    $("#avlensRf").click(function ()
    {
        RfParamCall(Call, "", "getRatio");
    });

    $("#avlensSave").click(function ()
    {
        RfParamCall(null, "", "setRatio&ratio=" + $("#selAvLensPara").val());
    });

    $("#avlensRf").click();
})