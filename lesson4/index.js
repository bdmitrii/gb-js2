$('document').ready(() => {  
    const $tabHeaders = $('.tab-header');
    const $select = $('#cities');

    $tabHeaders.on('click', function() {
        $(this)
            .addClass('tab-header-selected').siblings().removeClass('tab-header-selected')
            .closest('.tabs').find('.tab-text').eq($(this).index())
            .addClass('tab-text-selected')
            .siblings().removeClass('tab-text-selected');
    });

    const baseUrl = "http://89.108.65.123/";

    $.ajax({
        url: `${baseUrl}cities`,
        type: 'GET',
        success: (result) => {
            const cities = JSON.parse(result);
            // console.log(cities);
            cities.forEach((city) => {
                $select.append(`<option value=${city.subject}>${city.subject}</option>`);
            })
        }
    })
});