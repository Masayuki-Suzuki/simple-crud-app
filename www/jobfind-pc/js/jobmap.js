(function($){
	//---------------------------------------------------------------------
	// googleMap
	//   Googleマップ用jQueryPlugin
	//
	// @param latitude: 緯度
	// @param longitude: 経度
	// @param address: 住所
	// @param zoom: 倍率
	//---------------------------------------------------------------------
	$.fn.createGoogleMaps = function( config ) {
		var defaults={
				target: this
			};
		var options = $.extend( defaults, config );

		var googleMaps = new GoogleMaps( options );
		googleMaps.createMaker();
	};

	// Googleマップ情報の生成
	function GoogleMaps ( config ) {
		var defaults={
				latitude: "",
				longitude: "",
				address: "",
				zoom: 18
			};
		var options = $.extend( defaults, config );

		if(!options.target) {
			alert("config.target is required.");
			return;
		}

		var hasCoordinate = options.latitude != "" && options.longitude != "";
		var latlng;
		if( hasCoordinate )
			latlng = new google.maps.LatLng(options.latitude, options.longitude);
		else
			latlng = new google.maps.LatLng(-34.397, 150.644);

		var myOptions = {
				zoom: options.zoom,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false
			};

		this.latitude = config.latitude;
		this.longitude = config.longitude;
		this.address = config.address;
		this.map = new google.maps.Map(document.getElementById(options.target.attr("id")), myOptions);
	};

	// マーカーを作成する
	GoogleMaps.prototype.createMaker = function( config ) {
		var defaults={
				latitude: this.latitude,
				longitude: this.longitude,
				address: this.address
			};
		var map = this.map;
		var options = $.extend( defaults, config );

		var hasCoordinate = options.latitude != "" && options.longitude != "";
		if(hasCoordinate) {
			var latlng = new google.maps.LatLng(options.latitude, options.longitude);
			new google.maps.Marker({
				position: latlng,
				map: map
			});
		} else {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode(
				{'address': options.address},
				function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						map.setCenter(results[0].geometry.location);
						new google.maps.Marker({
							map: map,
							position: results[0].geometry.location
						});
					} else {
						alert("Geocode was not successful for the following reason: " + status);
					}
				}
			);
		}
	};
})(jQuery);
