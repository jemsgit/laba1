(function($) {
  function setRouting() {
    $("body").on("click", ".nav-link, .dropdown-item, a.content-link", function(
      e
    ) {
      var link = e.target.getAttribute("href");
      if (link) {
        setContent(link);
        history.pushState({}, null, link);
        e.preventDefault();
      }
    });
  }

  function setContent(link) {
    let contentEl = $("content");
    contentEl.load("pages/" + link + ".html", function(text, status, jq) {
      contentEl.hide();
      contentEl.fadeIn("slow");
      if(link === 'settings') {
        attachFormHandlers()
      }
      if (status === "error") {
        contentEl.load("/pages/404.html");
      }
    });
  }

  function attachFormHandlers() {
    $(".image-radio").on("click", function(e) {
        var $radio = $(this).find('input[type="radio"]');
        var checked = !$radio.prop("checked");
        $radio.prop("checked", checked);
        syncRadioState();
        if(checked) {
            var imageSrc = $(this).find('img').attr('src');
            $('body').css('background-image', 'url(' + imageSrc + ')');
        }
        
        e.preventDefault();
      });
  }

  function syncRadioState() {
    $(".image-radio").each(function () {
        if ($(this).find('input[type="radio"]')[0].checked) {
          $(this).addClass('image-radio-checked');
        }
        else {
          $(this).removeClass('image-radio-checked');
        }
      });
  }

  function loadInitialContent(pathname) {
    pathname = pathname.replace("/", "");
    if (pathname === "") {
      pathname = "home";
    }
    setContent(pathname);
  }


  $(document).ready(function() {
    setRouting();
    loadInitialContent(window.location.pathname);
  });


  // sync the state to the input
  
})(jQuery);
