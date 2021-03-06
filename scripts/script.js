jQuery(function($) {

	var $body = $('body');
	var masterSidebar = $('.master-sidebar');
	var masterMain = $('.master-main');
	var masterNavItem = $('.master-nav li.expandable');
	var masterNavAnchor = masterNavItem.find('a');

	$('.resizable').resizable();

	masterNavItem.each(function(i, n) {
		if ($.cookie('navExpand[' + i + ']')) {
			$(this).addClass('active').find('ul').show();
		}
	});

	masterNavAnchor.on('click', function(e) {
		var $this = $(this);
		var subNav = $this.next('ul');
		if (subNav.length) {
			var li = subNav.slideToggle(250).closest('li').toggleClass('active');
			var index = li.index('.expandable');
			var result = li.hasClass('active') ?
				$.cookie('navExpand[' + index + ']', true) :
				$.removeCookie('navExpand[' + index + ']');
		}
	});

	var masterMenu = [
		'Dashboard',
		'Articles',
		'Categories',
		'Comments',
		'Pages',
		'Members',
		'Plugins',
		'Settings',
		'Reports'
	];

	$('.master-search input').autocomplete({
		source: masterMenu
	});

	if ((sidebarWidth = $.cookie('sizebar_width'))) {
		masterSidebar.width(sidebarWidth);
		masterMain.css('margin-left', sidebarWidth + 'px');
	}

	masterSidebar.resizable({
		maxWidth: 240,
		minWidth: 64,
		handles: 'e',
		resize: function(e, ui) {
			masterMain.css('margin-left', ui.size.width);
			$body.toggleClass('narrow', ui.size.width < 120);
		},
		stop: function(e, ui) {
			console.log('should remember sizebar width', ui.size.width);
			$.cookie('sizebar_width', ui.size.width);
		}
	});

	$('.tabs').each(function() {
		var $this = $(this);
		var tabHead = $this.find('.tabs-head li');
		var tabBody = $this.find('.tabs-body');
		tabHead.each(function() {
			if ($(this).hasClass('active')) {
				tabBody
					.filter($(this)
						.find('a').attr('href'))
					.addClass('active');
			}
		});
		tabHead.find('a').on('click', function(e) {
			e.preventDefault();
			tabHead.removeClass('active');
			$(this).closest('li').addClass('active');
			tabBody
				.removeClass('active')
				.filter(
					$(this).attr('href'))
				.addClass('active');
		});
	});

	$('.dialog-button').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var dialog = $(href);
        console.log(href);
        dialog.dialog($.extend(dialog.data(), {
            maxHeight: dialog.data('maxheight'),
            open: function(e, ui) {
                if (dialog.data('scrollable') === false) {
                    $('body').css('overflow', 'hidden');
                }
                dialog.prev('.ui-dialog-titlebar').find('.ui-dialog-titlebar-close').blur();
                // dialog.siblings('.ui-dialog-buttonpane').find('button:eq(0)').focus();
            },
            close: function(e, ui) {
                if (dialog.data('scrollable') === false) {
                    $('body').css('overflow', 'auto');
                }
            }
        }));
    });

    $('#room_update').on('dialogopen', function() {
    	var $this = $(this);
    	var inputTxt = $this.find('input');
    	$this.find('form').on('submit', function(e) {
    		e.preventDefault();
    		$this.siblings('.ui-dialog-buttonpane').find('button:eq(0)').click();
    	});
        $this.dialog('option', {
        	open: function() {
        		inputTxt.focus();
        	},
        	buttons: {
	            Save: function() {
	            	var value = inputTxt.val();
	            	console.log(value);
	            	$('.selectable .ui-selected .info').text(value);
	                $this.dialog('close');
	            }
	        }
        });
    });

});
