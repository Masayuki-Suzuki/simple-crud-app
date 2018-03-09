$(document).ready(function()
{
  setGATelEntryEvent();
});

function setGATelEntryEvent()
{
  $('.gatelentry').bind("click", function()
  {
    if( typeof ga != 'function' )
    {
      return;
    }
    ga('recopcompany.send', 'event', 'telentry', 'click', $(this).attr("data-jobofferid"));
  });
}