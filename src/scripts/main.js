(function($) {
  var theme = 'classic';

  function setRouting() {
    $("body").on("click", ".nav-link, .dropdown-item, a.content-link", function(e) {
      var link = e.target.getAttribute("href");
      if (link) {
        setContent(link);
        history.pushState({prev: window.location.pathname}, null, link);
        e.preventDefault();
      }
    });
  }

  function setContent(link) {
    let contentEl = $("content");
    contentEl.load("pages/" + link + ".html", function(text, status, jq) {
      contentEl.hide();
      contentEl.fadeIn("slow");
      if(link.replace('/', '') === 'settings') {
        updateFormState();
      }
      if (status === "error") {
        contentEl.load("/pages/404.html");
      }
    });
  }

  function updateFormState() {
    var themes = $('form').find('input[type="radio"][name="theme"]')
    themes.each(function(index, item){
      var value = item.getAttribute('value');
        item.checked = value === theme;
    })
  }

  function attachFormHandlers() {
    $("body" ).on("click", ".image-radio", function(e) {
        var $radio = $(this).find('input[type="radio"][name="back"]');
        var checked = !$radio.prop("checked");
        $radio.prop("checked", checked);
        syncRadioState();
        if(checked) {
            var imageSrc = $(this).find('img').attr('src');
            $('body').css('background-image', 'url(' + imageSrc + ')');
        }
        
        e.preventDefault();
      });

      $("body" ).on("click", ".theme-radio", function(e) {
        theme = $(this).find('input').attr('value');
        updateFormState();
        setTheme(theme)
        console.log(theme);
      });

      $("body").on("click", "a.back", function(e) {
        if(window.history.length && window.history.state) {
          setContent(window.history.state.prev)
          window.history.back();
        } else {
          history.pushState({}, null, '/');
          setContent('/home')
        }
      });
  }

  function setTheme(theme) {
    $('body').attr('class', theme);
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
    attachFormHandlers();
    loadInitialContent(window.location.pathname);
  });


  // sync the state to the input
  
})(jQuery);
